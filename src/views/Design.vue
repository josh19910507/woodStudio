<template>
  <div class="product-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <img src="../assets/images/室內設計1.jpg" alt="木門主題" class="hero-image" />
      <div class="hero-overlay">
        <h1>設計師進駐</h1>
        <p>探索我們的優質產品系列</p>
      </div>
    </section>

    <!-- 選品 -->
    <section class="products-section">
      <div class="section-background"></div>
      <div class="section-content">
        <h2>設計作品集</h2>

        <div class="carousel-container">
          <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">←</button>

          <div class="carousel-wrapper">
            <div
  class="carousel-track"
  :style="{
    '--items-per-view': itemsPerView,
    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
  }"
>
              <div
                v-for="product in products"
                :key="product.id"
                class="product-card"
                ref="productCards"
              >
                <!-- 卡片內圖片輪播 -->
                <div class="card-image-container">
                  <img 
                    :src="getImageUrl(product.images[product.currentImageIndex])" 
                    :alt="product.name" 
                    class="product-image"
                    @click="openLightbox(product)"
                  />
                  
                  <!-- 卡片輪播控制 -->
                  <div class="card-carousel-controls" v-if="product.images.length > 1">
                    <button 
                      class="card-nav-btn prev" 
                      @click.stop="prevCardImage(product)"
                      :disabled="product.currentImageIndex === 0"
                    >❮</button>
                    <button 
                      class="card-nav-btn next" 
                      @click.stop="nextCardImage(product)"
                      :disabled="product.currentImageIndex === product.images.length - 1"
                    >❯</button>
                  </div>

                  <!-- 卡片指示點 -->
                  <div class="card-indicators" v-if="product.images.length > 1">
                    <span
                      v-for="(img, idx) in product.images"
                      :key="idx"
                      :class="{ active: idx === product.currentImageIndex }"
                      @click.stop="setCardImage(product, idx)"
                    ></span>
                  </div>

                  <!-- 點擊提示 -->
                  <div class="click-hint">
                    <span>🔍 點擊查看大圖</span>
                  </div>
                </div>

                <div class="product-info">
                  <h3>{{ product.name }}</h3>
                  <p class="product-desc">{{ product.shortDesc }}</p>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex >= maxIndex">→</button>
        </div>

      </div>
    </section>

    <!-- Lightbox 燈箱 -->
    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="closeLightbox">✕</button>
          
          <div class="lightbox-image-container">
            <button 
              class="lightbox-nav prev" 
              @click="prevLightboxImage"
              v-if="currentProduct && currentProduct.images.length > 1"
            >❮</button>
            
            <img 
              :src="getImageUrl(currentProduct?.images[lightboxImageIndex])" 
              :alt="currentProduct?.name"
              class="lightbox-image"
            />
            
            <button 
              class="lightbox-nav next" 
              @click="nextLightboxImage"
              v-if="currentProduct && currentProduct.images.length > 1"
            >❯</button>
          </div>

          <div class="lightbox-info">
            <h3>{{ currentProduct?.name }}</h3>
            <p>{{ currentProduct?.shortDesc }}</p>
            <div class="lightbox-counter">
              {{ lightboxImageIndex + 1 }} / {{ currentProduct?.images.length }}
            </div>
          </div>

          <!-- Lightbox 縮圖導航 -->
          <div class="lightbox-thumbnails" v-if="currentProduct && currentProduct.images.length > 1">
            <img
              v-for="(img, idx) in currentProduct.images"
              :key="idx"
              :src="getImageUrl(img)"
              :class="{ active: idx === lightboxImageIndex }"
              @click="lightboxImageIndex = idx"
              class="thumbnail"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const currentIndex = ref(0)
const itemsPerView = ref(3)
const productCards = ref([])

// 燈箱狀態
const lightboxOpen = ref(false)
const currentProduct = ref(null)
const lightboxImageIndex = ref(0)

