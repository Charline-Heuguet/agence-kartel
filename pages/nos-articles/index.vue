<template>
  <div class="container">
    <h1>Nos articles</h1>
    <!-- Barre de catégories (Pastilles cliquables) -->
    <div class="category-pills">
      <button v-for="category in uniqueCategories" :key="category" @click="scrollToCategory(category)">
        {{ category }}
      </button>
    </div>

    
    <!-- Articles Slider -->
    <div v-for="category in uniqueCategories" :key="category" :id="category">
      <articleSlider :category="category" />
    </div>

    <!-- Bouton pour remonter en haut de la page -->
    <arrowup />
  </div>
</template>

<script setup lang="ts">
import articles from '~/content/articles';
import { ref } from 'vue'
import arrowup from '~/components/ui/arrowup.vue';

// Récupérer les catégories existantes
const categories = ref<string[]>([]);

articles.forEach(article => {
  categories.value.push(article.category);
});
console.log(categories.value);

// Remove duplicates categories
const uniqueCategories = categories.value.filter((v, i, a) => a.indexOf(v) === i);
console.log(uniqueCategories);

// Fonction pour scroller vers une catégorie
const scrollToCategory = (category: string) => {
  const section = document.getElementById(category);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

useHead({
  title: 'Nos articles - Kartel',
  meta: [
    {
      name: 'description',
      content: 'Découvrez nos articles sur des sujets variés : art, musique, littérature, etc.'
    }
  ]
});
</script>

<style scoped>
.category-pills {
  display: flex;
  gap: 80px;
  justify-content: center;
  margin: 40px 0 80px;
  
    button {
    padding: 8px 12px;
    border: none;
    background-color: #212ea5;
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 20px;
  }
}

button:nth-child(even) {
  color: black;
  background-color: #f6dc75;
}

button:hover {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5); 
}
</style>
