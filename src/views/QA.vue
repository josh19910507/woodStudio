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
          <div class="qa-contace">
            <p>以上若有更多問題，歡迎點擊下方連結留言聯絡我們!</p>
          </div>
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
    question: 'Q1：標準門組價格包含哪些項目？',
    answer: '標準門組價格包含以下項目：門框、門片、高密度保麗龍芯材，以及全套五金（鉸鏈、門擋、防撞條、一字水平把手）。'
  },
  {
    question: 'Q2：門組尺寸有固定規格嗎？浴室可以使用嗎?',
    answer: '標準尺寸是 90×210 公分，如果想做更高或更寬的門也沒問題，只是會加上少許客製費。要注意門高不能超過 240 公分喔！'
  },
  {
    question: 'Q3：門片可以用在浴室嗎？',
    answer: '可以。門面材為防潑水材質，適合用於乾溼分離的浴室。若擔心潮溼或通風問題，可加裝客製通風口。'
  },
  {
    question: 'Q4：五金配件可以自行提供嗎？',
    answer: '可以自己準備五金喔！只要把五金的型號或尺寸提供給我們，我們會幫您確認門上開孔的大小與位置是否合適。'
  },
  {
    question: 'Q5：現場已有門框，能只製作門片嗎？',
    answer: '可單製作門扇，需現場丈量確認原框垂直度、平整度與結構穩定性後，再決定。'
  },
  {
    question: 'Q6：可以製作拉門嗎？',
    answer: '可以做拉門喔！門片我們可以製作，軌道的部分就由您自行準備與安裝。'
  },
  {
    question: 'Q7：門組安裝完成後，牆面要如何處理才會更美觀？',
    answer: '門裝好後通常會進行油漆工程，建議讓油漆師傅幫門邊補土、上牆面同色漆，這樣邊緣會更平整漂亮。'
  },
  {
    question: 'Q8：現場施工到哪個階段可以安排丈量？',
    answer: '門洞製作完成並封板或粉光抹平；門洞尺寸不再變動；若為浴室，磁磚及門檻已安裝完成。'
  },
  {
    question: 'Q9：現場施工到哪個階段可以安排安裝門組？',
    answer: '建議所有裝修工程都完成、木地板也鋪好後再安裝門，這樣比較不會刮傷，效果也最好。現場施工做到哪個階段可以安排安裝門組?'
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
.qa-contace{
  font-size: larger;
  display: flex;
  justify-content: center;
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