// 產品數據
const products = ref([
  {
    id: 1,
    name: '現代簡約風',
    shortDesc: '以淺色木質與中性色調營造開闊空間感。',
    images: ['現代簡約風_1.jpg','現代簡約風_2.jpg','現代簡約風_3.jpg'],
    currentImageIndex: 0,
  },
  {
    id: 2,
    name: '無印簡約風',
    shortDesc: '不到30歲的年輕首購族喜歡無印簡約木質的居家特色…',
    images: ['無印簡約風_1.jpg','無印簡約風_2.jpg','無印簡約風_3.jpg'],
    currentImageIndex: 0,
  },
  {
    id: 3,
    name: '簡約輕工業風',
    shortDesc: '為打造屋主喜歡的自在感生活環境…',
    images: ['簡約輕工業風_1.jpg','簡約輕工業風_2.jpg','簡約輕工業風_3.jpg'],
    currentImageIndex: 0,
  }
])

const slideWidth = computed(() => 100 / itemsPerView.value)
const maxIndex = computed(() => Math.max(0, products.value.length - itemsPerView.value))
const totalSlides = computed(() => maxIndex.value + 1)

// 主輪播控制
function nextSlide() { if (currentIndex.value < maxIndex.value) currentIndex.value++ }
function prevSlide() { if (currentIndex.value > 0) currentIndex.value-- }
function goToSlide(index) { currentIndex.value = index }

// 卡片內圖片輪播
function nextCardImage(product) { if (product.currentImageIndex < product.images.length - 1) product.currentImageIndex++ }
function prevCardImage(product) { if (product.currentImageIndex > 0) product.currentImageIndex-- }
function setCardImage(product, index) { product.currentImageIndex = index }

// Lightbox 控制
function openLightbox(product) {
  currentProduct.value = product
  lightboxImageIndex.value = product.currentImageIndex
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxOpen.value = false
  currentProduct.value = null
  document.body.style.overflow = ''
}
function nextLightboxImage() { if (lightboxImageIndex.value < currentProduct.value.images.length - 1) lightboxImageIndex.value++ }
function prevLightboxImage() { if (lightboxImageIndex.value > 0) lightboxImageIndex.value-- }

// 響應式處理
function updateItemsPerView() {
  if (window.innerWidth < 640) itemsPerView.value = 1
  else if (window.innerWidth < 1024) itemsPerView.value = 2
  else itemsPerView.value = 3

  // 更新 CSS 變數，確保卡片寬度正確
  document.documentElement.style.setProperty('--items-per-view', itemsPerView.value)

  if (currentIndex.value > maxIndex.value) currentIndex.value = maxIndex.value
}

// 鍵盤控制
function handleKeydown(e) {
  if (lightboxOpen.value) {
    if (e.key === 'ArrowLeft') prevLightboxImage()
    if (e.key === 'ArrowRight') nextLightboxImage()
    if (e.key === 'Escape') closeLightbox()
  } else {
    if (e.key === 'ArrowLeft') prevSlide()
    if (e.key === 'ArrowRight') nextSlide()
  }
}

// 生命週期
onMounted(() => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
  window.addEventListener('keydown', handleKeydown)

  // 滾動動畫
  nextTick(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    productCards.value.forEach(card => { if (card) observer.observe(card) })
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

const getImageUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href
</script>

<style scoped>
.product-page {
  font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
  color: #3c2f25;
  line-height: 1.6;
  background: #fafaf8;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  height: 70vh;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9) contrast(1.05) saturate(1.1);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
}
.hero-overlay h1 {
  font-size: 3rem;
  letter-spacing: 4px;
  margin: 0;
}
.hero-overlay p {
  font-size: 1.2rem;
  margin: 1rem 0 0;
}

/* Section */
.products-section {
  position: relative;
  padding: 5rem 1rem;
  overflow: hidden;
}
.section-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  filter: brightness(1.05) saturate(1.1);
}
.section-content {
  position: relative;
  z-index: 1;
  text-align: center;
}
.section-content h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #5a4634;
}

