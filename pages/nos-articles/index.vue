<template>
  <div class="container">
    <h1>Nos articles</h1>
    
    <!-- Barre de catégories (Pastilles cliquables) -->
    <div v-if="loading" class="loading">
      Chargement des catégories...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="category-pills">
      <button 
        v-for="(category, index) in categories" 
        :key="category.id" 
        @click="scrollToCategory(category.name)"
        :class="index % 2 === 0 ? 'primary' : 'secondary'" 
      >
        {{ category.name }}
      </button>
    </div> 

    <!-- Articles par catégorie -->
    <div v-for="category in categories" :key="category.id" :id="category.name">
      <articleSlider :category-id="category.id" :category-name="category.name" />
    </div>

    <!-- Bouton pour remonter en haut de la page -->
    <arrowup />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import arrowup from '~/components/ui/arrowup.vue';
import { useArticles, type Category } from '~/composables/useArticles';

// Utilisation du composable
const { loading, error, getActiveCategories } = useArticles();

// État pour les catégories
const categories = ref<Category[]>([]);

// Charger les catégories au montage du composant
onMounted(async () => {
  try {
    // Récupérer uniquement les catégories qui ont des articles
    categories.value = await getActiveCategories();
  } catch (err) {
    console.error(err);
  }
});

// Fonction pour scroller vers une catégorie
const scrollToCategory = (categoryName: string) => {
  const section = document.getElementById(categoryName);
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
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
  justify-content: center;
}

.category-pills button {
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-pills button:hover {
  transform: translateY(-3px);
}

/* Style par défaut alternant entre deux couleurs */
.category-pills button.primary {
  background-color: #2828ab; /* Bleu foncé */
  color: white;
}

.category-pills button.secondary {
  background-color: #f5d742; /* Jaune */
  color: black;
}

.loading, .error {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}
</style>