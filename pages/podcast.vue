<template>
  <div class="container mt-5">
    <h1 class="police my-3">Notre Podcast</h1>
    <div class="d-flex justify-content-center">
      <p class="mx-auto">Découvrez le podcast captivant de Kartel, votre guide ultime vers l'art et la culture ! Plongez dans des épisodes riches en découvertes, où vous explorerez des sujets fascinants et rencontrerez des experts passionnés. Que vous soyez un amateur d'art ou simplement curieux, notre podcast vous offre une expérience immersive et enrichissante. Abonnez-vous dès maintenant et laissez-vous inspirer par le monde de l'art avec Kartel !</p>
    </div>
    <div class="row my-5">
      <div class="col-4 my-auto">
        <div class="line"></div>
      </div>
      <div class="col-4 my-auto p-0 mx-auto">
        <h2 class="pill-bleu mb-0 police fs-3">Nos derniers épisodes</h2>
      </div>
      <div class="col-4 my-auto">
        <div class="line"></div>
      </div>
    </div>
    
    <!-- Affichage conditionnel basé sur l'état de chargement -->
    <div v-if="isLoading" class="text-center my-5">
      <p>Chargement des épisodes...</p>
    </div>
    <div v-else-if="error" class="text-center my-5">
      <p class="text-danger">{{ error }}</p>
      <!-- Utiliser les URLs statiques en cas d'erreur -->
      <SpotifyPodcast :urls="staticSpotifyUrls" />
    </div>
    <div v-else>
      <SpotifyPodcast :urls="episodeUrls" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SpotifyPodcast from '~/components/SpotifyPodcast.vue';
import { useSpotifyShow } from '~/composables/useSpotifyShow';

// ID de votre podcast
const PODCAST_SHOW_ID = '0Z8uFOMqqQnV4yIIo0l8dY';

// URLs statiques en cas de fallback
const staticSpotifyUrls = [
  'https://open.spotify.com/embed/episode/21SF2PiWtkN6cPMh5ojsYr?utm_source=generator',
  'https://open.spotify.com/embed/episode/6ruxVY5wvKRIKQl1CaDsbZ?utm_source=generator',
  'https://open.spotify.com/embed/episode/16o0eqV9WCe9dO4eg2Ccq3?utm_source=generator',
  'https://open.spotify.com/embed/episode/0X8rGKWzrotahTUYQKC9LN?utm_source=generator'
];

// Utiliser le composable
const { episodeUrls, isLoading, error, fetchShowEpisodes } = useSpotifyShow();

// Au montage du composant, récupérer les épisodes
onMounted(async () => {
  await fetchShowEpisodes(PODCAST_SHOW_ID);
  
  // Si après 5 secondes, on n'a toujours pas d'épisodes et pas d'erreur explicite,
  // utiliser le fallback (pour éviter une page vide)
  setTimeout(() => {
    if (episodeUrls.value.length === 0 && !error.value) {
      error.value = "Délai d'attente dépassé";
    }
  }, 5000);
});

useHead({
  title: 'Podcast - Kartel',
  meta: [
    {
      name: 'description',
      content: 'Découvrez les podcasts captivants de Kartel ! Plongez dans des épisodes riches en découvertes, où vous explorerez des sujets fascinants et rencontrerez des passionnés.'
    }
  ]
});
</script>

<style scoped>
p{
  text-align: justify;
}
.police {
  font-family: 'Lettown Hills';
  font-weight: 900 !important;
}
.pill-bleu {
  color: #212ea5;
}
.line {
  border-top: 2px solid #f6dc75 !important;
  border-top-width: 2px !important;
  border-top-style: solid !important;
  border-top-color: #f6dc75 !important;
}
</style>
