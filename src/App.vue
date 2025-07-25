<script setup>
import Header from './components/Header.vue'
import LocationMenu from './components/LocationMenu.vue';

import Test from './components/Test.vue';
import Carousel from './components/Carousel.vue';
import GoldenHour from './components/GoldenHour.vue';
</script>

<template>
  <Header />
  <LocationMenu />
  <Test />
  <Carousel />
  <GoldenHour />
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
