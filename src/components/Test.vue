<template>
  <div class="banner-container" :class="{ 'white-bg': currentIndex === 1 }">
    <!-- Main Banner -->
    <div class="main-banner-wrapper">
      <button class="nav-btn nav-btn-left" @click="prevBanner" :disabled="isAnimating">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <transition name="fade" @before-enter="onBeforeEnter" @after-enter="onAfterEnter">
        <img
          v-if="mainBanners[currentIndex]"
          :key="mainBanners[currentIndex]"
          class="main-banner"
          :src="mainBanners[currentIndex]"
          alt="Main Banner"
        />
      </transition>

      <button class="nav-btn nav-btn-right" @click="nextBanner" :disabled="isAnimating">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,6 15,12 9,18"></polyline>
        </svg>
      </button>
    </div>

    <!-- Bottom Banners with Drag -->
    <div class="bottom-banners-wrapper">
      <div
        class="bottom-slide-container"
        ref="slideContainer"
        @mousedown="handleDragStart"
        @mousemove="handleDragMove"
        @mouseup="handleDragEnd"
        @mouseleave="handleDragEnd"
        @touchstart="handleDragStart"
        @touchmove="handleDragMove"
        @touchend="handleDragEnd"
      >
        <div
          class="bottom-slide-track"
          :style="{
            transform: `translateX(calc(-${currentSlide * 50}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }"
        >
          <div
            v-for="(banner, index) in bottomBanners"
            :key="index"
            class="bottom-banner"
          >
            <img :src="banner" :alt="`Banner ${index + 1}`" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Main Banner Logic
const mainBanners = [
  'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp)/mb_header_6_accc9b66d0.png',
  'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp)/desk_header_8107ca637d.png'
];
const currentIndex = ref(0);
const isAnimating = ref(false);

const nextBanner = () => {
  if (isAnimating.value) return;
  currentIndex.value = (currentIndex.value + 1) % mainBanners.length;
};

const prevBanner = () => {
  if (isAnimating.value) return;
  currentIndex.value = (currentIndex.value - 1 + mainBanners.length) % mainBanners.length;
};

const onBeforeEnter = () => { isAnimating.value = true; };
const onAfterEnter = () => { isAnimating.value = false; };

// Bottom Banners Logic
const bottomBanners = [
  'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp)/H2_614x212_a4ee0cfb12.png',
  'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp)/H2_612x212_09895a7ae8.png',
  'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp)/H2_614x212_1dad35a1e3.png',
  'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp)/H2_614x212_a4ee0cfb12.png'
];

const currentSlide = ref(0);
const dragOffset = ref(0);
const isDragging = ref(false);
const startPosX = ref(0);
const slideContainer = ref(null);

const handleDragStart = (e) => {
  if (bottomBanners.length <= 2) return;
  
  isDragging.value = true;
  startPosX.value = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  e.preventDefault();
};

const handleDragMove = (e) => {
  if (!isDragging.value) return;
  
  const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  dragOffset.value = currentX - startPosX.value;
};

const handleDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  const threshold = 50;
  if (Math.abs(dragOffset.value) > threshold) {
    if (dragOffset.value < 0 && currentSlide.value < bottomBanners.length - 2) {
      currentSlide.value++;
    } else if (dragOffset.value > 0 && currentSlide.value > 0) {
      currentSlide.value--;
    }
  }
  
  dragOffset.value = 0;
};
</script>

<style scoped>
.banner-container {
  background-image: url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp)/desk_header_bg_a43ac514b7.png');
  background-size: cover;
  background-position: center;
  padding: 40px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.white-bg {
  background-image: none;
  background-color: #F3F4F6;
}

/* Main Banner Styles */
.main-banner-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-banner {
  display: block;
  max-width: 100%;
  height: auto;
  min-height: 300px;
  margin: 0 auto;
}

/* Navigation Buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}

.nav-btn-left {
  left: 10px;
}

.nav-btn-right {
  right: 10px;
}

.main-banner-wrapper:hover .nav-btn {
  opacity: 1;
  pointer-events: auto;
}

/* Bottom Banners Styles */
.bottom-banners-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
}

.bottom-slide-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.bottom-slide-track {
  display: flex;
  width: 100%;
  will-change: transform;
}

.bottom-banner {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 10px;
  box-sizing: border-box;
}

.bottom-banner img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  user-select: none;
  -webkit-user-drag: none;
}

/* Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>