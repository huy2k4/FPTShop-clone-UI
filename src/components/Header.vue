<script>
import { defineComponent, ref } from 'vue';
import {
    Layout,
    Dropdown,
    Menu,
    Button,
    Badge,
    Avatar
} from 'ant-design-vue';
import {
    SearchOutlined,
    MenuOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'FPTShopHeader',
    components: {
        'a-layout-header': Layout.Header,
        'a-dropdown': Dropdown,
        'a-menu': Menu,
        'a-menu-item': Menu.Item,
        'a-button': Button,
        'a-badge': Badge,
        'a-avatar': Avatar,
        MenuOutlined,
        ShoppingCartOutlined,
        UserOutlined,
        SearchOutlined
    },
    setup() {
        const logoUrl =
            'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/small/fptshop_logo_c5ac91ae46.png';
        const searchQuery = ref('');

        const onSearch = () => {
            alert(`Bạn vừa tìm: ${searchQuery.value}`);
        };

        return {
            logoUrl,
            searchQuery,
            onSearch
        };
    }
});
</script>

<template>
    <a-layout-header class="header">
        <div class="left-section">
            <img :src="logoUrl" alt="FPT Shop Logo" class="logo" />

            <a-dropdown>
                <a-button class="category-button">
                    <MenuOutlined /> Danh mục
                </a-button>
            </a-dropdown>

            <div class="search-container">
                <div class="search-bar">
                    <input v-model="searchQuery" type="text"
                        placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm" />
                    <button @click="onSearch" title="Tìm kiếm" class="search-btn">
                        <SearchOutlined class="search-icon" />
                    </button>
                </div>
                <div class="hot-keyword">
                    <a href="">iphone 16</a>
                    <a href="">laptop</a>
                    <a href="">apple watch</a>
                    <a href="">ipad</a>
                    <a href="">máy lạnh</a>
                    <a href="">robot hút bụi</a>
                    <a href="">samsung</a>
                    <a href="">carseat</a>
                </div>
            </div>
        </div>

        <div class="right-section">
            <a-avatar class="avatar">
                <UserOutlined class="avatar-icon" />
            </a-avatar>
            <a-badge count="0" class="cart-badge">
                <a-button class="cart-button">
                    <ShoppingCartOutlined />
                    Giỏ hàng
                </a-button>
            </a-badge>


        </div>
    </a-layout-header>
</template>

<style scoped>
.header {
    width: 100%;
    background: linear-gradient(5deg, #cb1c22 67.61%, #d9503f 95.18%);
    display: flex;
    align-items: start;
    justify-content: center;
    padding: 0px 30px 20px 35px;
}

.left-section {
    display: flex;
    max-width: 80%;
    justify-content: baseline;
    align-items: start;
    flex-grow: 1;
    padding: 20px 0 0 0;
}

.logo {
    height: 40px;
    margin-right: 20px;
}

.category-button {
    border-radius: 30px;
    min-height: fit-content;
    min-width: 140px;
    padding: 8px 0;
    margin: 0px 8px 0 40px;
    font-weight: 450;
    font-size: large;
    background: #7e161c;
    color: white;
    border: none;
}

.search-container {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-direction: column;
    width: 100%;
}

.search-bar {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 35px;
    padding: 6px 12px;
    min-width: 565px;
    /* max-width: 565px; */
    margin: 0px 0px 0px 0px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
    flex-grow: 1;
}

.search-bar input {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
}

.search-btn {
    background-color: #fee2e2;
    color: white;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.search-icon {
    color: #7e161c;
}

.hot-keyword{

    display: flex;
    flex-direction: row;
    gap: 1px;
    margin: 5px 0px 0px 6px;
}

.hot-keyword a {
    text-decoration: none;
    font-family:Arial, Helvetica, sans-serif;
    line-height: 22px;
    font-size: 15px;
    color: #fff;
    padding: 0 0 0 10px;
}

.hot-keyword a:hover {
    text-decoration: underline;
}

.right-section {
    padding: 20px 0 0 0;
    height: 60px;
    /* background-color: aliceblue; */
    gap: 10px;
    display: flex;
    align-items: center;
}

.cart-badge {
    display: flex;
    align-items: center;
    height: fit-content;
    /* background-color: #d9503f; */
    /* border-radius: 10px; */
    /* width: 80px; */
    /* margin-right: 20px; */
}

.cart-button {
    width: 132.17px;
    height: 44px;
    font-size: 1rem;
    font-weight: 500;
    padding: 0px 18px 0px 18px;
    border-radius: 40px;
    background: #000;
    color: white;
    border: none;
}

.avatar {
    display: flex;
    align-items: center;
    width: 44px;
    height: 44px;
    background-color: #7d161c;
    margin-left: 0px;
}

.avatar-icon {
    font-size: 18px;
}

.ant-dropdown-menu {
    background: linear-gradient(5deg, #cb1c22 67.61%, #d9503f 95.18%);
    color: white;
}

.ant-dropdown-menu-item {
    color: white !important;
}

.ant-dropdown-menu-item:hover {
    background: #990000;
    color: white !important;
}
</style>
