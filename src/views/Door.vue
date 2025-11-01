<template>
  <div class="product-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <img src="../assets/images/木門1.jpg" alt="木門主題" class="hero-image" />
      <div class="hero-overlay">
        <h1>木門</h1>
        <p>探索我們的優質產品系列</p>
        <button class="btn-contact" @click="scrollToFooter">立即了解更多</button>
      </div>
    </section>

    <!-- 木門選品 -->
    <section class="products-section ">
      <div class="section-background"></div>
      <div id="product" class="section-content">
        <h2>木門選品</h2>

        <div class="carousel-container">
          <button class="carousel-btn prev" @click="prevSlide">←</button>

          <div class="carousel-wrapper">
            <div
              class="carousel-track"
              :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
            >
              <div
                v-for="product in products"
                :key="product.id"
                class="product-card"
              >
                <img
                  :src="getImageUrl(product.imageName)"
                  :alt="product.name"
                  class="product-image"
                />
                <p class="product-desc">{{ product.shortDesc }}</p>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextSlide">→</button>
        </div>

        <!-- 指示點 -->
        <div v-if="showIndicators" class="carousel-indicators">
          <button
            v-for="(dot, index) in totalSlides"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </section>

    <!-- 👇 新增：顏色選項區塊 -->
    <section class="colors-section">
      <div class="section-background"></div>
      <div class="section-content">
        <h2>顏色選項</h2>

        <div class="carousel-container">
          <button class="carousel-btn prev" @click="prevColor">←</button>

          <div class="carousel-wrapper">
            <div
              class="carousel-track"
              :style="{ transform: `translateX(-${colorIndex * slideWidth}%)` }"
            >
              <div
                v-for="color in colors"
                :key="color.id"
                class="product-card"
              >
                <img
                  :src="getImageUrl(color.imageName)"
                  :alt="color.name"
                  class="product-image"
                />
                <p class="product-desc">{{ color.shortDesc }}</p>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextColor">→</button>
        </div>

        <div v-if="showIndicators" class="carousel-indicators">
          <button
            v-for="(dot, index) in totalColorSlides"
            :key="index"
            :class="{ active: index === colorIndex }"
            @click="goToColor(index)"
          ></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ---------- 木門產品滑動 ---------- */
const currentIndex = ref(0)
const itemsPerView = ref(3)
const products = ref([
  { id: 1, name: '實木門系列', shortDesc: '質感溫潤，展現自然木紋之美。', imageName: '木門1.jpg' },
  { id: 2, name: '設計款大門', shortDesc: '兼具安全與美感的完美選擇。', imageName: '木門1.jpg' },
  { id: 3, name: '木門貼膜', shortDesc: '輕鬆更新家中風格，細膩耐用。', imageName: '木門1.jpg' },
  { id: 4, name: '設計工法展示', shortDesc: '精準工藝與美學的融合。', imageName: '木門1.jpg' },
  { id: 5, name: '高端木作工法', shortDesc: '專業施工品質，耐用兼具美觀。', imageName: '木門1.jpg' },
])
const slideWidth = computed(() => 100 / itemsPerView.value)
const maxIndex = computed(() => Math.max(0, products.value.length - itemsPerView.value))
const totalSlides = computed(() => maxIndex.value + 1)

function nextSlide() {
  if (currentIndex.value < maxIndex.value) currentIndex.value++
}
function prevSlide() {
  if (currentIndex.value > 0) currentIndex.value--
}
function goToSlide(index) {
  currentIndex.value = index
}

/* ---------- 顏色選項滑動 ---------- */
const colorIndex = ref(0)
const colors = ref([
  { id: 1, name: '胡桃木色', shortDesc: '深沉典雅的高級木質色調。', imageName: 'color1.jpg' },
  { id: 2, name: '楓木色', shortDesc: '溫潤自然，適合各式風格。', imageName: 'color2.jpg' },
  { id: 3, name: '白橡色', shortDesc: '明亮輕盈，呈現北歐氛圍。', imageName: 'color3.jpg' },
  { id: 4, name: '黑胡桃色', shortDesc: '穩重高雅，彰顯個人品味。', imageName: 'color4.jpg' },
])
const maxColorIndex = computed(() => Math.max(0, colors.value.length - itemsPerView.value))
const totalColorSlides = computed(() => maxColorIndex.value + 1)

function nextColor() {
  if (colorIndex.value < maxColorIndex.value) colorIndex.value++
}
function prevColor() {
  if (colorIndex.value > 0) colorIndex.value--
}
function goToColor(index) {
  colorIndex.value = index
}

