<template>
    <ArticleForm :articleId="articleId" />
  </template>
  
  <script setup>
  import { useRoute } from '#imports'
  import ArticleForm from '~/components/ArticleForm.vue'
  
  const route = useRoute()
  const articleId = parseInt(route.params.id)
  </script>