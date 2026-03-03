<template>
  <div class="product-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-parallax">
        <img src="../assets/images/木門1.jpg" alt="木門主題" class="hero-image" />
      </div>
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="hero-subtitle">CRAFTED WITH PASSION</span>
          <h1 class="hero-title">木門</h1>
          <p class="hero-description">簡約線條與溫潤木質，打造恰到好處的生活氛圍。<br></br>每一扇木門，都是居家風格的延伸——讓空間更靜謐，也更有溫度。</p>
          <button class="btn-contact" @click="scrollToFooter">
            <span>立即了解更多</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
      <div class="hero-decoration"></div>
    </section>

    <!-- 第一個木門選品 -->
    <section class="products-section">
      <div class="section-background">
        <div class="bg-pattern"></div>
      </div>
      <div id="product" class="section-content container">
        <div class="section-header">
          <span class="section-label">COLLECTIONS</span>
          <h2>木門選品</h2>
          <p class="section-subtitle">精選系列，品味生活美學</p>
        </div>

        <div class="carousel-container">
          <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

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
                <div class="product-image-wrapper">
                  <img
                    :src="getWoodImageUrl(product.imageName)"
                    :alt="product.name"
                    class="product-image"
                  />
                  
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-desc">{{ product.shortDesc }}</p>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex >= maxIndex">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 第二個木門選品 -->
    <section class="products-section">
      <div class="section-background">
        <div class="bg-pattern"></div>
      </div>
      <div class="section-content container">
        <div class="section-header">
          <span class="section-label">WOOD STYLE</span>
          <h2>主題色彩</h2>
          <p class="section-subtitle">主題色彩，滿足您的需求</p>
        </div>

        <div class="carousel-container">
          <button class="carousel-btn prev" @click="prevSlide2" :disabled="currentIndex2 === 0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="carousel-wrapper">
            <div
              class="carousel-track"
              :style="{ transform: `translateX(-${currentIndex2 * slideWidth}%)` }"
            >
              <div
                v-for="product in products2"
                :key="product.id"
                class="product-card"
              >
                <div class="product-image-wrapper">
                  <img
                    :src="getWoodImageUrl(product.imageName)"
                    :alt="product.name"
                    class="product-image"
                  />
                  
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-desc">{{ product.shortDesc }}</p>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextSlide2" :disabled="currentIndex2 >= maxIndex2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
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
      <h2>顏色選樣</h2>
      <p class="section-subtitle">多樣色彩，打造專屬風格</p>
    </div>

    <!-- 🔹 下拉主題區塊 -->
    <div
      v-for="(theme, index) in colorThemes"
      :key="theme.id"
      class="color-theme-block"
    >
      <div
        class="theme-header"
        @click="toggleTheme(index)"
      >
        <h3 class="theme-title">{{ theme.title }}</h3>
        <span class="toggle-icon">{{ activeTheme === index ? '▲' : '▼' }}</span>
      </div>

      <!-- ✅ 顏色內容：只有打開的主題才顯示 -->
      <transition name="fade">
        <div
          v-if="activeTheme === index"
          class="colors-grid"
        >
          <div
            v-for="color in theme.colors"
            :key="color.id"
            class="color-card"
          >
            <img
              :src="getWoodImageUrl(color.imageName)"
              :alt="color.name"
              class="color-image"
            />
            <div class="color-overlay">
              <p class="color-name">{{ color.name }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ---------- 第一個木門產品滑動 ---------- */
const currentIndex = ref(0)
const itemsPerView = ref(8)
const products = ref([
  { id: 1, name: '拱門系列', shortDesc: '', imageName: '拱門.jpg' },
  { id: 2, name: '流線系列', shortDesc: '', imageName: '流線.jpg' },
  { id: 3, name: '5小格', shortDesc: '', imageName: '5小格.jpg' },
  { id: 4, name: '多線條', shortDesc: '', imageName: '多線條.jpg' },
  { id: 5, name: '雙框線', shortDesc: '', imageName: '雙框線.jpg' },
  { id: 6, name: '圓拱', shortDesc: '', imageName: '圓拱.jpg' }
])
const slideWidth = computed(() => 100 / itemsPerView.value)
const maxIndex = computed(() => Math.max(0, products.value.length - itemsPerView.value))

function nextSlide() {
  if (currentIndex.value < maxIndex.value) currentIndex.value++
}
function prevSlide() {
  if (currentIndex.value > 0) currentIndex.value--
}

/* ---------- 第二個木門產品滑動 ---------- */
const currentIndex2 = ref(0)
const products2 = ref([
  { id: 11, name: '現代簡約門', shortDesc: '', imageName: '暖栗深木.jpg' },
  { id: 12, name: '歐式古典門', shortDesc: '', imageName: '木棕秋影.jpg' },
  { id: 13, name: '薄霧胡香棕', shortDesc: '', imageName: '薄霧胡香棕.jpg' },
  { id: 14, name: '霧岸淺橡', shortDesc: '', imageName: '霧岸淺橡.jpg' },
  { id: 15, name: '霧雪純白', shortDesc: '', imageName: '霧雪純白.jpg' }
])
const maxIndex2 = computed(() => Math.max(0, products2.value.length - itemsPerView.value))

function nextSlide2() {
  if (currentIndex2.value < maxIndex2.value) currentIndex2.value++
}
function prevSlide2() {
  if (currentIndex2.value > 0) currentIndex2.value--
}

/* ---------- 顏色選項 ---------- */
const colorThemes = ref([
  { id: 1, title: "自然原木系列", colors: [
          { id: 1, name: "", imageName: "木頭1.jpg" },
          { id: 2, name: "", imageName: "木頭2.jpg" },
          { id: 3, name: "", imageName: "木頭3.jpg" },
          { id: 4, name: "", imageName: "木頭4.jpg" },
          { id: 5, name: "", imageName: "木頭5.jpg" },
          { id: 6, name: "", imageName: "木頭6.jpg" },
          { id: 7, name: "", imageName: "木頭7.jpg" },
          { id: 8, name: "", imageName: "木頭8.jpg" },
          { id: 9, name: "", imageName: "木頭9.jpg" },
          { id: 10, name: "", imageName: "木頭10.jpg" },
          { id: 11, name: "", imageName: "木頭11.jpg" },
          { id: 12, name: "", imageName: "木頭12.jpg" },
          { id: 13, name: "", imageName: "木頭13.jpg" },
          { id: 14, name: "", imageName: "木頭14.jpg" },
          { id: 15, name: "", imageName: "木頭15.jpg" },
          { id: 16, name: "", imageName: "木頭16.jpg" },
          { id: 17, name: "", imageName: "木頭17.jpg" },
          { id: 18, name: "", imageName: "木頭18.jpg" },
          { id: 19, name: "", imageName: "木頭19.jpg" },
          { id: 20, name: "", imageName: "木頭20.jpg" },
          { id: 21, name: "", imageName: "木頭21.jpg" },
          { id: 22, name: "", imageName: "木頭22.jpg" },
          { id: 23, name: "", imageName: "木頭23.jpg" },
          { id: 24, name: "", imageName: "木頭24.jpg" },
          { id: 25, name: "", imageName: "木頭25.jpg" },
          { id: 26, name: "", imageName: "木頭26.jpg" },
          { id: 27, name: "", imageName: "木頭27.jpg" },
          { id: 28, name: "", imageName: "木頭28.jpg" },
          { id: 29, name: "", imageName: "木頭29.jpg" },
          { id: 30, name: "", imageName: "木頭30.jpg" },
          { id: 31, name: "", imageName: "木頭31.jpg" },
          { id: 32, name: "", imageName: "木頭32.jpg" },
          { id: 33, name: "", imageName: "木頭33.jpg" },
          { id: 34, name: "", imageName: "木頭34.jpg" },
          { id: 35, name: "", imageName: "木頭35.jpg" },
          { id: 36, name: "", imageName: "木頭36.jpg" },
          { id: 37, name: "", imageName: "木頭37.jpg" },
          { id: 38, name: "", imageName: "木頭38.jpg" },
          { id: 39, name: "", imageName: "木頭39.jpg" },
          { id: 40, name: "", imageName: "木頭40.jpg" },
          { id: 41, name: "", imageName: "木頭41.jpg" },
          { id: 42, name: "", imageName: "木頭42.jpg" },
          { id: 43, name: "", imageName: "木頭43.jpg" },
          { id: 44, name: "", imageName: "木頭44.jpg" },
          { id: 45, name: "", imageName: "木頭45.jpg" },
          { id: 46, name: "", imageName: "木頭46.jpg" },
          { id: 47, name: "", imageName: "木頭47.jpg" },
          { id: 48, name: "", imageName: "木頭48.jpg" },
          { id: 49, name: "", imageName: "木頭49.jpg" },
          { id: 50, name: "", imageName: "木頭50.jpg" },
          { id: 51, name: "", imageName: "木頭51.jpg" },
          { id: 52, name: "", imageName: "木頭52.jpg" },
          { id: 53, name: "", imageName: "木頭53.jpg" },
          { id: 54, name: "", imageName: "木頭54.jpg" },
          { id: 55, name: "", imageName: "木頭55.jpg" },
          { id: 56, name: "", imageName: "木頭56.jpg" },
          { id: 57, name: "", imageName: "木頭57.jpg" },
          { id: 58, name: "", imageName: "木頭58.jpg" },
          { id: 59, name: "", imageName: "木頭59.jpg" },
          { id: 60, name: "", imageName: "木頭60.jpg" },
          { id: 61, name: "", imageName: "木頭61.jpg" },
          { id: 62, name: "", imageName: "木頭62.jpg" },
          { id: 63, name: "", imageName: "木頭63.jpg" },
          { id: 64, name: "", imageName: "木頭64.jpg" },
          { id: 65, name: "", imageName: "木頭65.jpg" },
          { id: 66, name: "", imageName: "木頭66.jpg" },
          { id: 67, name: "", imageName: "木頭67.jpg" },
          { id: 68, name: "", imageName: "木頭68.jpg" },
          { id: 69, name: "", imageName: "木頭69.jpg" },
          { id: 70, name: "", imageName: "木頭70.jpg" },
          { id: 71, name: "", imageName: "木頭71.jpg" },
          { id: 72, name: "", imageName: "木頭72.jpg" },
          { id: 73, name: "", imageName: "木頭73.jpg" },
          { id: 74, name: "", imageName: "木頭74.jpg" },
          { id: 75, name: "", imageName: "木頭75.jpg" },
          { id: 76, name: "", imageName: "木頭76.jpg" },
          { id: 77, name: "", imageName: "木頭77.jpg" },
          { id: 78, name: "", imageName: "木頭78.jpg" },
          { id: 79, name: "", imageName: "木頭79.jpg" },
          { id: 80, name: "", imageName: "木頭80.jpg" },
          { id: 81, name: "", imageName: "木頭81.jpg" },
          { id: 82, name: "", imageName: "木頭82.jpg" },
          { id: 83, name: "", imageName: "木頭83.jpg" },
          { id: 84, name: "", imageName: "木頭84.jpg" },
          { id: 85, name: "", imageName: "木頭85.jpg" },
          { id: 86, name: "", imageName: "木頭86.jpg" },
          { id: 87, name: "", imageName: "木頭87.jpg" },
          { id: 88, name: "", imageName: "木頭88.jpg" },
          { id: 89, name: "", imageName: "木頭89.jpg" },
          { id: 90, name: "", imageName: "木頭90.jpg" },
          { id: 91, name: "", imageName: "木頭91.jpg" },
          { id: 92, name: "", imageName: "木頭92.jpg" },
          { id: 93, name: "", imageName: "木頭93.jpg" },
          { id: 94, name: "", imageName: "木頭94.jpg" },
          { id: 95, name: "", imageName: "木頭95.jpg" },
          { id: 96, name: "", imageName: "木頭96.jpg" },
          { id: 97, name: "", imageName: "木頭97.jpg" },
          { id: 98, name: "", imageName: "木頭98.jpg" },
          { id: 99, name: "", imageName: "木頭99.jpg" },
          { id: 100, name: "", imageName: "木頭100.jpg" },
          { id: 101, name: "", imageName: "木頭101.jpg" },
          { id: 102, name: "", imageName: "木頭102.jpg" },
          { id: 103, name: "", imageName: "木頭103.jpg" },
          { id: 104, name: "", imageName: "木頭104.jpg" },
          { id: 105, name: "", imageName: "木頭105.jpg" },
          { id: 106, name: "", imageName: "木頭106.jpg" },
          { id: 107, name: "", imageName: "木頭107.jpg" },
          { id: 108, name: "", imageName: "木頭108.jpg" },
          { id: 109, name: "", imageName: "木頭109.jpg" },
          { id: 110, name: "", imageName: "木頭110.jpg" },
          { id: 111, name: "", imageName: "木頭111.jpg" },
          { id: 112, name: "", imageName: "木頭112.jpg" },
          { id: 113, name: "", imageName: "木頭113.jpg" },
          { id: 114, name: "", imageName: "木頭114.jpg" },
          { id: 115, name: "", imageName: "木頭115.jpg" },
          { id: 116, name: "", imageName: "木頭116.jpg" },
          { id: 117, name: "", imageName: "木頭117.jpg" },
          { id: 118, name: "", imageName: "木頭118.jpg" },
          { id: 119, name: "", imageName: "木頭119.jpg" },
          { id: 120, name: "", imageName: "木頭120.jpg" },
          { id: 121, name: "", imageName: "木頭121.jpg" }
        ]},
        { id: 2, title: "北歐木系列", colors: [
          { id: 1, name: "", imageName: "北歐木頭1.jpg" },
          { id: 2, name: "", imageName: "北歐木頭2.jpg" },
          { id: 3, name: "", imageName: "北歐木頭3.jpg" },
          { id: 4, name: "", imageName: "北歐木頭4.jpg" },
          { id: 5, name: "", imageName: "北歐木頭5.jpg" },
          { id: 6, name: "", imageName: "北歐木頭6.jpg" },
          { id: 7, name: "", imageName: "北歐木頭7.jpg" },
          { id: 8, name: "", imageName: "北歐木頭8.jpg" },
          { id: 9, name: "", imageName: "北歐木頭9.jpg" },
          { id: 10, name: "", imageName: "北歐木頭10.jpg" },
          { id: 11, name: "", imageName: "北歐木頭11.jpg" },
          { id: 12, name: "", imageName: "北歐木頭12.jpg" },
          { id: 13, name: "", imageName: "北歐木頭13.jpg" },
          { id: 14, name: "", imageName: "北歐木頭14.jpg" },
          { id: 15, name: "", imageName: "北歐木頭15.jpg" },
          { id: 16, name: "", imageName: "北歐木頭16.jpg" },
          { id: 17, name: "", imageName: "北歐木頭17.jpg" },
          { id: 18, name: "", imageName: "北歐木頭18.jpg" },
          { id: 19, name: "", imageName: "北歐木頭19.jpg" },
          { id: 20, name: "", imageName: "北歐木頭20.jpg" },
          { id: 21, name: "", imageName: "北歐木頭21.jpg" },
          { id: 22, name: "", imageName: "北歐木頭22.jpg" },
          { id: 23, name: "", imageName: "北歐木頭23.jpg" },
          { id: 24, name: "", imageName: "北歐木頭24.jpg" },
          { id: 25, name: "", imageName: "北歐木頭25.jpg" },
          { id: 26, name: "", imageName: "北歐木頭26.jpg" },
          { id: 27, name: "", imageName: "北歐木頭27.jpg" },
          { id: 28, name: "", imageName: "北歐木頭28.jpg" },
        ]},
        { id: 3, title: "軟木塞系列", colors: [
          { id: 1, name: "", imageName: "甘蔗板1.jpg" },
          { id: 2, name: "", imageName: "甘蔗板2.jpg" }
        ]},
        { id: 4, title: "石頭紋路系列", colors: [
          { id: 1, name: "", imageName: "石頭紋路1.jpg" },
          { id: 2, name: "", imageName: "石頭紋路2.jpg" },
          { id: 3, name: "", imageName: "石頭紋路3.jpg" },
          { id: 4, name: "", imageName: "石頭紋路4.jpg" },
          { id: 5, name: "", imageName: "石頭紋路5.jpg" },
          { id: 6, name: "", imageName: "石頭紋路6.jpg" },
          { id: 7, name: "", imageName: "石頭紋路7.jpg" },
          { id: 8, name: "", imageName: "石頭紋路8.jpg" },
          { id: 9, name: "", imageName: "石頭紋路9.jpg" },
          { id: 10, name: "", imageName: "石頭紋路10.jpg" },
          { id: 11, name: "", imageName: "石頭紋路11.jpg" },
          { id: 12, name: "", imageName: "石頭紋路12.jpg" },
          { id: 13, name: "", imageName: "石頭紋路13.jpg" },
          { id: 14, name: "", imageName: "石頭紋路14.jpg" },
          { id: 15, name: "", imageName: "石頭紋路15.jpg" },
          { id: 16, name: "", imageName: "石頭紋路16.jpg" },
          { id: 17, name: "", imageName: "石頭紋路17.jpg" },
          { id: 18, name: "", imageName: "石頭紋路18.jpg" },
          { id: 19, name: "", imageName: "石頭紋路19.jpg" },
          { id: 20, name: "", imageName: "石頭紋路20.jpg" },
          { id: 21, name: "", imageName: "石頭紋路21.jpg" },
          { id: 22, name: "", imageName: "石頭紋路22.jpg" },
          { id: 23, name: "", imageName: "石頭紋路23.jpg" },
          { id: 24, name: "", imageName: "石頭紋路24.jpg" },
          { id: 25, name: "", imageName: "石頭紋路25.jpg" },
          { id: 26, name: "", imageName: "石頭紋路26.jpg" },
          { id: 27, name: "", imageName: "石頭紋路27.jpg" },
          { id: 28, name: "", imageName: "石頭紋路28.jpg" },
          { id: 29, name: "", imageName: "石頭紋路29.jpg" },
          { id: 30, name: "", imageName: "石頭紋路30.jpg" },
          { id: 31, name: "", imageName: "石頭紋路31.jpg" },
          { id: 32, name: "", imageName: "石頭紋路32.jpg" },
          { id: 33, name: "", imageName: "石頭紋路33.jpg" },
          { id: 34, name: "", imageName: "石頭紋路34.jpg" },
          { id: 35, name: "", imageName: "石頭紋路35.jpg" },
          { id: 36, name: "", imageName: "石頭紋路36.jpg" },
          { id: 37, name: "", imageName: "石頭紋路37.jpg" },
          { id: 38, name: "", imageName: "石頭紋路38.jpg" },
          { id: 39, name: "", imageName: "石頭紋路39.jpg" },
          { id: 40, name: "", imageName: "石頭紋路40.jpg" },
        ]},
        { id: 5, title: "金箔系列", colors: [
          { id: 1, name: "", imageName: "金箔1.jpg" },
          { id: 2, name: "", imageName: "金箔2.jpg" }
        ]},
        { id: 6, title: "金屬系列", colors: [
          { id: 1, name: "", imageName: "金屬1.jpg" },
          { id: 2, name: "", imageName: "金屬2.jpg" },
          { id: 3, name: "", imageName: "金屬3.jpg" },
          { id: 4, name: "", imageName: "金屬4.jpg" },
          { id: 5, name: "", imageName: "金屬5.jpg" },
          { id: 6, name: "", imageName: "金屬6.jpg" },
          { id: 7, name: "", imageName: "金屬7.jpg" },
          { id: 8, name: "", imageName: "金屬8.jpg" },
          { id: 9, name: "", imageName: "金屬9.jpg" },
          { id: 10, name: "", imageName: "金屬10.jpg" },
          { id: 11, name: "", imageName: "金屬11.jpg" },
          { id: 12, name: "", imageName: "金屬12.jpg" },
          { id: 13, name: "", imageName: "金屬13.jpg" },
          { id: 14, name: "", imageName: "金屬14.jpg" },
          { id: 15, name: "", imageName: "金屬15.jpg" },
          { id: 16, name: "", imageName: "金屬16.jpg" },
          { id: 17, name: "", imageName: "金屬17.jpg" },
          { id: 18, name: "", imageName: "金屬18.jpg" },
        ]},
        { id: 7, title: "炫彩，鍍鈦", colors: [
          { id: 1, name: "", imageName: "炫彩，鍍鈦1.jpg" },
          { id: 2, name: "", imageName: "炫彩，鍍鈦2.jpg" },
          { id: 3, name: "", imageName: "炫彩，鍍鈦3.jpg" },
          { id: 4, name: "", imageName: "炫彩，鍍鈦4.jpg" }
        ]},
        { id: 8, title: "烤漆系列", colors: [
          { id: 1, name: "", imageName: "烤漆1.jpg" },
          { id: 2, name: "", imageName: "烤漆2.jpg" },
          { id: 3, name: "", imageName: "烤漆3.jpg" },
          { id: 4, name: "", imageName: "烤漆4.jpg" },
          { id: 5, name: "", imageName: "烤漆5.jpg" },
          { id: 6, name: "", imageName: "烤漆6.jpg" },
          { id: 7, name: "", imageName: "烤漆7.jpg" },
          { id: 8, name: "", imageName: "烤漆8.jpg" },
          { id: 9, name: "", imageName: "烤漆9.jpg" },
          { id: 10, name: "", imageName: "烤漆10.jpg" },
          { id: 11, name: "", imageName: "烤漆11.jpg" },
          { id: 12, name: "", imageName: "烤漆12.jpg" },
          { id: 13, name: "", imageName: "烤漆13.jpg" },
          { id: 14, name: "", imageName: "烤漆14.jpg" }
        ]},
        { id: 9, title: "素色", colors: [
          { id: 1, name: "", imageName: "素色1.jpg" },
          { id: 2, name: "", imageName: "素色2.jpg" },
          { id: 3, name: "", imageName: "素色3.jpg" },
          { id: 4, name: "", imageName: "素色4.jpg" },
          { id: 5, name: "", imageName: "素色5.jpg" },
          { id: 6, name: "", imageName: "素色6.jpg" },
          { id: 7, name: "", imageName: "素色7.jpg" },
          { id: 8, name: "", imageName: "素色8.jpg" },
          { id: 9, name: "", imageName: "素色9.jpg" },
          { id: 10, name: "", imageName: "素色10.jpg" },
          { id: 11, name: "", imageName: "素色11.jpg" },
          { id: 12, name: "", imageName: "素色12.jpg" },
          { id: 13, name: "", imageName: "素色13.jpg" },
          { id: 14, name: "", imageName: "素色14.jpg" },
          { id: 15, name: "", imageName: "素色15.jpg" },
          { id: 16, name: "", imageName: "素色16.jpg" },
          { id: 17, name: "", imageName: "素色17.jpg" },
          { id: 18, name: "", imageName: "素色18.jpg" },
          { id: 19, name: "", imageName: "素色19.jpg" },
          { id: 20, name: "", imageName: "素色20.jpg" },
          { id: 21, name: "", imageName: "素色21.jpg" },
          { id: 22, name: "", imageName: "素色22.jpg" },
          { id: 23, name: "", imageName: "素色23.jpg" },
          { id: 24, name: "", imageName: "素色24.jpg" },
          { id: 25, name: "", imageName: "素色25.jpg" },
          { id: 26, name: "", imageName: "素色26.jpg" },
          { id: 27, name: "", imageName: "素色27.jpg" },
          { id: 28, name: "", imageName: "素色28.jpg" },
          { id: 29, name: "", imageName: "素色29.jpg" },
          { id: 30, name: "", imageName: "素色30.jpg" },
          { id: 31, name: "", imageName: "素色31.jpg" },
          { id: 32, name: "", imageName: "素色32.jpg" },
          { id: 33, name: "", imageName: "素色33.jpg" },
          { id: 34, name: "", imageName: "素色34.jpg" },
          { id: 35, name: "", imageName: "素色35.jpg" },
          { id: 36, name: "", imageName: "素色36.jpg" },
          { id: 37, name: "", imageName: "素色37.jpg" },
          { id: 38, name: "", imageName: "素色38.jpg" },
          { id: 39, name: "", imageName: "素色39.jpg" },
          { id: 40, name: "", imageName: "素色40.jpg" },
          { id: 41, name: "", imageName: "素色41.jpg" },
          { id: 42, name: "", imageName: "素色42.jpg" },
          { id: 43, name: "", imageName: "素色43.jpg" },
          { id: 44, name: "", imageName: "素色44.jpg" },
          { id: 45, name: "", imageName: "素色45.jpg" },
          { id: 46, name: "", imageName: "素色46.jpg" },
          { id: 47, name: "", imageName: "素色47.jpg" },
          { id: 48, name: "", imageName: "素色48.jpg" },
          { id: 49, name: "", imageName: "素色49.jpg" },
          { id: 50, name: "", imageName: "素色50.jpg" },
          { id: 51, name: "", imageName: "素色51.jpg" },
          { id: 52, name: "", imageName: "素色52.jpg" },
          { id: 53, name: "", imageName: "素色53.jpg" },
          { id: 54, name: "", imageName: "素色54.jpg" },
          { id: 55, name: "", imageName: "素色55.jpg" },
          { id: 56, name: "", imageName: "素色56.jpg" },
          { id: 57, name: "", imageName: "素色57.jpg" },
          { id: 58, name: "", imageName: "素色58.jpg" },
          { id: 59, name: "", imageName: "素色59.jpg" },
          { id: 60, name: "", imageName: "素色60.jpg" },
          { id: 61, name: "", imageName: "素色61.jpg" },
          { id: 62, name: "", imageName: "素色62.jpg" },
          { id: 63, name: "", imageName: "素色63.jpg" },
          { id: 64, name: "", imageName: "素色64.jpg" },
          { id: 65, name: "", imageName: "素色65.jpg" },
          { id: 66, name: "", imageName: "素色66.jpg" },
          { id: 67, name: "", imageName: "素色67.jpg" }
        ]},
])

/* ---------- 公用 ---------- */
function updateItemsPerView() {
  if (window.innerWidth < 768) {
    itemsPerView.value = 4
  } else {
    itemsPerView.value = 8
  }

  if (currentIndex.value > maxIndex.value)
    currentIndex.value = maxIndex.value
  if (currentIndex2.value > maxIndex2.value)
    currentIndex2.value = maxIndex2.value
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft') {
    prevSlide()
    prevSlide2()
  }
  if (e.key === 'ArrowRight') {
    nextSlide()
    nextSlide2()
  }
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
  const footer = document.getElementById('contact')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
}

