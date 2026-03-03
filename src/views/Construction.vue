<template>
  <div class="product-page">

    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-parallax">
        <img src="../assets/images/工法1.jpg" alt="工法" class="hero-image" />
      </div>
      <div class="hero-overlay">
        <div class="hero-content">
          <span class="hero-subtitle">GRAND ENTRANCE DOORS</span>
          <h1 class="hero-title">工法</h1>
          <p class="hero-description">專業施工流程完整介紹<br></p>
        </div>
      </div>
      <div class="hero-decoration"></div>
    </section>

    <!-- 工法流程 -->
    <section class="steps-section">
      <h2>施工流程</h2>

      <div class="steps-container">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="step-card"
        >
          <div class="step-number">
            步驟 {{ index + 1 }}
          </div>

          <img
            :src="getImageUrl(step.imageName)"
            :alt="step.title"
            class="step-image"
          />

          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
      <br/>
      <h2>完成</h2>
    </section>
<div class="benefits-section">
  <div class="benefits-inner">
    <h3>後製門框的好處</h3>
    <p class="benefits-intro">
      後製門框工法是在牆面、地坪完成後再進行門框安裝，
      能有效提升施工精準度與整體質感，是現代住宅裝修的優化選擇。
    </p>

    <div class="benefits-grid">
      <div class="benefit-item">
        <span class="benefit-icon">🏆</span>
         <div class="benefit-text">
        <h4>✔ 快速完工，效率倍增</h4>
        <p>以工廠化製程取代傳統現場施作，大幅縮短施工時間。完整門組於場外預製，進場後即可迅速安裝，讓工期更可控、進度更流暢。</p>
      </div>
      </div>

      <div class="benefit-item">
        <span class="benefit-icon">🔒</span>
        <div class="benefit-text">
        <h4>✔ 精準施工，降低碰撞風險</h4>
        <p>藉由場外加工與標準化製程，減少現場工班來回作業所造成的磕碰與損傷風險；門組品質在工廠即完成控管，現場只需安裝，驗收更直接清晰、成品更可預期。</p>
      </div>
      </div>

      <div class="benefit-item">
        <span class="benefit-icon">💧</span>
        <div class="benefit-text">
        <h4>✔ 提升防潮性機械貼皮，穩定不翹邊</h4>
        <p>門扇表面以機械貼皮處理，力道均勻、貼合度高，能有效降低日後收縮、翹皮與剝落的風險，長期維持平整美觀。</p>
      </div>
      </div>

      <div class="benefit-item">
        <span class="benefit-icon">✨</span>
         <div class="benefit-text">
        <h4>✔ 框體細緻倒角，兼具安全與質感</h4>
        <p>框體採細緻倒角與修邊工藝，觸感更柔順，能降低日常碰撞造成的受傷或木料破損，兼顧使用安全與視覺精緻感。</p>
      </div>
      </div>
      <div class="benefit-item">
        <div class="benefit-text">
        <h4>✔ 雙線板立體收邊，完整度更高</h4>
        <p>雙線板收邊設計，使門與牆面過渡更俐落，層次感更豐富；不僅提升整體精緻度，也讓空間呈現更高端的細節表現。</p>
      </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue'

const steps = ref([
  { id: 1, title: '安裝C型鋼', desc: '牆面兩側打上C型鋼並確認框體位子。', imageName: 'step2.jpg' },
  { id: 2, title: '量測垂直度', desc: '儀器量測C型鋼與地面垂直度。', imageName: 'step3.jpg' },
  { id: 3, title: '安裝主框', desc: '安裝門框主框。', imageName: 'step4.jpg' },
  { id: 4, title: '螺絲固定', desc: '鎖上螺絲固定門框及C型鋼。', imageName: 'step5.jpg' },
  { id: 5, title: '量測進出垂直度', desc: '用儀器測量主框進出面垂直度。', imageName: 'step6.jpg' },
  { id: 6, title: '主框切角銜接', desc: '門框切角銜接。', imageName: 'step7.jpg' },
  { id: 7, title: '主框完成', desc: '主框安裝完成。', imageName: 'step8.jpg' },
  { id: 8, title: '確認門扇大小', desc: '確認門扇大小是否吻合。', imageName: 'step9.jpg' },
  { id: 9, title: '細節修整', desc: '修整邊角與收邊。', imageName: 'step10.jpg' },
   { id: 10, title: '完成', desc: '整體安裝完成', imageName: 'step12.jpg' },

])

const getImageUrl = (name) => {
  return new URL(`../assets/images/construction/${name}`, import.meta.url).href
}

onMounted(async () => {
  await nextTick()
  const cards = document.querySelectorAll('.step-card')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.2 })
  cards.forEach((card) => observer.observe(card))
})
onMounted(() => {
  const benefitItems = document.querySelectorAll('.benefit-item')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })

  benefitItems.forEach(item => observer.observe(item))
})
</script>

<style scoped>
.product-page {
  font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
  color: #3c2f25;
  line-height: 1.6;
  background: #c4aa8d;
}
.steps-section {
  padding: 6rem 1rem;
  background: linear-gradient(to bottom, #f8f5f1, #ffffff);
  position: relative;
}

.steps-section h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 4rem;
  color: #5a4634;
  letter-spacing: 3px;
}