/* ---------- 公用 ---------- */
function updateItemsPerView() {
  if (window.innerWidth < 640) itemsPerView.value = 1
  else if (window.innerWidth < 1024) itemsPerView.value = 2
  else itemsPerView.value = 3

  if (currentIndex.value > maxIndex.value)
    currentIndex.value = maxIndex.value
  if (colorIndex.value > maxColorIndex.value)
    colorIndex.value = maxColorIndex.value
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
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
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
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
  background-color: #faf8f6;
  line-height: 1.6;
}

/* === Hero Banner === */
.hero-banner {
  position: relative;
  height: 70vh;
  overflow: hidden;
}
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(85%) saturate(90%);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.45),
    rgba(0, 0, 0, 0.3)
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
}
.hero-overlay h1 {
  font-size: 3rem;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 1rem;
}
.hero-overlay p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}
.btn-contact {
  background: #b48a60;
  color: #fff !important;
  padding: 12px 26px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}
.btn-contact:hover {
  background: #a47a53;
  transform: translateY(-2px);
}

/* === 共用區塊 === */
.products-section,
.colors-section {
  position: relative;
  padding: 6rem 1rem;
  overflow: hidden;
}
.section-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, #f5efe9 0%, #fff 70%);
  z-index: 0;
  opacity: 0.7;
}
.colors-section .section-background {
  background: radial-gradient(circle at top right, #f3f0ed 0%, #fff 70%);
  opacity: 0.8;
}
.section-content {
  position: relative;
  z-index: 1;
  text-align: center;
}
.section-content h2 {
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: #4b3829;
  font-weight: 600;
  position: relative;
}
.section-content h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: #b48a60;
  margin: 0.8rem auto 0;
  border-radius: 2px;
}

/* === Carousel === */
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.carousel-wrapper {
  overflow: hidden;
  width: 80%;
  max-width: 1200px;
}
.carousel-track {
  display: flex;
  transition: transform 0.6s ease;
}

/* === 商品卡片 === */
.product-card {
  flex: 0 0 calc(33.333% - 16px);
  border-radius: 16px;
  background: #fff;
  padding: 1rem 0.5rem;
  margin: 0 8px;
  transition: all 0.4s ease;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
.product-image {
  width: 90%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
}
.product-desc {
  color: #5c4a3a;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
}

/* === 圓形箭頭按鈕 === */
.carousel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffffcc;
  border: 2px solid #b48a60;
  color: #b48a60;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin: 0 1rem;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}
.carousel-btn:hover {
  background: #b48a60;
  color: #fff;
  transform: scale(1.05);
}

/* === 指示點 === */
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d8c9b6;
  border: none;
  margin: 0 5px;
  transition: all 0.3s ease;
}
.carousel-indicators button.active {
  width: 28px;
  border-radius: 6px;
  background: #b48a60;
}

/* === RWD === */
@media (max-width: 1024px) {
  .product-card {
    flex: 0 0 calc(50% - 16px);
  }
}
@media (max-width: 640px) {
  .product-card {
    flex: 0 0 100%;
  }
  .product-image {
    height: 150px;
  }
}
/* === 顏色區塊背景微調：更深一點 === */
.colors-section .section-background {
  background: radial-gradient(circle at top right, #ece5dd 0%, #f9f6f3 70%);
  opacity: 0.85; /* 加深整體顏色 */
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

/* === 區塊統一背景：優雅乾淨 + 木紋 + 光線 === */
.products-section .section-background,
.colors-section .section-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: 
    url('../assets/images/wood-texture.png') center/cover no-repeat, /* 淡木紋 */
    radial-gradient(circle at top left, #f5efe9 0%, #faf8f6 70%); /* 優雅漸層 */
  opacity: 0.85;
  overflow: hidden;
}

/* 動態光線疊加 */
.products-section .section-background::before,
.colors-section .section-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0.12) 100%
  );
  pointer-events: none;
  z-index: 1;
  animation: shimmer 12s linear infinite;
}

/* 光線動畫 */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 文字及內容保持在上層 */
.section-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* 顏色區塊微加深色調 */
.colors-section .section-background {
  background: 
    url('../assets/images/wood-texture.png') center/cover no-repeat,
    radial-gradient(circle at top right, #ece5dd 0%, #f9f6f3 70%);
  opacity: 0.9;
}
</style>
