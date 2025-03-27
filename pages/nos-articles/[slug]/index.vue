<template>
    <div class="container">
        <div v-if="article">
            <h1 class="text-center my-4">{{ article.title }}</h1>
            <h6 class="text-muted text-center">Écrit par {{ article.author }} - {{ article.role }}</h6>

            <img v-if="article.images.length > 0" :src="article.images[0].src" class="img-fluid my-4 mx-auto d-block" :alt="article.images[0].title">
            <p>{{ article.images[0].title }}</p>


            <p class="lead" v-html="article.content"></p>

            <div v-if="article.images.length > 0" class="mt-4">
                <div class="row">
                    <div v-for="(image, index) in article.images" :key="index" class="col-md-6 text-center">
                        <img :src="image.src" class="img-fluid" :alt="image.title">
                        <p class="mt-2">{{ image.title }}</p>
                    </div>
                </div>
            </div>

            <div v-if="article.youtubeLinks.length > 0" class="mt-4">
                <h4>Vidéos associées</h4>
                <div class="row">
                    <div v-for="(link, index) in article.youtubeLinks" :key="index" class="col-md-6">
                        <iframe :src="link" frameborder="0" allowfullscreen class="w-100"
                            style="height: 300px;"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <h2 class="text-center">Article introuvable</h2>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import articles from '~/content/articles';

const route = useRoute();
// Find the article by its slug
// explication: on cherche l'article qui a le même slug que celui passé en paramètre dans l'url
// et on le stocke dans la variable article, puis on l'exploite dans le template
const article = articles.find(a => a.slug === route.params.slug);

useHead({
    title: article ? article.title : 'Article introuvable',
    meta: [
        {
            name: 'description',
            content: article ? article.description : 'Cet article n\'existe pas.'
        }
    ]
});
</script>

<style scoped>
.img-fluid {
    max-width: 50%;
    height: auto;
    border-radius: 10px;
}
</style>