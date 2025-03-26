<template>
    <div class="container mt-5">
      <h1 class="police my-3">Notre Podcast</h1>
      <div class="d-flex justify-content-center">
        <p class="mx-auto ">Découvrez le podcast captivant de Kartel, votre guide ultime vers l'art et la culture ! Plongez dans des épisodes riches en découvertes, où vous explorerez des sujets fascinants et rencontrerez des experts passionnés. Que vous soyez un amateur d'art ou simplement curieux, notre podcast vous offre une expérience immersive et enrichissante. Abonnez-vous dès maintenant et laissez-vous inspirer par le monde de l'art avec Kartel !</p>
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
      <SpotifyPodcast :urls="spotifyUrls" />
    </div>
</template>

<script setup>
import SpotifyPodcast from '~/components/SpotifyPodcast.vue';

const spotifyUrls = [
  'https://open.spotify.com/embed/episode/1s350RvbSj5Y5zdDMRIIyT?utm_source=generator',
  'https://open.spotify.com/embed/episode/4sKENexsoGBMjzmoNO7oYE?utm_source=generator',
  'https://open.spotify.com/embed/episode/1DzBCYMiULh3f21dzDLk5d?utm_source=generator',
  'https://open.spotify.com/embed/episode/3JNT7ucoSIkquwYGr1cdcC?utm_source=generator'
];
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
