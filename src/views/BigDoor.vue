<template>
  <div class="product-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-parallax">
        <img src="../assets/images/大門1.png" alt="大門主題" class="hero-image" />
      </div>
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="hero-subtitle">GRAND ENTRANCE DOORS</span>
          <h1 class="hero-title">大門</h1>
          <p class="hero-description">探索我們的優質產品系列</p>
          <button class="btn-contact" @click="scrollToFooter">
            <span>立即了解更多</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
      <div class="hero-decoration"></div>
    </section>

    <!-- 大門選品 -->
    <section class="products-section">
      <div class="section-background">
        <div class="bg-pattern"></div>
      </div>
      <div id="product" class="section-content container">
        <div class="section-header">
          <span class="section-label">DOOR COLLECTIONS</span>
          <h2>大門選品</h2>
          <p class="section-subtitle">多元選擇，打造專屬入口美學</p>
        </div>

        <!-- 鑄鋁門 -->
        <div class="category-block">
          <div class="category-title">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </div>
            <h3>鑄鋁門</h3>
            <span class="category-subtitle">Cast Aluminum Doors</span>
          </div>
          
          <div class="carousel-container">
            <button class="carousel-btn prev" @click="prevGeneral" :disabled="generalIndex === 0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div class="carousel-wrapper">
              <div
                class="carousel-track"
                :style="{ transform: `translateX(-${generalIndex * slideWidth}%)` }"
              >
                <div
                  v-for="product in generalProducts"
                  :key="product.id"
                  class="product-card"
                >
                  <div class="product-image-wrapper">
                    <img
                      :src="getImageUrl(product.imageName)"
                      :alt="product.name"
                      class="product-image"
                    />
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.name }}</h4>
                    <p class="product-desc" v-if="product.shortDesc">{{ product.shortDesc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button class="carousel-btn next" @click="nextGeneral" :disabled="generalIndex >= maxGeneralIndex">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- 外玄關門 -->
        <div class="category-block">
          <div class="category-title">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3>外玄關門</h3>
            <span class="category-subtitle">Exterior Entrance Doors</span>
          </div>
          
          <div class="carousel-container">
            <button class="carousel-btn prev" @click="prevPressed" :disabled="pressedIndex === 0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div class="carousel-wrapper">
              <div
                class="carousel-track"
                :style="{ transform: `translateX(-${pressedIndex * slideWidth}%)` }"
              >
                <div
                  v-for="product in pressedProducts"
                  :key="product.id"
                  class="product-card"
                >
                  <div class="product-image-wrapper">
                    <img
                      :src="getImageUrl(product.imageName)"
                      :alt="product.name"
                      class="product-image"
                    />
                    <div class="product-overlay">
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.name }}</h4>
                    <p class="product-desc" v-if="product.shortDesc">{{ product.shortDesc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button class="carousel-btn next" @click="nextPressed" :disabled="pressedIndex >= maxPressedIndex">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- 內玄關門 -->
        <div class="category-block">
          <div class="category-title">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </div>
            <h3>內玄關門</h3>
            <span class="category-subtitle">Interior Entrance Doors</span>
          </div>
          
          <div class="carousel-container">
            <button class="carousel-btn prev" @click="prevAluminum" :disabled="aluminumIndex === 0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div class="carousel-wrapper">
              <div
                class="carousel-track"
                :style="{ transform: `translateX(-${aluminumIndex * slideWidth}%)` }"
              >
                <div
                  v-for="product in aluminumProducts"
                  :key="product.id"
                  class="product-card"
                >
                  <div class="product-image-wrapper">
                    <img
                      :src="getImageUrl(product.imageName)"
                      :alt="product.name"
                      class="product-image"
                    />
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.name }}</h4>
                    <p class="product-desc" v-if="product.shortDesc">{{ product.shortDesc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button class="carousel-btn next" @click="nextAluminum" :disabled="aluminumIndex >= maxAluminumIndex">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 顏色選項區塊 -->
    <section class="colors-section">
      <div class="section-background alt">
        <div class="bg-pattern"></div>
      </div>
      <div class="section-content container">
        <div class="section-header">
          <span class="section-label">COLOR PALETTE</span>
          <h2>顏色選項</h2>
          <p class="section-subtitle">多樣色彩，打造專屬風格</p>
        </div>

        <div class="colors-grid">
          <div
            v-for="color in colors"
            :key="color.id"
            class="color-card"
          >
            <div class="color-image-wrapper">
              <img
                :src="getImageUrl(color.imageName)"
                :alt="color.name"
                class="color-image"
              />
              <div class="color-badge">{{ color.name }}</div>
            </div>
            <p class="color-desc">{{ color.shortDesc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ---------- 木門產品滑動 ---------- */
const generalIndex = ref(0)
const pressedIndex = ref(0)
const aluminumIndex = ref(0)
const itemsPerView = ref(8)

/* 鑄鋁門 */
const generalProducts = ref([
  { id: 1, name: '實木門系列', shortDesc: '', imageName: '木門1.jpg' },
  { id: 2, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 3, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 4, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 5, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 6, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 7, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 8, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 9, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 10, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 11, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 12, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
])

/* 外玄關門 */
const pressedProducts = ref([
  { id: 1, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 2, name: '壓花款B', shortDesc: '', imageName: '木門4.jpg' },
  { id: 3, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 4, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 5, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 6, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 7, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 8, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 9, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 10, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 11, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
  { id: 12, name: '設計款大門', shortDesc: '', imageName: '木門2.jpg' },
])

/* 內玄關門 */
const aluminumProducts = ref([
  { id: 1, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 2, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 3, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 4, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 5, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 6, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 7, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 8, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 9, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 10, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 11, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
  { id: 12, name: '壓花款A', shortDesc: '', imageName: '木門3.jpg' },
])

const slideWidth = computed(() => 100 / itemsPerView.value)

const maxGeneralIndex = computed(() => Math.max(0, generalProducts.value.length - itemsPerView.value))
const maxPressedIndex = computed(() => Math.max(0, pressedProducts.value.length - itemsPerView.value))
const maxAluminumIndex = computed(() => Math.max(0, aluminumProducts.value.length - itemsPerView.value))

function nextGeneral() { if (generalIndex.value < maxGeneralIndex.value) generalIndex.value++ }
function prevGeneral() { if (generalIndex.value > 0) generalIndex.value-- }
function nextPressed() { if (pressedIndex.value < maxPressedIndex.value) pressedIndex.value++ }
function prevPressed() { if (pressedIndex.value > 0) pressedIndex.value-- }
function nextAluminum() { if (aluminumIndex.value < maxAluminumIndex.value) aluminumIndex.value++ }
function prevAluminum() { if (aluminumIndex.value > 0) aluminumIndex.value-- }

/* ---------- 顏色選項 ---------- */
const colors = ref([
  { id: 1, name: '胡桃木色', shortDesc: '深沉典雅的高級木質色調。', imageName: 'color1.jpg' },
  { id: 2, name: '楓木色', shortDesc: '溫潤自然,適合各式風格。', imageName: 'color2.jpg' },
  { id: 3, name: '白橡色', shortDesc: '明亮輕盈,呈現北歐氛圍。', imageName: 'color3.jpg' },
  { id: 4, name: '黑胡桃色', shortDesc: '穩重高雅,彰顯個人品味。', imageName: 'color4.jpg' },
  { id: 5, name: '櫻桃木色', shortDesc: '溫暖細膩,散發優雅氣息。', imageName: 'color1.jpg' },
  { id: 6, name: '柚木色', shortDesc: '經典耐看,展現自然質感。', imageName: 'color2.jpg' },
  { id: 7, name: '橡木色', shortDesc: '清新明亮,帶來舒適感受。', imageName: 'color3.jpg' },
  { id: 8, name: '紅木色', shortDesc: '奢華大氣,彰顯尊貴品味。', imageName: 'color4.jpg' },
])

/* ---------- 公用 ---------- */
function updateItemsPerView() {
  if (window.innerWidth < 768) {
    itemsPerView.value = 4
  } else {
    itemsPerView.value = 8
  }

  if (generalIndex.value > maxGeneralIndex.value) generalIndex.value = maxGeneralIndex.value
  if (pressedIndex.value > maxPressedIndex.value) pressedIndex.value = maxPressedIndex.value
  if (aluminumIndex.value > maxAluminumIndex.value) aluminumIndex.value = maxAluminumIndex.value
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft') prevGeneral()
  if (e.key === 'ArrowRight') nextGeneral()
}

onMounted(() => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView)
  window.removeEventListener('keydown', handleKeydown)
})

function scrollToFooter() {
  const footer = document.getElementById('product')
  if (footer) footer.scrollIntoView({ behavior: 'smooth' })
}

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<style scoped>
/* === 全域設定 === */
.product-page {
  font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
  color: #3c2f25;
  line-height: 1.6;
  background: #fafaf8;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* === Hero Banner === */
.hero-banner {
  position: relative;
  height: 85vh;
  overflow: hidden;
  background: #000;
}

.hero-parallax {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(100%) contrast(150%) saturate(120%);
  animation: slowZoom 20s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(60, 47, 37, 0.7) 0%,
    rgba(180, 138, 96, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  color: #fff;
  z-index: 2;
  animation: fadeInUp 1.2s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  display: block;
  font-size: 0.9rem;
  letter-spacing: 4px;
  font-weight: 300;
  margin-bottom: 1rem;
  color: #f0dbc6;
  opacity: 0.9;
}

.hero-title {
  font-size: 5rem;
  letter-spacing: 8px;
  font-weight: 700;
  margin: 0 0 1.5rem;
  background: linear-gradient(135deg, #fff, #f0dbc6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  font-weight: 300;
  letter-spacing: 2px;
}

.hero-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, #fafaf8, transparent);
  pointer-events: none;
}

/* === 按鈕 === */
.btn-contact {
  background: linear-gradient(135deg, #b48a60, #a47a53);
  color: #fff;
  padding: 16px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(180, 138, 96, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 1px;
}

.btn-contact:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(180, 138, 96, 0.5);
  background: linear-gradient(135deg, #a47a53, #8f6a47);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-contact:hover .btn-arrow {
  transform: translateX(5px);
}

/* === 區塊設定 === */
.products-section,
.colors-section {
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
}

.section-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #fafaf8 0%, #f5f1eb 100%);
  z-index: 0;
}

.section-background.alt {
  background: linear-gradient(180deg, #ffffff 0%, #fafaf8 100%);
}

.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: 
    repeating-linear-gradient(45deg, #b48a60 0, #b48a60 1px, transparent 0, transparent 50%),
    repeating-linear-gradient(-45deg, #b48a60 0, #b48a60 1px, transparent 0, transparent 50%);
  background-size: 30px 30px;
}

.section-content {
  position: relative;
  z-index: 1;
}

/* === 區塊標題 === */
.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-label {
  display: inline-block;
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: #b48a60;
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 8px 20px;
  border: 1px solid #b48a60;
  border-radius: 30px;
}

.section-header h2 {
  font-size: 3rem;
  margin: 1.5rem 0 1rem;
  color: #3c2f25;
  font-weight: 700;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #b48a60, transparent);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7a6656;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 2rem;
}

/* === 分類區塊 === */
.category-block {
  margin-bottom: 6rem;
}

.category-block:last-of-type {
  margin-bottom: 0;
}

.category-title {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #b48a60, #a47a53);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(180, 138, 96, 0.3);
}

.category-icon svg {
  width: 24px;
  height: 24px;
}

.category-title h3 {
  font-size: 2rem;
  color: #3c2f25;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
}

.category-subtitle {
  font-size: 0.9rem;
  color: #b48a60;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* === Carousel === */
.carousel-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  max-width: 1600px;
}

.carousel-wrapper {
  overflow: hidden;
  flex: 1;
  border-radius: 20px;
}

.carousel-track {
  display: flex;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* === 商品卡片 === */
.product-card {
  flex: 0 0 12.5%;
  padding: 0 12px;
  box-sizing: border-box;
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  aspect-ratio: 3/4;
  background: #f5f1eb;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image-wrapper {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(60, 47, 37, 0.9), transparent 60%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.view-more {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 20px;
  border: 2px solid #fff;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.view-more:hover {
  background: #fff;
  color: #3c2f25;
}

.product-info {
  padding: 1.5rem 0.5rem 0;
  text-align: center;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #3c2f25;
  margin: 0 0 0.5rem;
  letter-spacing: 0.5px;
}

.product-desc {
  color: #7a6656;
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 400;
}

/* === 箭頭按鈕 === */
.carousel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px solid #e5d9c8;
  color: #b48a60;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.carousel-btn svg {
  width: 24px;
  height: 24px;
}

.carousel-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #b48a60, #a47a53);
  border-color: #b48a60;
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(180, 138, 96, 0.3);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* === 顏色網格 === */
.colors-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.color-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.color-card:hover {
  transform: translateY(-8px);
}

.color-image-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.color-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.color-card:hover .color-image {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.color-badge {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #b48a60, #a47a53);
  color: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(180, 138, 96, 0.3);
  white-space: nowrap;
}

.color-desc {
  font-size: 0.9rem;
  color: #7a6656;
  line-height: 1.5;
  font-weight: 400;
  margin-top: 0.5rem;
}

/* === RWD === */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
    letter-spacing: 4px;
  }

  .hero-description {
    font-size: 1rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .products-section,
  .colors-section {
    padding: 5rem 0;
  }

  .category-block {
    margin-bottom: 4rem;
  }

  .category-title h3 {
    font-size: 1.5rem;
  }

  .category-icon {
    width: 40px;
    height: 40px;
  }

  .category-icon svg {
    width: 20px;
    height: 20px;
  }

  .carousel-btn {
    width: 44px;
    height: 44px;
  }

  .carousel-btn svg {
    width: 20px;
    height: 20px;
  }

  .product-card {
    flex: 0 0 25%;
  }

  .colors-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-desc {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    height: 70vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .carousel-container {
    gap: 1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .category-title {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>