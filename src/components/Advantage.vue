<template>
    <div class="feature-policy">
        <div class="container">
            <div class="advantage">
                <div class="advantage-item">
                    <div class="item-image">
                        <img alt="Thương hiệu đảm bảo" loading="lazy" width="60" height="60" decoding="async"
                            data-nimg="1"
                            srcset="https://fptshop.com.vn/img/icons/policy3.svg?w=128&amp;q=75"
                            src="https://fptshop.com.vn/img/icons/policy3.svg?w=128&amp;q=75"
                            style="color: transparent;">
                    </div>
                    <div class="item-text">
                        <p>Thương hiệu đảm bảo</p>
                        <p>Nhập khẩu, bảo hành chính hãng</p>
                    </div>
                </div>
                <div class="advantage-item">
                    <div class="item-image">
                        <img alt="Đổi trả dễ dàng" loading="lazy" width="60" height="60" decoding="async" data-nimg="1"
                            src="https://fptshop.com.vn/img/icons/policy4.svg?w=128&amp;q=75"
                            srcset="https://fptshop.com.vn/img/icons/policy4.svg?w=128&amp;q=75"
                            style="color: transparent;">
                    </div>
                    <div class="item-text">
                        <p>Đổi trả dễ dàng</p>
                        <p>Theo chính sách đổi trả tại FPT Shop</p>
                    </div>
                </div>
                <div class="advantage-item">
                    <div class="item-image">
                        <img alt="Giao hàng tận nơi" loading="lazy" width="60" height="60" decoding="async"
                            data-nimg="1"
                            srcset="https://fptshop.com.vn/img/icons/policy1.svg?w=128&amp;q=75"
                            src="https://fptshop.com.vn/img/icons/policy1.svg?w=128&amp;q=75"
                            style="color: transparent;">
                    </div>
                    <div class="item-text">
                        <p>Giao hàng tận nơi</p>
                        <p>Trên toàn quốc</p>
                    </div>
                </div>
                <div class="advantage-item">
                    <div class="item-image">
                        <img alt="Sản phẩm chất lượng" loading="lazy" width="60" height="60" decoding="async"
                            data-nimg="1"
                            srcset="https://fptshop.com.vn/img/icons/policy2.svg?w=128&amp;q=75"
                            src="https://fptshop.com.vn/img/icons/policy2.svg?w=128&amp;q=75"
                            style="color: transparent;">
                    </div>
                     <div class="item-text">
                        <p>Sản phẩm chất lượng</p>
                        <p>Đảm bảo tương thích và độ bền cao</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
<style scoped>
.feature-policy {
    background-color: #F3F4F6;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    padding: 0 20px ;
    margin: 0 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.advantage {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    flex-direction: row;
}

.advantage-item {
    width: 310px;
    height: 116px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.item-image {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px;
}
.item-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item-text p {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #090d14;
}
.item-text p:last-child {
    font-weight: 400;
}
</style>
