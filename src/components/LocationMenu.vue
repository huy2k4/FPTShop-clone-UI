<template>
    <div class="location-menu">
        <div class="container">
            <nav class="nav-menu">
                <div class="menu-item">
                    <a href="#" class="menu-link">
                        <img alt="Smartphone học sinh siêu RẺ" loading="lazy" width="32" height="32" decoding="async"
                            class="menu-icon" :srcset="menuItems[0].srcset" :src="menuItems[0].src" />
                        <span class="menu-text">{{ menuItems[0].text }}</span>
                    </a>
                </div>

                <div class="menu-item">
                    <a href="#" class="menu-link">
                        <img alt="Cơ hội vàng săn LG" loading="lazy" width="32" height="32" decoding="async"
                            class="menu-icon" :srcset="menuItems[1].srcset" :src="menuItems[1].src" />
                        <span class="menu-text">{{ menuItems[1].text }}</span>
                    </a>
                </div>

                <div class="menu-item">
                    <a href="#" class="menu-link">
                        <img alt="Sim du lịch" loading="lazy" width="32" height="32" decoding="async" class="menu-icon"
                            :srcset="menuItems[2].srcset" :src="menuItems[2].src" />
                        <span class="menu-text">{{ menuItems[2].text }}</span>
                    </a>
                </div>

                <div class="menu-item">
                    <a href="#" class="menu-link">
                        <img alt="Máy lọc nước từ 3.290k" loading="lazy" width="32" height="32" decoding="async"
                            class="menu-icon" :srcset="menuItems[3].srcset" :src="menuItems[3].src" />
                        <span class="menu-text">{{ menuItems[3].text }}</span>
                    </a>
                </div>
            </nav>

            <ul class="location-info">
                <li class="location-item">
                    <EnvironmentTwoTone :twoToneColor="['#dc2626', '#dc2626']" class="location-icon" />
                    <span>Xem sản phẩm tại:</span>
                    <span class="location-address">Phường 3, Quận Bình Thạnh, TP.HCM</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { EnvironmentTwoTone } from '@ant-design/icons-vue'

const menuItems = [
    {
        text: 'Smartphone học sinh siêu RẺ',
        src: 'https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/Icon_ONLINE_4a0d35b5d3.png',
        srcset: 'https://cdn2.fptshop.com.vn/unsafe/32x0/filters:format(webp):quality(75)/small/Icon_ONLINE_4a0d35b5d3.png 1x, https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/Icon_ONLINE_4a0d35b5d3.png 2x'
    },
    {
        text: 'Cơ hội vàng săn LG',
        src: 'https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/Icon_Gia_soc_517729dd32.png',
        srcset: 'https://cdn2.fptshop.com.vn/unsafe/32x0/filters:format(webp):quality(75)/small/Icon_Gia_soc_517729dd32.png 1x, https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/Icon_Gia_soc_517729dd32.png 2x'
    },
    {
        text: 'Sim du lịch',
        src: 'https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_sim_du_lich_ea0c022d47.png',
        srcset: 'https://cdn2.fptshop.com.vn/unsafe/32x0/filters:format(webp):quality(75)/small/icon_sim_du_lich_ea0c022d47.png 1x, https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_sim_du_lich_ea0c022d47.png 2x'
    },
    {
        text: 'Máy lọc nước từ 3.290k',
        src: 'https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_may_loc_nuoc_c36fe887af.png',
        srcset: 'https://cdn2.fptshop.com.vn/unsafe/32x0/filters:format(webp):quality(75)/small/icon_may_loc_nuoc_c36fe887af.png 1x, https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_may_loc_nuoc_c36fe887af.png 2x'
    }
]
</script>

<style scoped>
.location-menu {
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    padding: 0px 0;
    display: flex;
    width: 100vw;
    justify-content: center;
}

.container {
    min-width: 1300px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.nav-menu {
    padding: 0 90px 0 30px;
    display: flex;
    gap: 5px;
}

.menu-item {
    display: flex;
    align-items: center;
}

.menu-link {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 4px 5px;
    margin: 0 1px 0 0;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.menu-icon {
    margin-right: 8px;
}

.menu-text {
    white-space: nowrap;
}

.location-info {
    border-left: 1px solid #dbcdcd;
    list-style: none;
    margin: 0;
    padding: 0 0 0 8px;
}

.location-item {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
}

.location-icon {
    color: #f5131e;
    font-size: 20px;
}

.location-address {
    white-space: nowrap;
    color: #333;
    font-weight: 500;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        gap: 16px;
    }

    .nav-menu {
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
    }

    .menu-text {
        display: none;
    }

    .menu-link {
        padding: 8px;
    }
}
</style>