<template>
    <div class="carousel">
        <h2>{{ category.category }}</h2>
        <ClientOnly>
            <swiper-container ref="containerRef" class="sw">
                <swiper-slide v-for="(article, idx) in slides" :key="idx">
                    <NuxtLink :to="'/nos-articles/' + article.slug" class="card-link">
                        <div class="card mb-4 ">
                            <div class="image">
                                <img v-if="article.images.length > 0" :src="article.images[0].src" class="card-img-top"
                                    alt="Image de l'article">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{ article.title }}</h5>
                                <p class="card-text">{{ article.description }}</p>
                                <span class="read-more">Voir la suite →</span>
                            </div>
                        </div>
                    </NuxtLink>
                </swiper-slide>
            </swiper-container>
        </ClientOnly>
        <!-- Visibles que s'il y a plus d'un article -->
        <div v-if="slides.length > 3" class="controls">
            <!-- Go back one slide -->
            <button @click="swiper.prev()">
                Prev
            </button>
            <!-- Go forward one slide -->
            <button @click="swiper.next()">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSwiper } from '#imports'
import articles from '~/content/articles';
import { ref } from 'vue'

const category = defineProps<{
    category: string
}>()

// Filtrer les articles de la catégorie unique
const articleCategory = articles.filter(article => article.category === category.category);

const containerRef = ref(null)
const slides = ref(articleCategory)
const swiper = useSwiper(containerRef, {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 100,
    },
    breakpoints: {
        640: {
            slidesPerView: 1.3,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 2.3,
            spaceBetween: 50,
        },
        1400: {
            slidesPerView: 2.8,
            spaceBetween: 60,
        },
    },
    
})
</script>

<style scoped lang="css">
h2 {
    text-align: start;
}
.card-link:hover h5 {
        text-decoration: underline;

}
.carousel {
    margin-bottom: 50px;
    width: 900px;
    max-width: 100%;
    overflow: hidden;
    margin: 0 auto;
}
.controls {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    button {
        border: none;
        padding: 10px 20px;
        margin: 0 10px;
        cursor: pointer;
    }
}

swiper-container {
    display: block;
    margin: 0 auto;
    overflow: hidden;
}

swiper-slide {
    display: block;
    width: auto;
}

.image {
    height: 200px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>