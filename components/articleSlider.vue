<template>
    <div class="carousel">
        <h2>{{ categoryName }}</h2>
        <ClientOnly>
            <swiper-container ref="containerRef" class="sw">
                <swiper-slide v-for="(article, idx) in slides" :key="idx">
                    <NuxtLink :to="'/nos-articles/' + article.slug" class="card-link">
                        <div class="card mb-4 ">
                            <div class="image">
                                <!-- Affichage adaptatif des images en fonction de leur format -->
                                <template v-if="getImageSrc(article)">
                                    <img :src="getImageSrc(article)" class="card-img-top" :alt="article.title">
                                </template>
                                <template v-else>
                                    <!-- Image de remplacement si aucune image n'est disponible -->
                                    <div class="placeholder-image">
                                        <span>{{ article.title }}</span>
                                    </div>
                                </template>
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
import { ref, onMounted } from 'vue'
import { useArticles, type Article } from '~/composables/useArticles';

const props = defineProps<{
    categoryId: number;
    categoryName: string;
}>()

// Utilisation du composable pour récupérer les articles de Supabase
const { getArticlesByCategory } = useArticles();

// Référence pour le swiper
const containerRef = ref(null);
const slides = ref<Article[]>([]);

// Fonction pour obtenir l'URL de l'image en fonction du format des données
const getImageSrc = (article: Article): string | null => {
    // Vérifie si les images sont définies
    if (!article.images) return null;
    
    // Si images est une chaîne JSON, essayez de l'analyser
    if (typeof article.images === 'string') {
        try {
            const parsedImages = JSON.parse(article.images);
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                return parsedImages[0].src;
            }
        } catch (e) {
            console.error('Erreur lors de l\'analyse des images:', e);
        }
    }
    
    // Si images est déjà un tableau
    if (Array.isArray(article.images) && article.images.length > 0) {
        // Vérifier si c'est un tableau d'objets avec src
        if (article.images[0].src) {
            return article.images[0].src;
        }
        // Ou si c'est directement un tableau de chemins
        if (typeof article.images[0] === 'string') {
            return article.images[0];
        }
    }
    
    // Si images est un objet avec src
    if (typeof article.images === 'object' && article.images !== null && 'src' in article.images) {
        return article.images.src;
    }
    
    // Aucun format d'image reconnu
    return null;
};

// Charger les articles au montage du composant
onMounted(async () => {
    try {
        // Récupérer les articles de cette catégorie depuis Supabase
        const articlesData = await getArticlesByCategory(props.categoryId);
        
        // Log pour debug
        console.log('Format des images:', articlesData.length > 0 ? articlesData[0].images : 'Aucun article');
        
        slides.value = articlesData;
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
    }
});

// Configuration du swiper
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
}
.controls button {
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
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
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}
.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.placeholder-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-style: italic;
    text-align: center;
    padding: 1rem;
}
</style>