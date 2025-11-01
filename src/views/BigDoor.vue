<template>
  <div class="product-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <img src="../assets/images/大門1.png" alt="木門主題" class="hero-image" />
      <div class="hero-overlay">
        <h1>大門</h1>
        <p>探索我們的優質產品系列</p>
        <router-link
          to="#product"
          class="btn-contact"
          @click.native="scrollToFooter"
        >
          立即了解更多
        </router-link>
      </div>
    </section>

    <!-- 木門選品 -->
    <section class="products-section">
      <div class="section-background"></div>
      <div id="product" class="section-content">
        <h2>大門選品</h2>

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
                <div class="product-image">
                  <img :src="getImageUrl(product.imageName)" :alt="product.name" />
                </div>
                <p class="product-desc">{{ product.shortDesc }}</p>
              </div>
            </div>
          </div>

          <button class="carousel-btn next" @click="nextSlide">→</button>
        </div>

        
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

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

function updateItemsPerView() {
  if (window.innerWidth < 640) itemsPerView.value = 1
  else if (window.innerWidth < 1024) itemsPerView.value = 2
  else itemsPerView.value = 3

  if (currentIndex.value > maxIndex.value) currentIndex.value = maxIndex.value
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}

onMounted(async () => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
  window.addEventListener('keydown', handleKeydown)

  await nextTick()
  const cards = document.querySelectorAll('.product-card')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )
  cards.forEach((card) => observer.observe(card))
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView)
  window.removeEventListener('keydown', handleKeydown)
})

function scrollToFooter() {
  const footer = document.getElementById('product')
  if (footer) footer.scrollIntoView({ behavior: 'smooth' })
}

const getImageUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href
</script>

<style scoped>
.product-page {
  font-family: 'Noto Sans TC', sans-serif;
  color: #333;
}

/* Hero Banner */
.hero-banner { position: relative; height: 70vh; overflow: hidden; }
.hero-image { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay {
  position: absolute; inset: 0; background: rgba(0, 0, 0, 0.4);
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  color: #fff; text-align: center;
}
.hero-overlay h1 { font-size: 3rem; letter-spacing: 4px; }
.hero-overlay p { font-size: 1.2rem; }

/* Section */
.products-section { position: relative; padding: 5rem 1rem; overflow: hidden; }
.section-background {
  position: absolute; inset: 0;
  background: url('../assets/images/木紋背景.jpg') center/cover no-repeat fixed;
  opacity: 0.2; z-index: 0;
}
.section-content { position: relative; z-index: 1; text-align: center; }
.section-content h2 { font-size: 2rem; margin-bottom: 2rem; color: #5a4634; }

/* Carousel */
.carousel-container { display: flex; align-items: center; justify-content: center; position: relative; }
.carousel-wrapper { overflow: hidden; width: 80%; max-width: 1200px; }
.carousel-track {
  display: flex; gap: 14px; transition: transform 0.6s ease;
}
.product-card {
  flex: 0 0 calc(33.333% - 14px);
  border-radius: 12px; overflow: hidden;
  background: transparent; opacity: 0; transform: translateY(40px);
  transition: all 0.8s ease-out;
}
.product-card.visible { opacity: 1; transform: translateY(0); }

/* 圖片 */
.product-image { width: 100%; aspect-ratio: 3/2; overflow: hidden; border-radius: 12px; }
.product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.product-card:hover .product-image img { transform: scale(1.05); }

/* 文字區 */
.product-desc { color: #444; font-size: 0.95rem; margin-top: 10px; line-height: 1.5; }

/* Buttons */
.carousel-btn {
  background: rgba(255, 255, 255, 0.7); border: none; font-size: 1.5rem; cursor: pointer;
  border-radius: 50%; width: 2.5rem; height: 2.5rem; margin: 0 1rem;
  transition: background 0.3s, transform 0.3s;
}
.carousel-btn:hover { background: rgba(255, 255, 255, 0.9); transform: scale(1.1); }


/* 聯絡按鈕 */
.btn-contact {
  background: #b48a60; color: #fff !important; padding: 10px 22px;
  border-radius: 8px; font-weight: 600; transition: all 0.3s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}
.btn-contact:hover { background: #a17752; transform: translateY(-2px); }

/* Responsive */
@media (max-width: 1024px) {
  .product-card { flex: 0 0 calc(50% - 14px); }
  .product-desc { font-size: 0.85rem; }
}
@media (max-width: 640px) {
  .product-card { flex: 0 0 100%; }
  .product-desc { font-size: 0.75rem; }
}
</style>
