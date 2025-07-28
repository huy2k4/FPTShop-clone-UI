<template>
    <div class="deal-reels-section">
        <div class="deal-reels-container">
            <div class="deal-reel-label">Deal xập xình - Sale sập sàn</div>

            <div class="carousel-container" ref="carouselContainer">
                <div class="swiper-wrapper" :style="{
                    transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                }" @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd"
                    @mouseleave="handleDragEnd" @touchstart="handleDragStart" @touchmove="handleDragMove"
                    @touchend="handleDragEnd">

                    <div v-for="(video, index) in videos" :key="index" class="stack">
                        <div class="reel">
                            <div class="content">
                                <img :src="video.thumbnail" :alt="video.title" />
                                <button class="play-button" @click="playVideo(video.id)">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="#090D14"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="Play">
                                            <path id="Shape"
                                                d="M10.1376 3.38137C8.30432 2.30991 6 3.63217 6 5.75561V22.2443C6 24.3677 8.30431 25.69 10.1376 24.6185L24.8348 16.0289C26.3871 15.1217 26.3872 12.8783 24.8349 11.9711L10.1376 3.38137Z"
                                                fill="inherit"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <a class="deal-card" :href="video.dealUrl">
                                <div class="deal-info">
                                    <img alt="Samsung Smart TV 65 inch 4K UA65DU8000" loading="lazy" width="78"
                                        height="78" decoding="async" data-nimg="1"
                                        srcset="https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/00909830_samsung_ua65du8000kxxv_990192caf0.png 1x, https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/00909830_samsung_ua65du8000kxxv_990192caf0.png 2x"
                                        src="https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/00909830_samsung_ua65du8000kxxv_990192caf0.png"
                                        style="color: transparent;">
                                    <div class="detail">
                                        <div class="discount">
                                            <div class="sale-price-text">7.000.000đ</div>
                                            <div class="promo">-30%</div>
                                        </div>
                                        <p class="deal-price">{{ video.price }}</p>
                                        <h3 class="deal-title">{{ video.title }}</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const videos = [
    {
        id: 'cF-TttUhObY',
        thumbnail: 'https://i.ytimg.com/vi/GwZZTQSVYVk/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&amp;rs=AOn4CLBE7MsKI-izWFDrnS5Z9j-5WojuXw',
        title: 'Samsung Smart TV 65 inch 4K UA65DU8000',
        price: '28.990.000đ',
        dealUrl: '#'
    },
    {
        id: 'M_NysoU8GDM',
        thumbnail: 'https://i.ytimg.com/vi/WFX6F5jLPBA/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&amp;rs=AOn4CLBVNUod9EKEL9789_fIBnhkXL3ptA',
        title: 'Samsung Smart TV 65 inch 4K UA65DU8000',
        price: '22.990.000đ',
        dealUrl: '#'
    },
    {
        id: 'M_NysoU8GDM',
        thumbnail: 'https://i.pinimg.com/736x/d9/bb/f4/d9bbf43f09d141913e6ff8d31126dd13.jpg',
        title: 'Apple Watch Ultra',
        price: '21.990.000đ',
        dealUrl: '#'
    },
    {
        id: 'cF-TttUhObY',
        thumbnail: 'https://i.ytimg.com/vi/-1jUfrHs4xs/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&amp;rs=AOn4CLCsW3U0us-ioCGCW1Iy_mjZ6XbDYQ',
        title: 'Samsung Smart TV 65 inch 4K UA65DU8000',
        price: '32.990.000đ',
        dealUrl: '#'
    },
    {
        id: 'M_NysoU8GDM',
        thumbnail: 'https://i.ytimg.com/vi/i7InstJTzgQ/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&amp;rs=AOn4CLCAkvELNT8ATEdno59VaGTe_595sQ',
        title: 'iPad Pro 2024',
        price: '26.990.000đ',
        dealUrl: '#'
    },
    {
        id: 'cF-TttUhObY',
        thumbnail: 'https://i.pinimg.com/236x/aa/cd/11/aacd114ab02fe272c5fb3e3886623e75.jpg',
        title: 'Sony WH-1000XM5',
        price: '7.990.000đ',
        dealUrl: '#'
    },
];

const currentSlide = ref(0);
const dragOffset = ref(0);
const isDragging = ref(false);
const startPosX = ref(0);
const carouselContainer = ref(null);

// Tính tổng số slide (mỗi slide có 4 video)
const totalSlides = computed(() => Math.ceil(videos.length / 4));

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

const playVideo = (videoId) => {
    console.log('Playing video:', videoId);
    // Logic phát video ở đây
};
</script>

<style scoped>
.deal-reels-section {
    position: relative;
    width: 100vw;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.deal-reels-container {
    width: 1180px;
    height: 724px;
    padding: 1.25rem 1.5rem;
    flex-direction: column;
    gap: 1.25rem;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
}

.deal-reel-label {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-size: 28px;
    line-height: 36px;
    font-weight: 600;
    font-style: normal;
    color: #111827;
    margin-bottom: 0.5rem;
    padding: 0 0 0.5rem 0;
}

.carousel-container {
    width: 100%;
    overflow: hidden;
    flex: 1;
}

.swiper-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 100%;
    width: calc(100% * var(--total-slides));
    cursor: pointer;
}



.stack {
    flex: 0 0 calc(25% - 0.75rem);
    height: 100%;
}

.reel {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
}

.content {
    position: relative;
    flex: 1;
    overflow: hidden;
}

.content img {
    
    width: 100%;
    height: 508px;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
}

.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    background-color: #ffffff;
    border: none;
    border-radius: 50%;
    color: #111111;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
}

.deal-card {
    border-radius: 0 0 12px 12px;
    background-color: white;
    text-decoration: none;
    color: inherit;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #a5a6a8;
}

.detail {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.discount {
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    justify-content: flex-end;
    gap: 0.5rem;
}

.promo {
    font-weight: 500;
    line-height: 12px;
    font-size: 10px;
    color: #dc2626;
}

.sale-price-text {
    font-weight: 400;
    line-height: 18px;
    text-decoration: line-through;
    font-size: 12px;
    color: #6b7280;
}

.deal-info {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}


.deal-price {
    font-size: 18px;
    line-height: 26px;
    font-weight: 600;
    color: #111111;
    margin: 0;
}

.deal-title {
    font-size: 14px;
    font-weight: 400;
    color: #090d14;
    margin: 0;
    line-height: 20px;
}



/* Responsive */
@media (max-width: 768px) {
    .deal-reels-container {
        min-width: auto;
        width: 100%;
        padding: 1rem;
    }

    .stack {
        flex: 0 0 calc(50% - 0.5rem);
    }

    .swiper-wrapper {
        gap: 0.5rem;
    }
}
</style>