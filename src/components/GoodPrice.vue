<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useCarouselDrag } from './composables/useCarouselDrag.js';

const totalStacks = 10;
const visibleStacks = 5;
const currentIndex = ref(0);

const promotionalProducts = [
    {
        image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/amazfit_cheetah_square_kem_1_68eff19784.jpg',
        features: [
            {
                icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_9e90c55554.svg',
                label: '8 Ngày',
            },
            {
                icon: 'https://cdn2.fptshop.com.vn/svg/ic_gps_f2857d1b8b.svg',
                label: 'Định vị GPS',
            },
            {
                icon: 'https://cdn2.fptshop.com.vn/svg/ic_water_resistant_f2193d2539.svg',
                label: 'Kháng nước 5 ATM',
            },
        ],
        salePrice: '14.990.000 ₫',
        originalPrice: '17.990.000 ₫',
        discount: '-20%',
        productName: 'Amazfit Cheetah Pro',
        priceBackground: 'https://fptshop.com.vn/img/Price-GVGS.png?w=1920&q=75',
    },
];

const stacks = ref([]);

// Initialize carousel drag composable
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

// Computed styles for carousel transform
const carouselTransform = computed(() => {
    const baseTranslate = -(currentIndex.value * stackWidthPercent.value);
    const dragTranslate = (dragOffset.value / (carouselViewport.value?.offsetWidth || 1)) * 100;
    return `translateX(${baseTranslate + dragTranslate}%)`;
});

const initializeStacks = () => {
    for (let i = 0; i < totalStacks; i++) {
        const product = promotionalProducts[i % promotionalProducts.length];
        stacks.value.push({
            id: `promo-${i}`,
            image: product.image,
            features: product.features,
            slot: `${Math.floor(Math.random() * 10) + 1}/${visibleStacks}`,
            salePrice: product.salePrice,
            originalPrice: product.originalPrice,
            discount: product.discount,
            productName: product.productName,
            priceBackground: product.priceBackground,
        });
    }
};

// Navigation controls
const canGoPrev = computed(() => currentIndex.value > 0);
const canGoNext = computed(() => currentIndex.value < totalStacks - visibleStacks);

onMounted(() => {
    initializeStacks();
    initializeCursor();

    if (carouselTrack.value) {
        carouselTrack.value.addEventListener('mousedown', handleDragStart);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        carouselTrack.value.addEventListener('touchstart', handleDragStart, { passive: false });
        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('touchend', handleDragEnd);
    }
});

onUnmounted(() => {
    cleanup();
    if (carouselTrack.value) {
        carouselTrack.value.removeEventListener('mousedown', handleDragStart);
        carouselTrack.value.removeEventListener('touchstart', handleDragStart);
    }
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
});
</script>

