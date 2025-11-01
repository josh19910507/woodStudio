<template>
  <header>
    <div class="container nav">
      <!-- 品牌名稱 -->
      <div class="brand">鼎揚匠心木作</div>

      <!-- 桌面選單 -->
      <nav class="desktop-menu">
        <ul>
          <li><router-link to="/">木門</router-link></li>
          <li><router-link to="/BigDoor">大門</router-link></li>
          <li><router-link to="/Design">設計</router-link></li>
          <li><router-link to="/Construction">工法</router-link></li>
          <li><router-link to="/QA">Q&A</router-link></li>
          <li>
            <router-link
              to="#contact"
              class="btn-contact"
              @click.native="scrollToFooter"
            >
              聯絡我們
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 行動版按鈕 -->
      <button class="menu-toggle" @click="toggleMenu" aria-label="選單開關">
        <span v-if="!menuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- 行動版下拉選單 -->
    <transition name="slide-fade">
      <nav v-if="menuOpen" class="mobile-menu">
        <ul>
          <li><router-link to="/" @click="closeMenu">首頁</router-link></li>
          <li>
            <router-link
              to="#contact"
              class="btn-contact"
              @click.native="scrollToFooter"
            >
              聯絡我們
            </router-link>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

watch(() => route.fullPath, () => {
  closeMenu()
})

function scrollToFooter() {
  const footer = document.getElementById('contact')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
  closeMenu()
}
</script>

<style scoped>
/* ========== Header 結構 ========== */
header {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 50;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
}

/* 品牌名稱 */
.brand {
  font-weight: 800;
  font-size: 20px;
  color: #b48a60;
  letter-spacing: 1px;
  white-space: nowrap;
}

/* ========== 桌面版選單 ========== */
.desktop-menu ul {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.desktop-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: color 0.25s ease;
}

.desktop-menu a:hover {
  color: #b48a60;
}

/* 聯絡按鈕 */
.btn-contact {
  background: #b48a60;
  color: #fff !important;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.btn-contact:hover {
  background: #a17752;
  transform: translateY(-2px);
}

/* ========== 行動版選單 ========== */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #333;
  transition: transform 0.3s ease;
}

.menu-toggle:hover {
  transform: scale(1.1);
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 18px 0;
}

.mobile-menu ul {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  padding: 8px 20px;
}

/* ========== 動畫效果 ========== */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

/* ========== 響應式 ========== */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
