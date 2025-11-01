<template>
  <div class="product-page" >
    <!-- Hero Banner -->
    <section class="hero-banner">
      <img src="../assets/images/工法1.jpg" alt="木門主題" class="hero-image" />
      <div class="hero-overlay">
        <h1>工法</h1>
        <p>探索我們的優質產品系列</p>
      </div>
    </section>

    <!-- 工法 -->
    <section class="products-section">
      <div class="section-background"></div>
      <div class="section-content">
        <h2>工法介紹</h2>

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
                <img :src="getImageUrl(product.imageName)" :alt="product.name" class="product-image" />
                <p class="product-desc">{{ product.shortDesc }}</p>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextSlide">→</button>
        </div>

        <!-- 指示點 -->
        <div class="carousel-indicators">
          <button
            v-for="(dot, index) in totalSlides"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
const itemsPerView = ref(3)

const products = ref([
  {
    id: 1,
    name: '實木門系列',
    shortDesc: '質感溫潤，展現自然木紋之美。',
     imageName: '木門1.jpg',
  },
  {
    id: 2,
    name: '設計款大門',
    shortDesc: '兼具安全與美感的完美選擇。',
     imageName: '木門1.jpg',
  },
  {
    id: 3,
    name: '木門貼膜',
    shortDesc: '輕鬆更新家中風格，細膩耐用。',
     imageName: '木門1.jpg',
  },
  {
    id: 4,
    name: '設計工法展示',
    shortDesc: '精準工藝與美學的融合。',
     imageName: '木門1.jpg',
  },
  {
    id: 5,
    name: '高端木作工法',
    shortDesc: '專業施工品質，耐用兼具美觀。',
     imageName: '木門1.jpg',
  },
])

const slideWidth = computed(() => 100 / itemsPerView.value)
const maxIndex = computed(() =>
  Math.max(0, products.value.length - itemsPerView.value)
)
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

function updateItemsPerView() {
  if (window.innerWidth < 640) itemsPerView.value = 1
  else if (window.innerWidth < 1024) itemsPerView.value = 2
  else itemsPerView.value = 3

  if (currentIndex.value > maxIndex.value)
    currentIndex.value = maxIndex.value
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
onMounted(() => {
  const cards = document.querySelectorAll('.product-card')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // 只觸發一次
      }
    })
  }, {
    threshold: 0.2 // 顯示 20% 就觸發動畫
  })

  cards.forEach((card) => observer.observe(card))
})
const getImageUrl = (name) => {
  // 這是 Vite 官方推薦的動態導入資源方式
  // 它會告訴 Vite 在打包時處理這個相對路徑。
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};
</script>

<style scoped>
.product-page {
  font-family: 'Noto Sans TC', sans-serif;
  color: #333;
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
}
.hero-overlay p {
  font-size: 1.2rem;
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
  background: url('../assets/images/木紋背景.jpg') center/cover no-repeat fixed;
  opacity: 0.2;
  z-index: 0;
}
.section-content {
  position: relative;
  z-index: 1;
  text-align: center;
}
.section-content h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #5a4634;
}

/* Carousel */
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
.product-card {
  flex: 0 0 calc(33.333% - 14px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: none;
  border: none;
  background: transparent;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
  margin-left: 11px;
}

.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 圖片 */
.product-image {
  width: 50%;
  height: 150px;
  overflow: hidden;
  border-radius: 12px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* 文字區 */
.product-info {
  text-align: center;
  padding: 12px 10px;
  background: transparent;
}

.product-info h3 {
  display: none; /* 不顯示標題 */
}

.product-desc {
  color: #444;
  font-size: 0.95rem;
  margin-top: 10px;
  line-height: 1.5;
}

/* Buttons */
.carousel-btn {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 1rem;
  transition: background 0.3s, transform 0.3s;
}
.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.1);
}

/* Indicators */
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  bottom: -30px;
}
.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  margin: 0 6px;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}
.carousel-indicators button.active {
  width: 24px;
  border-radius: 6px;
  background: #b48a60;
}

/* Responsive */
@media (max-width: 1024px) {
  .product-card {
    width: calc(100% / 2 - 1rem);
  }
}
@media (max-width: 640px) {
  .product-card {
    width: 100%;
  }
}
</style>