<template>
    <div class="golden-hour-container">
        <div class="golden-hour-top">
            <img alt="https://fptshop.com.vn/" loading="lazy" width="1180" height="133.75" decoding="async"
                style="color: transparent;"
                srcset="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/GSOL_1_45b6bd3013.png 1x"
                src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/GSOL_1_45b6bd3013.png" />
        </div>

        <div class="golden-hour-board">
            <div class="carousel-container">
                <button class="nav-button nav-prev" @click="prevSlide" :disabled="!canGoPrev"
                    :class="{ disabled: !canGoPrev }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <div class="carousel-viewport" ref="carouselViewport">
                    <div class="product-content carousel-track" ref="carouselTrack" :style="{
                        transform: carouselTransform,
                        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }">
                        <div class="product-stack" v-for="stack in stacks" :key="stack.id"
                            :style="{ width: `${stackWidthPercent}%` }">
                            <div class="product-detail">
                                <div class="product-side">
                                    <div class="product-image">
                                        <img :src="stack.image" alt="Product" loading="lazy" width="140" height="140"
                                            decoding="async" style="color: transparent;" />
                                    </div>
                                </div>
                                <div class="product-feature-side">
                                    <div class="product-feature" v-for="(feature, index) in stack.features"
                                        :key="index">
                                        <img :src="feature.icon" :alt="feature.label" loading="lazy" width="24"
                                            height="24" decoding="async" style="color: transparent;" />
                                        <div class="product-feature-decription">
                                            <p>{{ feature.label }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="badge">
                                <div class="slot-badge">
                                    <span class="slot-icon">
                                        <span class="icon-wrapper">
                                            <svg width="17" height="21" viewBox="0 0 17 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.8332 6.59109C16.7524 6.41848 16.624 6.27249 16.4632 6.17024C16.3023 6.06798 16.1157 6.01371 15.9251 6.01377H11.533L13.8143 1.45032C13.8906 1.29755 13.9266 1.12781 13.919 0.957198C13.9113 0.786589 13.8601 0.620772 13.7704 0.475483C13.6806 0.330194 13.5552 0.210251 13.4061 0.127035C13.2569 0.0438192 13.089 9.1179e-05 12.9182 8.50536e-10H6.90444C6.72575 -7.35914e-06 6.55032 0.0477518 6.3963 0.138332C6.24228 0.228912 6.11527 0.359019 6.02843 0.51518L1.01696 9.53584C0.932111 9.68841 0.888589 9.8605 0.890698 10.0351C0.892807 10.2096 0.940473 10.3806 1.02898 10.5311C1.11748 10.6816 1.24376 10.8063 1.3953 10.893C1.54684 10.9797 1.71839 11.0253 1.89296 11.0252H6.65687L4.9239 18.8261C4.87537 19.0454 4.90188 19.2746 4.99918 19.477C5.09648 19.6794 5.25892 19.8432 5.46047 19.9423C5.66202 20.0413 5.89099 20.0698 6.11066 20.0232C6.33033 19.9765 6.52798 19.8575 6.6719 19.6851L16.6949 7.65754C16.8168 7.51128 16.8946 7.3333 16.9191 7.14443C16.9436 6.95557 16.9138 6.76363 16.8332 6.59109Z"
                                                    fill="url(#paint0_linear_4956_5938)"></path>
                                                <defs>
                                                    <linearGradient id="paint0_linear_4956_5938" x1="2.93836"
                                                        y1="3.55113" x2="12.8751" y2="13.4879"
                                                        gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#FFDD00"></stop>
                                                        <stop offset="1" stop-color="#FEB100"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slot-text">Còn {{ stack.slot }} suất</span>
                                </div>
                            </div>
                            <div class="product-description">
                                <div class="price" :style="{ backgroundImage: `url(${stack.priceBackground})` }">
                                    <div class="price-detail">
                                        <div class="sale-price">
                                            <div class="sale-price-text">{{ stack.salePrice }}</div>
                                        </div>
                                        <div class="original-price">
                                            <div class="sale-price-text">{{ stack.originalPrice }}</div>
                                        </div>
                                    </div>
                                    <div class="discount">
                                        <span class="discount-text">{{ stack.discount }}</span>
                                    </div>
                                </div>
                                <div class="product-name">
                                    <p class="product-name-text">{{ stack.productName }}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <button class="nav-button nav-next" @click="nextSlide" :disabled="!canGoNext"
                    :class="{ disabled: !canGoNext }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.golden-hour-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.golden-hour-top {
    height: 183.75px;
    padding: 50px 0 0 80px;
    width: 100%;
}

.golden-hour-board {
    width: 1180px;
    height: fit-content;
    background: linear-gradient(180deg, #FFB2C8 0%, #FFC1D4 100%);
    margin: 0 0 0px 80px;
    padding: 0px 12px 10px 12px;
    border-radius: 0 0 16px 16px;
}
.carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
}

.carousel-viewport {
    flex: 1;
    overflow: hidden;
    height: 370px;
}

.carousel-track {
    display: flex;
    will-change: transform;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
}

.nav-button:hover:not(.disabled) {
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.1);
}

.nav-button.disabled {
    opacity: 0.3;
    cursor: none;
}

.nav-prev {
    left: 12px;
}

.nav-next {
    right: 12px;
}

.product-content {
    background-color: #ffffff;
    height: fit-content;
}

.product-stack {
    background-color: #fff;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
}

.product-detail {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 226px;
    height: 200px;
    padding: 0 0 12px 0;
}

