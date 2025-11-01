<template>
  <Header />
  <transition name="page-fade" mode="out-in">
    <main class="fullwidth">
      <div class="router-navigation">
        <!-- 左箭頭 -->
        <button 
          class="nav-arrow nav-arrow-left"
          @click="navigatePrev"
          :disabled="!hasPrevRoute"
          v-if="showArrows"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- 路由視圖 -->
        <div class="router-content">
          <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
              <component :is="Component" :key="$route.path" />
            </transition>
          </router-view>
        </div>

        <!-- 右箭頭 -->
        <button 
          class="nav-arrow nav-arrow-right"
          @click="navigateNext"
          :disabled="!hasNextRoute"
          v-if="showArrows"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </main>
  </transition>
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted, onUnmounted, inject, watch, nextTick, provide, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 定義路由順序
const routeOrder = [
  { path: '/', name: 'Door' },
  { path: '/BigDoor', name: 'BigDoor' },
  { path: '/Design', name: 'Design' },
  { path: '/Construction', name: 'Construction' }
]

// 從 Header 注入的關閉選單函數
const closeMenu = inject('closeMenu', () => {})

let observer = null

// 計算當前路由索引
const currentRouteIndex = computed(() => {
  return routeOrder.findIndex(r => r.path === route.path)
})

// 判斷是否有上一頁
const hasPrevRoute = computed(() => {
  return currentRouteIndex.value > 0
})

// 判斷是否有下一頁
const hasNextRoute = computed(() => {
  return currentRouteIndex.value < routeOrder.length - 1 && currentRouteIndex.value !== -1
})

// 是否顯示箭頭 (首頁可能不需要)
const showArrows = computed(() => {
  return currentRouteIndex.value !== -1
})

// 導航到上一頁
function navigatePrev() {
  if (hasPrevRoute.value) {
    const prevRoute = routeOrder[currentRouteIndex.value - 1]
    router.push(prevRoute.path)
  }
}

// 導航到下一頁
function navigateNext() {
  if (hasNextRoute.value) {
    const nextRoute = routeOrder[currentRouteIndex.value + 1]
    router.push(nextRoute.path)
  }
}

// 鍵盤導航
function handleKeydown(e) {
  if (e.key === 'ArrowLeft') {
    navigatePrev()
  } else if (e.key === 'ArrowRight') {
    navigateNext()
  }
}

// 初始化 Intersection Observer
function initObserver() {
  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -15% 0px'
    }
  )
}

// 觀察頁面中的動畫元素
function observeElements() {
  const sections = document.querySelectorAll('.reveal-section')
  sections.forEach((section) => {
    if (observer) {
      observer.observe(section)
    }
  })
}

// 滾動到聯絡區域的函數
function scrollToFooter(event) {
  if (event) {
    event.preventDefault()
  }
  
  const footer = document.getElementById('contact')
  
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  closeMenu()
}

// 提供函數給子組件使用
provide('scrollToFooter', scrollToFooter)

onMounted(() => {
  initObserver()
  observeElements()
  window.addEventListener('keydown', handleKeydown)
})

// 監聽路由變化
watch(
  () => route.path,
  async () => {
    await nextTick()
    observeElements()
    // 路由切換後滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
)

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
/* ===== 全局樣式 - 給所有子頁面使用 ===== */

/* 滾動顯示動畫 */
.reveal-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 按鈕樣式 */
.btn {
  display: inline-block;
  background: #b48a60;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: #a37a50;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Bootstrap 輪播淡入效果 */
.carousel-fade .carousel-item {
  transition: opacity 1s ease;
  opacity: 0;
}

.carousel-fade .carousel-item.active {
  opacity: 1;
}

/* Hero 區塊樣式 */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-text h1 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  color: #333;
}

.hero-text p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

/* 響應式設計 */
@media (max-width: 800px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 60px 20px;
    gap: 30px;
  }
  
  .hero-text {
    order: 1;
  }
  
  .carousel {
    order: 2;
  }
}
</style>

<style scoped>
/* ===== 局部樣式 - 只給 App.vue 使用 ===== */

/* 頁面切換動畫 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 滑動動畫 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 佈局 */
.fullwidth {
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  min-height: calc(100vh - 200px);
}

/* 路由導航容器 */
.router-navigation {
  display: flex;
  align-items: stretch;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

.router-content {
  flex: 1;
  min-width: 0;
}

/* 導航箭頭 */
.nav-arrow {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  border: 2px solid #b48a60;
  color: #b48a60;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 50vh;
  align-self: flex-start;
  z-index: 100;
}

.nav-arrow:hover:not(:disabled) {
  background: #b48a60;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(180, 138, 96, 0.3);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.nav-arrow:active:not(:disabled) {
  transform: scale(0.95);
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .router-navigation {
    gap: 15px;
    padding: 15px;
  }
  
  .nav-arrow {
    width: 50px;
    height: 50px;
  }
  
  .nav-arrow svg {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 768px) {
  .router-navigation {
    gap: 10px;
    padding: 10px;
  }
  
  .nav-arrow {
    width: 44px;
    height: 44px;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .nav-arrow-left {
    left: 10px;
  }
  
  .nav-arrow-right {
    right: 10px;
  }
  
  .nav-arrow:hover:not(:disabled) {
    transform: translateY(-50%) scale(1.05);
  }
  
  .nav-arrow svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .nav-arrow {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
  }
  
  .nav-arrow-left {
    left: 5px;
  }
  
  .nav-arrow-right {
    right: 5px;
  }
}
</style>