<template>
  <div>
    <h1>Liste des Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Utilisation du composable fourni par le module Supabase
const supabase = useSupabaseClient();
const articles = ref<any[]>([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from('Article')
    .select('*');
  if (error) {
    console.error(error);
  } else {
    articles.value = data || [];
  }
});
</script>