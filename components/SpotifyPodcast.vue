<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div v-for="(url, index) in urls" :key="index" class="col-12 col-md-6 d-flex p-3">
      <iframe
        style="border-radius:12px"
        :src="url"
        width="100%"
        height="152"
        frameborder="0"
        allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
defineProps({
urls: {
  type: Array,
  required: true
}
});
</script>

