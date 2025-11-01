<template>
  <footer>
    <h2>追蹤我們</h2>
    <p>歡迎透過社群媒體了解更多鼎揚匠心木作的最新作品與活動。</p>
    <div id="contact"class="social-links">
      <a href="https://m.facebook.com/2010828369012561/" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" style="width:40px;height:40px;object-fit:contain;">
      </a>
    </div>
  
    <p>© 2025 鼎揚匠心木作. All rights reserved.</p>
  </footer>
</template>

<script setup>
</script>

<style scoped>
footer {
  background: #4b3d2a;
  color: #fff;
  padding: 30px 20px;
  text-align: center;
  margin-top: 60px;
  animation: fadeIn 3s ease;
}
.social-links { display: flex; justify-content: center; gap: 20px; margin-top: 40px; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
