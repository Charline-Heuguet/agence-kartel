<template>
  <h1> Liste des articles</h1>
  <NuxtLink to="/espace-admin/creation-article">Créer un article</NuxtLink>
  <ul>
    <li v-for="article in articles" :key="article.id">
      <p>{{ article.title }}, écrit par {{  article.author }}, le {{ article.created_at}}.</p>
      <NuxtLink :to="`/espace-admin/creation-article/${article.id}`">
          <Icon name="lucide:pencil" class="action-icon" />
        </NuxtLink>
      <Icon name="lucide:trash-2" @click="deleteArticle(article.id)" class="action-icon" />
    </li>
  </ul>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Utilisation du composable fourni par le module Supabase
const supabase = useSupabaseClient();
const articles = ref<any[]>([]);

// Chargement des articles
const fetchArticles = async () => {
  const { data, error } = await supabase
    .from('Article')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur lors du chargement des articles:', error);
    return;
  }
  
  articles.value = data;
};

// Initialisation
onMounted(() => {
  fetchArticles();
});

// Fonction pour supprimer un article
const deleteArticle = async (articleId: number) => {
  if (!confirm('Es-tu sûr.e de vouloir supprimer cet article?')) return;
  
  const { error } = await supabase
    .from('Article')
    .delete()
    .eq('id', articleId);
  
  if (error) {
    console.error('Erreur lors de la suppression:', error);
    return;
  }
  
  // Rafraîchir la liste après suppression
  fetchArticles();
};

</script>


<style scoped>
a {
  color: grey;
  text-decoration: none;
}

ul {
  margin: 0 auto;

  li {
    list-style-type: none;
    padding: 10px;
    margin: 10px;
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
}
</style>