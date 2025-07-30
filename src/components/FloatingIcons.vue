<template>
  <div>
    <!-- Icon bên trái với nút tắt -->
    <div v-if="showLeftIcon" class="icon-left-wrapper">
      <div class="close-button" @click="hideLeftIcon">×</div>
      <img
        class="icon-left"
        src="https://web-image.useinsider.com/fptshop/defaultImageLibrary/Icon-1752138192.png"
        alt="Gift Icon"
      />
    </div>

    <!-- Icon bên phải -->
    <img
      class="icon-right"
      src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
      alt="Logo"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showLeftIcon = ref(true)

function hideLeftIcon() {
  showLeftIcon.value = false
}
</script>

<style scoped>
.icon-left-wrapper {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
}

.icon-left {
  width: 85px;
  height: 85px;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  background-color: #939CA3;
  color: #ffffff;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  z-index: 10000;
}

.icon-right {
  position: fixed;
  bottom: 108px;
  right: 19px;
  width: 50px;
  height: 50px;
  z-index: 9999;
  cursor: pointer;
}
</style>