.product-side {
    width: fit-content;
    height: fit-content;
    padding: 24px 0 0 0;
}

.product-feature-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.product-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.product-feature-decription p {
    font-size: 10px;
    font-weight: 400;
    color: #555;
    line-height: 1.1;
    margin: 2px 0 0 0;
    padding: 0;
    max-width: 70px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    text-align: center;
    word-wrap: break-word;
}

.badge {
    padding: 0 0 20px 0;
    margin: 0px 0 15px 15px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.slot-badge {
    position: relative;
    width: 95.55px;
    height: 18px;
    margin: 0 0 5px 0;
    padding: 3px 17px;
    background:
        linear-gradient(274.42deg, #F2030C 17.37%, #A80000 98.19%, #91050A 137.04%),
        linear-gradient(40.78deg, #EE400D 57.41%, #FFDB8E 116.59%),
        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 85.84%),
        #DC2626;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slot-text {
    font-weight: 500;
    color: #fff;
    font-size: 11px;
    line-height: 1;
    z-index: 1;
    white-space: nowrap;
}

.slot-icon {
    position: absolute;
    left: -7px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-wrapper {
    display: flex;
}

.product-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 226px;
    height: 110px;
    background-color: #ffffff;
    gap: 4px;
    padding: 8px 0;
}

.price {
    position: relative;
    width: 91%;
    border-radius: 8px;
    min-height: 50px;
    background-size: cover;
    background-position: center;
    display: flex;
    padding: 0 7px 0 12px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

}

.price-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.sale-price-text {
    font-size: 18px;
    font-weight: 550;
    color: #ffffff;
    line-height: 1.2;
    margin: 0;
}

.original-price .sale-price-text {
    font-size: 12px;
    font-weight: 600;
    color: #DB6C6E;
    text-decoration: line-through;
}

.discount {
    border-radius: 4px;
    padding: 2px 6px;
}

.discount-text {
    font-size: 18px;
    font-weight: 600;
    color: #DF372D;
    line-height: 1.2;
}

.product-name {
    width: 91%;
    min-height: 50px;
    margin: 4px 0 0 4px;
    text-align: baseline;
}

.product-name-text {
    font-size: 12px;
    font-weight: 500;
    color: #1f2937;
    margin: 0;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}



.buy-button {
    width: 91%;
    height: 50px;
    border: 1px solid #DF372D;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 6px 12px;
    font-size: 18px;
    font-weight: 500;
    color: #DF372D;
    cursor: pointer;
    transition: background 0.2s ease;
}

.carousel-indicators {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;
}

.indicator.active {
    background: #ef4444;
    transform: scale(1.2);
}

.indicator:hover {
    background: rgba(255, 255, 255, 0.8);
}

@media (max-width: 1280px) {
    .golden-hour-board {
        width: calc(100% - 80px);
        max-width: 1180px;
    }
}

@media (max-width: 768px) {
    .golden-hour-top {
        padding: 50px 0 0 20px;
    }

    .golden-hour-board {
        margin: 0 0 0 20px;
        width: calc(100% - 40px);
        padding: 20px 8px 16px 8px;
    }

    .date-item {
        padding: 8px 12px;
        height: 60px;
    }

    .date-text {
        font-size: 14px;
    }

    .status-text {
        font-size: 11px;
    }

    .time-digit {
        padding: 1px 4px;
        font-size: 10px;
        min-width: 16px;
    }

    .carousel-viewport {
        height: 250px;
    }

    .product-detail {
        width: 180px;
        height: 170px;
    }

    .product-description {
        width: 180px;
        height: 100px;
        padding: 6px 0;
    }

    .price {
        height: 36px;
        padding: 0 8px;
    }

    .sale-price-text {
        font-size: 12px;
    }

    .original-price .sale-price-text {
        font-size: 10px;
    }

    .discount-text {
        font-size: 10px;
    }

    .product-name-text {
        font-size: 11px;
        max-width: 160px;
    }

    .buy-button {
        padding: 5px 10px;
        font-size: 11px;
    }

    .nav-button {
        width: 32px;
        height: 32px;
    }

    .nav-prev {
        left: 8px;
    }

    .nav-next {
        right: 8px;
    }
}
</style>