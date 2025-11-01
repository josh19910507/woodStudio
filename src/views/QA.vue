<template>
  <div class="qa-page">
    <!-- 頁首區 -->
    <section class="hero-banner">
      <img src="../assets/images/QA.jpeg" alt="木材公司 Q&A" class="hero-image" />
      <div class="hero-overlay">
        <h1>常見問題 Q&A</h1>
        <p>了解更多關於我們木作產品與服務的資訊</p>
      </div>
    </section>

    <!-- Q&A 內容區 -->
    <section class="qa-section">
      <div class="section-background"></div>
      <div class="qa-content">
        <h2>客戶最常詢問的問題</h2>

        <div v-for="(item, index) in faqs" :key="index" class="qa-item">
          <button class="qa-question" @click="toggle(index)">
            <span>{{ item.question }}</span>
            <span class="arrow" :class="{ open: activeIndex === index }">⌄</span>
          </button>
          <div v-show="activeIndex === index" class="qa-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)
const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqs = [
  {
    question: '你們的木材來源是什麼？',
    answer: '我們的木材均來自合法永續林業供應商，並通過 FSC 認證，確保品質與環保責任。'
  },
  {
    question: '是否提供客製化尺寸或設計？',
    answer: '是的，我們提供客製化木門、木作與家具設計服務，您可提供尺寸、樣式或參考照片，我們的設計團隊將協助完成。'
  },
  {
    question: '施工時間通常需要多久？',
    answer: '依專案大小而定，小型木門製作約需 7–10 天，大型空間設計工程約需 3–4 週。'
  },
  {
    question: '木作產品需要特別保養嗎？',
    answer: '建議每半年使用中性清潔劑與柔軟布擦拭，並避免長時間曝曬或潮濕，以維持木質紋理與色澤。'
  },
  {
    question: '是否提供保固服務？',
    answer: '是的，我們提供一年產品保固與售後維修服務，讓您安心使用。'
  }
]
</script>

<style scoped>
.qa-page {
  font-family: 'Noto Sans TC', sans-serif;
  color: #7e6d6d;
}

/* 頂部橫幅 */
.hero-banner {
  position: relative;
  height: 60vh;
  overflow: hidden;
}
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.1);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
  text-align: center;
}
.hero-overlay h1 {
  font-size: 3rem;
  letter-spacing: 3px;
}
.hero-overlay p {
  font-size: 1.1rem;
}

/* Q&A 主體 */
.qa-section {
  margin-top: 10px;
  position: relative;
  padding: 4rem 1rem;
  overflow: hidden;
}

/* 深木色主題背景 */
.section-background {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom right,
      rgb(242, 241, 240),
      rgba(251, 250, 249, 0.9)
    );
  z-index: 0;
}

/* 柔光暈層 */
.section-background::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 20%,
    rgba(226, 209, 209, 0.12),
    transparent 40%
  );
  mix-blend-mode: overlay;
  z-index: 1;
}

.qa-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
}

.qa-content h2 {
  text-align: center;
  font-size: 2rem;
  color: #110f0c;
  margin-bottom: 2.5rem;
}

/* 問答項 */
.qa-item {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.qa-question {
  width: 100%;
  background: transparent;
  border: none;
  color: #2e261d;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
}
.qa-question:hover {
  background: rgb(212, 191, 191);
}
.arrow {
  transition: transform 0.3s ease;
}
.arrow.open {
  transform: rotate(180deg);
}

.qa-answer {
  padding: 0 1.2rem 1rem;
  color: #362f23;
  line-height: 1.6;
  font-size: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 響應式 */
@media (max-width: 640px) {
  .hero-overlay h1 {
    font-size: 2rem;
  }
  .qa-content h2 {
    font-size: 1.5rem;
  }
}
</style>
