<template>
    <div class="crs3st">
        <div class="bottom-banners-wrapper">
            <div class="bottom-slide-container" ref="slideContainer" @mousedown="handleDragStart"
                @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd"
                @touchstart="handleDragStart" @touchmove="handleDragMove" @touchend="handleDragEnd">
                <div class="bottom-slide-track" :style="{
                    transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                }">
                    <div v-for="(banner, index) in bottomBanners" :key="index" class="bottom-banner">
                        <img :src="banner" :alt="`Banner ${index + 1}`" loading="lazy" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const bottomBanners = [
    'https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_a51ad9722e.png',
    'https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/H3_405x175_1719154dfc.png',
    'https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_a416d6d38b.png',
    'https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_7db6f88646.png',
    'https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_a51ad9722e.png',
    'https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/H3_405x175_1719154dfc.png', 'https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/H3_405x175_a51ad9722e.png',
    'https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/H3_405x175_1719154dfc.png',];

const currentSlide = ref(0);
const dragOffset = ref(0);
const isDragging = ref(false);
const startPosX = ref(0);
const slideContainer = ref(null);

// Tính tổng số slide (mỗi slide có 3 banner)
const totalSlides = computed(() => Math.ceil(bottomBanners.length / 3));

const handleDragStart = (e) => {
    if (totalSlides.value <= 1) return;

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
        if (dragOffset.value < 0 && currentSlide.value < totalSlides.value - 1) {
            currentSlide.value++;
        } else if (dragOffset.value > 0 && currentSlide.value > 0) {
            currentSlide.value--;
        }
    }

    dragOffset.value = 0;
};

const goToSlide = (slideIndex) => {
    currentSlide.value = slideIndex;
};
</script>

<style scoped>
.crs3st {
    padding: 20px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.bottom-banners-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
}

.bottom-slide-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 173.36px;
}

.bottom-slide-track {
    display: flex;
    width: calc(100% * var(--total-slides));
    will-change: transform;
    height: 100%;
}

.bottom-banner {
    flex: 0 0 calc(100% / 3);
    /* Mỗi banner chiếm 1/3 width của slide */
    max-width: calc(100% / 3);
    padding: 0 8px;
    box-sizing: border-box;
    height: 100%;
}

.bottom-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    user-select: none;
    -webkit-user-drag: none;
}

/* Navigation dots */
.navigation-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dot.active {
    background-color: #007bff;
}

.dot:hover {
    background-color: #0056b3;
}

/* Responsive */
@media (max-width: 768px) {
    .crs3st {
        padding: 20px 10px;
    }

    .bottom-banner {
        padding: 0 4px;
    }
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