<script setup>
import Header from './components/Header.vue'
import LocationMenu from './components/LocationMenu.vue';

import Test from './components/Test.vue';
import Carousel from './components/Carousel.vue';
import Carousel5 from './components/Carousel.vue';
import GoldenHour from './components/GoldenHour.vue';
import GoodPrice from './components/GoodPrice.vue';
import Carousel3Stack from './components/Carousel3Stack.vue';
import DealReels from './components/DealReels.vue';
import FloatingIcons from './components/FloatingIcons.vue';
import OnlineShoping from './components/OnlineShoping.vue';
import Footer from './components/Footer.vue';
import Advantage from './components/Advantage.vue';
</script>

<template>
  <FloatingIcons />
  <Header />
  <LocationMenu />
  <Test />
  <Carousel />
  <GoldenHour />
  <GoodPrice />
  <Carousel3Stack />
  <Carousel5 />
  <OnlineShoping />
  <DealReels />
  <Advantage />
  <Footer/>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #F3F4F6;
}

#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