const getWoodImageUrl = (name) => {
  return new URL(`../assets/images/wood/${name}`, import.meta.url).href
}

const activeTheme = ref(null)

function toggleTheme(index) {
  activeTheme.value = activeTheme.value === index ? null : index
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
  filter: brightness(100%) contrast(170%) saturate(130%);
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

/* === Carousel === */
.carousel-container {
   position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center; /* 水平置中整個內容 */
  align-items: center; 
}

.carousel-track {
  display: flex;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

/* === 商品卡片 === */
.product-card {
  flex: 0 0 12.5%;
  padding: 0 12px;
  box-sizing: border-box;
  
}

.product-image-wrapper {
  position: relative;
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
  width: 110%;
  height: 150%;
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
  font-size: 1.1rem;
  font-weight: 600;
  color: #3c2f25;
  margin-bottom: 0.5rem;
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

/* === 指示點 === */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 3rem;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d4c4b0;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
}

.carousel-indicators button:hover {
  background: #b48a60;
  transform: scale(1.2);
}

.carousel-indicators button.active {
  width: 32px;
  border-radius: 5px;
  background: linear-gradient(90deg, #b48a60, #a47a53);
}

/* === 顏色網格 === */
.colors-section {
  text-align: center;
  padding: 40px 0;
}

.colors-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 桌機一排 8 個 */
  gap: 20px;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.color-card {
  position: relative;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;                /* 讓內容可以置中 */
  justify-content: center;      /* 水平置中 */
  align-items: center;          /* 垂直置中 */
  aspect-ratio: 1 / 1;          /* 讓卡片保持方形 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.color-card:hover {
transform: scale(1.03);
}

.color-image-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.color-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;          /* 保留圖片比例並置中 */
  display: block;
  margin: 0 auto;
}
.color-name {
  padding: 8px 0;
  font-size: 14px;
  color: #333;
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
.color-theme-block {
  margin-bottom: 50px;
}

.theme-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #5a4a42;
  margin-bottom: 20px;
  border-left: 6px solid #c4a484;
  padding-left: 10px;
}
.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 12px;
}

.theme-header:hover {
  background: #ececec;
}

.toggle-icon {
  font-size: 14px;
  color: #666;
}

/* 顏色方塊維持原本排版 */
.colors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 12px;
  transition: all 0.3s ease;
}

/* 展開與收合動畫 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
/* === RWD === */
@media (max-width:620px) {
  .hero-title {
    font-size: 3rem;
    letter-spacing: 4px;
  }

  .hero-description {
    font-size: 0.8rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .products-section,
  .colors-section {
    padding: 5rem 0;
  }

  .carousel-btn {
    width: 44px;
    height: 44px;
    color: #b48a60;
    flex-shrink: 0;
  }
  .carousel-btn:active {
  background: linear-gradient(135deg, #b48a60, #a47a53);
  color: #fff;
  }
  .carousel-btn svg {
    width: 24px;
  height: 24px;
  stroke: currentColor;
  flex-shrink: 0;
  }

  .product-card {
    flex: 0 0 25%;
    justify-content: left;
  }

  .colors-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .product-name {
    margin-top: 20px;
    font-size: 0.8rem;
  }
  .product-image{
    width: 100%;
  }
  .product-desc {
    font-size: 1px
  }
  .product-image-wrapper{
    width: 125%;
    height: 40%;
  }
}

@media (max-width: 410px) {
  .hero-banner {
    height: 70vh;
  }
 .carousel-btn svg {
    width: 24px;
    height: 24px;
  }

  .hero-title {
    font-size: 2.5rem;
  }
.hero-description {
  font-size: 0.7rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  font-weight: 300;
  letter-spacing: 2px;
}
  .carousel-container {
    gap: 1rem;
  }

  .container {
    padding: 0 1rem;
  }
  .product-name {
    margin-top: 10px;
    font-size: 1.0rem;
  }
  .product-info{
    height: 100%;
  }
  .product-card{
    height: 100%;
  }
  .product-image{
    width: 100%;
  }
  .carousel-track{
    height:100%;
    max-width:100%;
  }
}
</style>