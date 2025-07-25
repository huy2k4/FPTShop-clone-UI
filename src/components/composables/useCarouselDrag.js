// composables/useCarouselDrag.js
import { ref, computed } from 'vue';

export function useCarouselDrag(totalStacks, visibleStacks, currentIndex) {
  // Drag state
  const isDragging = ref(false);
  const startX = ref(0);
  const dragOffset = ref(0);
  const velocity = ref(0);
  const lastX = ref(0);
  const lastTime = ref(0);
  const momentumAnimation = ref(null);

  // Refs for DOM elements (will be set from component)
  const carouselViewport = ref(null);
  const carouselTrack = ref(null);

  // Computed
  const stackWidthPercent = computed(() => 100 / visibleStacks);

  // Helper function to get client X coordinate
  const getClientX = (e) => {
    return e.type.includes('touch') ? e.touches[0]?.clientX || e.changedTouches[0]?.clientX : e.clientX;
  };

  // Drag start handler
  const handleDragStart = (e) => {
    isDragging.value = true;
    const clientX = getClientX(e);
    startX.value = clientX;
    lastX.value = clientX;
    lastTime.value = Date.now();
    velocity.value = 0;
    dragOffset.value = 0;

    if (momentumAnimation.value) {
      cancelAnimationFrame(momentumAnimation.value);
      momentumAnimation.value = null;
    }

    e.preventDefault();
    if (carouselTrack.value) {
      carouselTrack.value.style.cursor = 'pointing';
    }

    if (carouselTrack.value) {
      clearTimeout(carouselTrack.value.scrollTimeout);
      clearTimeout(carouselTrack.value.wheelTimeout);
    }
  };

  // Drag move handler
  const handleDragMove = (e) => {
    if (!isDragging.value) return;

    e.preventDefault();
    const currentX = getClientX(e);
    const currentTime = Date.now();

    const deltaX = currentX - lastX.value;
    const deltaTime = currentTime - lastTime.value;

    if (deltaTime > 0) {
      velocity.value = deltaX / deltaTime;
    }

    lastX.value = currentX;
    lastTime.value = currentTime;

    dragOffset.value = currentX - startX.value;
  };

  // Drag end handler
  const handleDragEnd = (e) => {
    if (!isDragging.value) return;

    isDragging.value = false;
    if (carouselTrack.value) {
      carouselTrack.value.style.cursor = 'pointer';
    }

    const threshold = 80;
    const absVelocity = Math.abs(velocity.value);

    let shouldMove = false;
    let direction = 0;

    if (Math.abs(dragOffset.value) > threshold || absVelocity > 0.3) {
      if (dragOffset.value < 0 && currentIndex.value < totalStacks - visibleStacks) {
        direction = 1;
        shouldMove = true;
      } else if (dragOffset.value > 0 && currentIndex.value > 0) {
        direction = -1;
        shouldMove = true;
      }
    }

    if (shouldMove) {
      if (direction > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else if (absVelocity > 0.1) {
      applyMomentum();
    } else {
      snapToCurrentSlide();
    }
  };

  // Apply momentum after drag end
  const applyMomentum = () => {
    const friction = 0.92;
    const minVelocity = 0.1;

    const animate = () => {
      if (Math.abs(velocity.value) < minVelocity) {
        snapToCurrentSlide();
        return;
      }

      dragOffset.value += velocity.value * 16;
      velocity.value *= friction;

      if (carouselViewport.value && Math.abs(dragOffset.value) > carouselViewport.value.offsetWidth / visibleStacks) {
        if (dragOffset.value < 0 && currentIndex.value < totalStacks - visibleStacks) {
          nextSlide();
        } else if (dragOffset.value > 0 && currentIndex.value > 0) {
          prevSlide();
        } else {
          snapToCurrentSlide();
        }
        return;
      }

      momentumAnimation.value = requestAnimationFrame(animate);
    };

    momentumAnimation.value = requestAnimationFrame(animate);
  };

  // Snap to current slide
  const snapToCurrentSlide = () => {
    dragOffset.value = 0;
    if (momentumAnimation.value) {
      cancelAnimationFrame(momentumAnimation.value);
      momentumAnimation.value = null;
    }
  };

  // Navigate to next slide
  const nextSlide = () => {
    if (currentIndex.value < totalStacks - visibleStacks) {
      currentIndex.value++;
      snapToCurrentSlide();
    } else {
      snapToCurrentSlide();
    }
  };

  // Navigate to previous slide
  const prevSlide = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      snapToCurrentSlide();
    } else {
      snapToCurrentSlide();
    }
  };

  // Go to specific slide
  const goToSlide = (index) => {
    currentIndex.value = Math.max(0, Math.min(index, totalStacks - visibleStacks));
    snapToCurrentSlide();
  };

  // Cleanup function
  const cleanup = () => {
    if (momentumAnimation.value) {
      cancelAnimationFrame(momentumAnimation.value);
    }
  };

  // Set cursor style on mount
  const initializeCursor = () => {
    if (carouselTrack.value) {
      carouselTrack.value.style.cursor = 'pointer';
    }
  };

  return {
    // State
    isDragging,
    dragOffset,
    carouselViewport,
    carouselTrack,
    
    // Computed
    stackWidthPercent,
    
    // Methods
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    nextSlide,
    prevSlide,
    goToSlide,
    snapToCurrentSlide,
    cleanup,
    initializeCursor
  };
}