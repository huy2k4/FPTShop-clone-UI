<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <button class="nav-btn nav-btn-left" @click="prevSlide" :disabled="currentIndex === 0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <div class="carousel-viewport" ref="carouselViewport">
        <div class="carousel-track" ref="carouselTrack" :style="{
          transform: `translateX(calc(-${currentIndex * stackWidthPercent}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }" @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd"
          @mouseleave="handleDragEnd" @touchstart="handleDragStart" @touchmove="handleDragMove"
          @touchend="handleDragEnd" @touchcancel="handleDragEnd">
          <div class="stack" v-for="(stack, stackIndex) in stacks" :key="stackIndex">
            <!-- Stack thứ 3 và 7 (index 2, 6) là thẻ lớn -->
            <div v-if="stackIndex === 2 || stackIndex === 6" class="card card-large"
              :style="{ background: stack.largeCard.color }">
              <div class="card-name">
                <h3>{{ stack.largeCard.name }}</h3>
              </div>
              <div class="card-image">
                <img :src="stack.largeCard.image" :alt="stack.largeCard.name" />
              </div>
            </div>

            <!-- Các stack khác có 2 thẻ nhỏ -->
            <template v-else>
              <div class="card card-small" v-for="card in stack.cards" :key="card.id"
                :style="{ background: card.color }">
                <div class="card-name">
                  <h3>{{ card.name }}</h3>
                </div>
                <div class="card-image">
                  <img :src="card.image" :alt="card.name" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <button class="nav-btn nav-btn-right" @click="nextSlide" :disabled="currentIndex >= totalStacks - visibleStacks">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,6 15,12 9,18"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCarouselDrag } from './composables/useCarouselDrag.js';

const stacks = ref([]);
const totalStacks = 10;
const visibleStacks = 5;
const currentIndex = ref(0);

// Use the drag composable
const {
  isDragging,
  dragOffset,
  carouselViewport,
  carouselTrack,
  stackWidthPercent,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  nextSlide,
  prevSlide,
  goToSlide,
  cleanup,
  initializeCursor
} = useCarouselDrag(totalStacks, visibleStacks, currentIndex);

// Dữ liệu sản phẩm
const productData = [
  {
    name: 'Điện thoại',
    image: 'https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/phone_cate_c6a412f60a.png',
  },
  {
    name: 'Laptop',
    image: 'https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/may_tinh_bang_cate_thumb_00e3b3eefa.png',
  },
  {
    name: 'Máy tính bảng',
    image: 'https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/may_tinh_bang_cate_thumb_00e3b3eefa.png',
  },
  {
    name: 'Tivi',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/tivi_thumb_2_fc9b0f8bde.png',
  }
];

// Khởi tạo stacks
const initializeStacks = () => {
  for (let i = 0; i < totalStacks; i++) {
    if (i === 2 || i === 6) {
      // Stack thứ 3 và 7 là thẻ lớn (Tivi)
      stacks.value.push({
        largeCard: {
          id: `large-${i}`,
          name: productData[3].name,
          image: productData[3].image,
        }
      });
    } else {
      // Các stack khác có 2 thẻ nhỏ
      const cards = [];
      for (let j = 0; j < 2; j++) {
        const productIndex = (i * 2 + j) % 3; // Chỉ dùng 3 sản phẩm đầu
        cards.push({
          id: `card-${i}-${j}`,
          name: productData[productIndex].name,
          image: productData[productIndex].image,
        });
      }
      stacks.value.push({ cards });
    }
  }
};

onMounted(() => {
  initializeStacks();
  initializeCursor();
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
.carousel-container {
  height: 200px;
  width: 100%;
  max-width: 1310px;
  /* margin: 0 auto; */
  padding: 0 0 0 30px;
  font-family: Arial, sans-serif;
  background: #F3F4F6;
  border-radius: 25px;
  position: relative;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  /* gap: 20px; */
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 12px;
}

.carousel-track {
  display: flex;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: pan-x;
  will-change: transform;
}

.stack {
  flex: 0 0 calc(20% - 12px);
  margin: 0px 15px 15px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stack:last-child {
  margin-right: 0;
}

.card {
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 12px;
  cursor: pointer;
}

.card:hover .card-image img {
  transform: scale(1.15);
}

.card.card-large:hover .card-image img {
  transform: scale(1.12);
}

.card-small {
  min-height: 48%;
  background: white;
}

.card-large {
  max-height: 100%;
  flex-direction: column;
  background: white;
}

.card-name {
  width: 106px;
  padding: 16px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.card-image img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-large .card-image img {
  width: 180px;
  height: 180px;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-large .card-name {
  font-size: 16px;
  color: #333;
}

.card-name h3 {
  margin: 0;
}

.card-image {
  padding: 16px 0px 0 10px;
}

.card-image img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.card-large .card-image img {
  width: 180px;
  height: 180px;
}

.card-large .card-image {
  padding: 0px 0px 0 0px;
}

.nav-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-btn:active {
  transform: scale(0.95);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #ddd;
  cursor: pointer;
  transition: all 0.2s ease;
}

.indicator.active {
  background: #007bff;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .stack {
    flex: 0 0 calc(50% - 8px);
    margin-right: 10px;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .carousel-wrapper {
    gap: 10px;
  }

  .card-name {
    padding: 16px;
    font-size: 11px;
  }

  .card-image {
    padding: 16px 8px 8px 0;
  }

  .card-image img {
    width: 80px;
    height: 80px;
  }

  .card-large .card-image img {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .stack {
    flex: 0 0 calc(33.333% - 10px);
  }
}

@media (max-width: 480px) {
  .nav-btn {
    display: none;
  }

  .carousel-wrapper {
    gap: 0;
  }
}
</style>