/* 中央時間軸線 */
.steps-container {
  position: relative;
  max-width: 1100px;
  margin: auto;
}

.steps-container::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 4px;
  height: calc(100% - 40px);
  background: linear-gradient(to bottom, #b48a60, #d8b48a);
  transform: translateX(-50%);
}

/* 單個步驟 */
.step-card {
  position: relative;
  width: 50%;
  padding: 2rem 3rem;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(60px);
  transition: all 0.8s ease;
}

/* 顯示動畫 */
.step-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 左右交錯 */
.step-card:nth-child(odd) {
  left: 0;
  text-align: right;
}

.step-card:nth-child(even) {
  left: 50%;
}

/* 卡片內容 */
.step-content {
  background: #ffffff;
  padding: 2.2rem;
  border-radius: 20px;
  box-shadow:
    0 10px 25px rgba(0,0,0,0.05),
    0 20px 50px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  border: 1px solid rgba(180,138,96,0.15);
}

.step-content:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 40px rgba(0,0,0,0.08),
    0 30px 60px rgba(0,0,0,0.12);
}

.step-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a3a2c;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 18px;
  letter-spacing: 1px;
}
.step-content h3::before {
  content: "";
  position: absolute;
  left: 0;
  top: 6px;
  width: 5px;
  height: 20px;
  background: #b48a60;
  border-radius: 3px;
}
.step-content p {
  font-size: 1rem;
  color: #666;
  line-height: 1.9;
  letter-spacing: 0.5px;
  margin: 0;
}

/* 圖片 */
.step-image {
  width: 100%;
  border-radius: 14px;
  margin-bottom: 1rem;
  transition: transform 0.5s ease;
}

.step-content:hover .step-image {
  transform: scale(1.05);
}

/* 中間圓點 */
.step-card::after {
  content: attr(data-step);
  position: absolute;
  top: 2.5rem;
  width: 46px;
  height: 46px;
  background: linear-gradient(135deg, #b48a60, #d8b48a);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 2;
  font-size: 14px;
  letter-spacing: 1px;

}

/* 圓點位置 */
.step-card:nth-child(odd)::after {
  right: -23px;
}

.step-card:nth-child(even)::after {
  left: -23px;
}
.hero-banner {
  position: relative;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-parallax {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.65),
    rgba(0,0,0,0.3)
  );
  display: flex;
  align-items: center;
  z-index: 1;
}

.hero-content {
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
  color: #fff;
}

.hero-subtitle {
  letter-spacing: 3px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin: 1rem 0;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.btn-contact {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #b48a60;
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-contact:hover {
  background: #9f7652;
  transform: translateY(-3px);
}


.btn-contact:hover .btn-arrow {
  transform: translateX(5px);
}
.steps-container::after {
  content: "✓";
  position: absolute;
  left: 50%;
  bottom: -25px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: #5a4634;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
}
.benefits-section {
  margin-top: 6rem;
  padding: 5rem 2rem;
  background: linear-gradient(to bottom, #f8f6f3, #ffffff);
}

.benefits-inner {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.benefits-inner h3 {
  font-size: 2rem;
  letter-spacing: 4px;
  font-weight: 600;
  color: #4a3a2c;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.benefits-inner h3::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: #b48a60;
  border-radius: 2px;
}

.benefits-intro {
  max-width: 700px;
  margin: 2rem auto 4rem;
  color: #666;
  line-height: 1.9;
  letter-spacing: 0.5px;
}

/* Grid 區 */

.benefits-grid {
   display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #ffffff;
  padding: 1.8rem 2rem;
  border-radius: 18px;
  border: 1px solid rgba(180,138,96,0.15);
  box-shadow:
    0 10px 25px rgba(0,0,0,0.05),
    0 20px 40px rgba(0,0,0,0.06);
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}

.benefit-item:hover {
   transform: translateY(-6px);
  box-shadow:
    0 15px 35px rgba(0,0,0,0.08);
}
.benefit-item.visible {
  opacity: 1;
  transform: translateY(0);
}
.benefit-item h4 {
 font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #5a4634;
  font-weight: 600;
}
/* 左側 icon */
.benefit-icon {
  font-size: 2rem;
  flex-shrink: 0;
  color: #b48a60;
  margin-top: 4px;
  transition: transform 0.4s ease;
}
.benefit-item:hover .benefit-icon {
  transform: scale(1.2) rotate(10deg);
}
.benefit-item p {
 font-size: 1rem;
  color: #666;
  line-height: 1.8;
}
.benefit-text h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a3a2c;
  margin-bottom: 0.5rem;
}
.benefit-text p {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
}
.benefit-item:not(.visible) {
  opacity: 0;
  transform: translateY(40px);
}
/* 手機版 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-banner {
    height: 70vh;
  }
  .benefit-item {
    flex-direction: row;
    gap: 1rem;
  }
}
/* 手機版 */
@media (max-width: 900px) {

  .steps-container::before {
    left: 20px;
  }

  .step-card {
    width: 100%;
    padding-left: 60px;
    padding-right: 20px;
    left: 0 !important;
    text-align: left !important;
  }

  .step-card::after {
    left: -2px !important;
  }
}

</style>
