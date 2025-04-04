<template>
  <h1> Liste des articles</h1>
  <div class="article-list">
    <ul>
      <li v-for="article in articles" :key="article.id">
        <div class="article-info">
          <p>{{ article.title }}</p>
          <p>écrit par {{ article.author }}, le {{ article.created_at }}.</p>
        </div>
        <div class="actions">
          <NuxtLink :to="`/espace-admin/creation-article/${article.id}`">
            <Icon name="lucide:pencil" class="action-icon" />
          </NuxtLink>
          <Icon name="lucide:trash" @click="deleteArticle(article.id)" class="action-icon" />
        </div>
      </li>
    </ul>
    <NuxtLink to="/espace-admin/creation-article/" class="create-link">Créer un article</NuxtLink>
  </div>
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


useHead({
  title: 'Espace Admin - Liste des articles',
  meta: [
    {
      name: 'description',
      content: 'Liste des articles disponibles'
    }
  ]
});
</script>


<style scoped>
.article-list {
  width: 100%;
  margin-top: 16px;
  min-width: 100px;

  a {
    color: rgb(74, 73, 73);
    text-decoration: none;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 3rem;
  }
  
  ul {
    li {
      padding: 10px;
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin: 0 auto;

      p {
        margin: 0;
        max-width: 400px; 
        text-align: left;
        word-wrap: break-word; 
        overflow-wrap: break-word;
        text-overflow: ellipsis; 
      }
    }
  }

  .create-link {
    display: block;
    width: fit-content;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
    background-color: #212ea5;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    margin-top: 32px;
    text-decoration: none;
  }
}
</style>