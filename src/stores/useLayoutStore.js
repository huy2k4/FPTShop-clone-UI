import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // Background images for SectionMain - synchronized with mainBanners
    backgrounds: [
      'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/desk_header_bg_a43ac514b7.png',
      '#ffffff' // white background for second banner
    ],
    
    // Banner images for LayoutWrapper
    mainBanners: [
      'https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/mb_header_6_accc9b66d0.png',
      'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/desk_header_8107ca637d.png'
    ],
    
    // Banner images for SubSection
    subBanners: [
      'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H2_614x212_a4ee0cfb12.png',
      'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H2_612x212_09895a7ae8.png',
      'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H2_614x212_1dad35a1e3.png'
    ],
    
    // Current active indices
    currentMainBannerIndex: 0,
    currentSubBannerIndex: 0
  }),
  
  getters: {
    // Background follows main banner index
    currentBackground: (state) => state.backgrounds[state.currentMainBannerIndex],
    currentMainBanner: (state) => state.mainBanners[state.currentMainBannerIndex],
    currentSubBanners: (state) => {
      const startIndex = state.currentSubBannerIndex;
      return [
        state.subBanners[startIndex % state.subBanners.length],
        state.subBanners[(startIndex + 1) % state.subBanners.length]
      ];
    }
  },
  
  actions: {
    nextMainBanner() {
      this.currentMainBannerIndex = (this.currentMainBannerIndex + 1) % this.mainBanners.length;
    },
    
    prevMainBanner() {
      this.currentMainBannerIndex = this.currentMainBannerIndex === 0 
        ? this.mainBanners.length - 1 
        : this.currentMainBannerIndex - 1;
    },
    
    setMainBannerIndex(index) {
      this.currentMainBannerIndex = index;
    },
    
    nextSubBanner() {
      this.currentSubBannerIndex = (this.currentSubBannerIndex + 1) % this.subBanners.length;
    },
    
    prevSubBanner() {
      this.currentSubBannerIndex = this.currentSubBannerIndex === 0 
        ? this.subBanners.length - 1 
        : this.currentSubBannerIndex - 1;
    },
    
    setSubBannerIndex(index) {
      this.currentSubBannerIndex = index;
    }
  }
})