<template>
  <div class="article-list">
    <NuxtLink to="/espace-admin/creation-article/" class="create-link">Créer un article</NuxtLink>
    <h1>Liste des articles</h1>
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
    <p>Pour des raisons de sécurité, merci de vous déconnecter à chaque fin de session.</p>
    <button @click="handleLogout" class="logout-btn">Déconnexion</button>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'nuxt/app';

// Utilisation du composable fourni par le module Supabase
const supabase = useSupabaseClient();
const articles = ref<any[]>([]);
const router = useRouter();

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

// Fonction pour se déconnecter
const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push('/espace-admin/login');
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

// Appliquer le middleware d'authentification
definePageMeta({
  middleware: ['admin-auth']
});
</script>


<style scoped>
.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

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
    margin-bottom: 16px;
    text-decoration: none;
  }
}
</style>