/* Carousel */
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 1rem;
}
.carousel-wrapper {
  overflow: hidden;
  width: 80%;
  max-width: 1200px;
}
.carousel-track {
  display: flex;
  transition: transform 0.6s ease;
  gap: 20px;
}

/* Product Card */
.product-card {
   flex: 0 0 calc((100% - (var(--items-per-view) - 1) * 20px) / var(--items-per-view));
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
}

.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

/* 卡片圖片容器 */
.card-image-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #f5f5f5;
}


.product-image {
  width: 100%;
  height: 100%;
 
  cursor: pointer;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* 卡片輪播按鈕 */
.card-carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-image-container:hover .card-carousel-controls {
  opacity: 1;
}

.card-nav-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.card-nav-btn:hover:not(:disabled) {
  background: #fff;
  transform: scale(1.1);
}

.card-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 卡片指示點 */
.card-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.card-indicators span {
 transition: all 0.3s ease;
}

.card-indicators span.active {
   background: #fff;
  width: 16px; /* 適中寬度 */
  border-radius: 8px;
}

/* 點擊提示 */
.click-hint {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-image-container:hover .click-hint {
  opacity: 1;
}

/* 產品資訊 */
.product-info {
  padding: 1.5rem;
  text-align: center;
}

.product-info h3 {
  font-size: 1.2rem;
  color: #5a4634;
  margin: 0 0 0.5rem;
}

.product-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* 主輪播按鈕 */
.carousel-btn {
  display: flex;               /* 讓內容可以用 flex 居中 */
  align-items: center;         /* 垂直置中箭頭 */
  justify-content: center;     /* 水平置中箭頭 */
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 1rem;
  transition: background 0.3s, transform 0.3s;
  line-height: 1;              /* 防止字體本身的行高影響置中 */
  padding: 0;                  /* 移除預設間距 */
}

.carousel-btn:hover:not(:disabled) {
  background: #fff;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 指示點 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 8px;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  width: 30px;
  border-radius: 6px;
  background: #b48a60;
}

/* Lightbox 燈箱 */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox-content {
  position: relative;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items:end;
  justify-content: center;
  transition: transform 0.3s;
}

.lightbox-close:hover {
  transform: rotate(90deg);
}

.lightbox-image-container {
  position: relative;
  max-width: 70vw;
  max-height: 70vh;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lightbox-image {
  max-width: 120%;
  max-height: 50vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.lightbox-nav {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
}

.lightbox-nav:hover {
  background: #fff;
  transform: scale(1.1);
}

.lightbox-info {
  text-align: center;
  color: #fff;
  max-width: 600px;
}

.lightbox-info h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.lightbox-info p {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

.lightbox-counter {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Lightbox 縮圖 */
.lightbox-thumbnails {
  display: flex;
  gap: 10px;
  max-width: 600px;
  overflow-x: auto;
  padding: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.thumbnail:hover {
  opacity: 0.8;
}

.thumbnail.active {
  opacity: 1;
  border-color: #b48a60;
}

/* Responsive */
@media (max-width: 1024px) {
  .product-card {
    flex: 0 0 calc((100% - 1 * 15px) / 2);
  }
  .hero-overlay h1 {
    font-size: 2rem;
  }
  .lightbox-image-container{
    max-width: 80%;
    margin-right: 50px;
  }
  .lightbox-nav{
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 60%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  }
  .carousel-track { gap: 15px; }
}

@media (max-width: 640px) {
  .product-card {
    flex: 0 0 100%;
  }
  .carousel-wrapper {
    width: 100%;
  }
  .hero-overlay h1 {
    font-size: 1.5rem;
  }
  .card-image-container {
    height: 200px;
  }
  .lightbox-nav {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    border-radius: 50%; /* 保持圓形 */
  }
  .lightbox-content {
  position: relative;
  max-width: 640px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.lightbox-close{
  margin-left: 30px;
}
.lightbox-nav{
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 60%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  }
  .carousel-track { gap: 0px; }
  .product-card { flex: 0 0 100%; }
}
</style>