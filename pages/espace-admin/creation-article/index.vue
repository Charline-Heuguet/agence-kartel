<template>
  <ArticleForm />
</template>

<script setup>
import ArticleForm from '~/components/ArticleForm.vue'

// Appliquer le middleware d'authentification
definePageMeta({
  middleware: ['admin-auth']
});
</script>