<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCarouselDrag } from './composables/useCarouselDrag.js';

// Carousel setup
const totalStacks = 3; // Total number of sub-stacks
const visibleStacks = 2.7; // Number of visible stacks (allowing partial view)
const currentIndex = ref(0);

// Use carousel drag composable
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
  cleanup,
  initializeCursor
} = useCarouselDrag(totalStacks, visibleStacks, currentIndex);

// Mouse event handlers
const onMouseDown = (e) => {
  handleDragStart(e);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e) => {
  handleDragMove(e);
};

const onMouseUp = (e) => {
  handleDragEnd(e);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

// Touch event handlers
const onTouchStart = (e) => {
  handleDragStart(e);
};

const onTouchMove = (e) => {
  handleDragMove(e);
};

const onTouchEnd = (e) => {
  handleDragEnd(e);
};

onMounted(() => {
  initializeCursor();
});

onUnmounted(() => {
  cleanup();
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
});
</script>

<template>
    <div class="section-container">
        <div class="section-view">
            <div class="section-title">
                <h6>Sắm Online, rẻ vô đối!</h6>
            </div>
            <div class="stack-view">
                <div class="main-stack">
                    <div class="promo-highlight">
                        <img alt="400x454.png" loading="lazy" width="400" height="454" decoding="async" data-nimg="1"
                            class="hidden h-full w-full cursor-pointer object-cover pc:block"
                            srcset="https://cdn2.fptshop.com.vn/unsafe/480x0/filters:format(webp):quality(75)/400x454_18ee41b155.png 1x, https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/400x454_18ee41b155.png 2x"
                            src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/400x454_18ee41b155.png"
                            style="color: transparent;">
                    </div>
                </div>
                
                <!-- Sub-stacks Carousel -->
                <div class="sub-stacks">
                    <div 
                        ref="carouselTrack"
                        class="carousel-track"
                        :style="{
                            transform: `translateX(calc(-${currentIndex * stackWidthPercent}% + ${dragOffset}px))`,
                            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }"
                        @mousedown="onMouseDown"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                        @touchend="onTouchEnd"
                    >
                            <div class="sub-stack">
                                <div class="stack-content">
                                    <div class="sub-stack__title">
                                        <p>Bộ đôi ăn ý</p>
                                    </div>
                                    <div class="item-list">
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-stack">
                                <div class="stack-content">
                                    <div class="sub-stack__title">
                                        <p>Bộ đôi ăn ý</p>
                                    </div>
                                    <div class="item-list">
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-stack">
                                <div class="stack-content">
                                    <div class="sub-stack__title">
                                        <p>Bộ đôi ăn ý</p>
                                    </div>
                                    <div class="item-list">
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-stack">
                                <div class="stack-content">
                                    <div class="sub-stack__title">
                                        <p>Bộ đôi ăn ý</p>
                                    </div>
                                    <div class="item-list">
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-stack">
                                <div class="stack-content">
                                    <div class="sub-stack__title">
                                        <p>Bộ đôi ăn ý</p>
                                    </div>
                                    <div class="item-list">
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                        <div class="item">
                                            <img alt="Di chuyển.png" loading="lazy" width="115" height="115" decoding="async"
                                                data-nimg="1" class="aspect-square rounded-2 object-cover"
                                                srcset="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 1x, https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png 2x"
                                                src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/Di_chuyen_b24c80384c.png"
                                                style="color: transparent;">
                                            <a>Di chuyển</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section-container {
    padding: 0 0 24px 0;
    width: 100%;
    background-color: #f3f4f6;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.section-view {
    gap: 8px;
    width: 1180px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.section-title {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
}

.section-title h6 {
    font-weight: 600;
    font-size: 28px;
    line-height: 36px;
    color: #090d14;
}

.stack-view {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 12px;
}

.main-stack {
    width: 400px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.promo-highlight {
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.promo-highlight img {
    object-fit: cover;
    border-radius: 12px;
}

.sub-stacks {
    width: 828px;
    height: fit-content;
    overflow: hidden;
    position: relative;
}

.carousel-track {
    display: flex;
    width: 300%;
    height: 100%;
    user-select: none;
    will-change: transform;
    gap: 12px;
}

.sub-stack {
    border-radius: 12px;
    width: 298px;
    height: 454px;
    padding: 0 12px 0 0;
    background-color: #fff;
    flex-shrink: 0;
}

.stack-content {
    padding: 16px;
    width: 266px;
    height: 422px;
}

.sub-stack__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #090d14;
    margin: 0 0 16px 0;
}

.item-list {
    width: 266px;
    height: 382px;
    display: grid;
    flex-direction: column;
    row-gap: .75rem;
    flex: 1 1 0%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 117px;
    height: 169px;
    padding: 8px;
}

.item a {
    padding: 0 8px;
    margin: 8px 0 6px 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #090d14;
    text-align: center;
    display: block;
    white-space: nowrap;
}
</style>