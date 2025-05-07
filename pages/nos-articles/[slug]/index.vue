<template>
    <div class="top-bar">
        <NuxtLink to="/nos-articles" class="back-link">← Retour aux articles</NuxtLink>
    </div>

    <div class="container">
        <div v-if="loading" class="loading text-center my-5">
            Chargement de l'article...
        </div>
        <div v-else-if="error" class="error text-center my-5">
            {{ error }}
        </div>
        <div v-else-if="article" class="contenu-article">
            <h1>{{ article.title }}</h1>
            <h2 v-if="article.author" class="author">
                Écrit par {{ article.author }}
            </h2>

            <div>
                <span v-if="getCategoryName(article)" class="category-badge"
                    :class="getCategoryClass(getCategoryName(article))">
                    {{ getCategoryName(article) }}
                </span>
            </div>

            <!-- Image principale -->
            <img v-if="getMainImage(article)" :src="getMainImage(article) ?? ''" class="img-fluid mt-4 d-block"
                :alt="article.title">

            <!-- Contenu de l'article -->
            <p class="content-article" v-html="article.content"></p>

            <!-- Images supplémentaires -->
            <div v-if="getAdditionalImages(article).length > 0" class="mt-4 ">
                <div class="row">
                    <div v-for="(imageSrc, index) in getAdditionalImages(article)" :key="index" class="otherimages">
                        <img :src="imageSrc" :alt="article.title">
                    </div>
                </div>
            </div>

            <!-- Vidéos YouTube associées -->
            <div v-if="hasYoutubeLinks">
                <h3 class="text-center">Vidéos associées</h3>
                <div class="video">
                    <div v-for="(link, index) in embedLinks" :key="index" class="video-wrapper">
                        <iframe :src="link" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="not-found text-center my-5">
            <h4>Article introuvable</h4>
            <p>Cet article n'existe pas ou a été supprimé.</p>
            <NuxtLink to="/nos-articles" class="btn btn-primary mt-3">Voir tous les articles</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';
import { useArticles, type Article, type Category } from '~/composables/useArticles';

// Récupérer le slug de l'article depuis l'URL
const route = useRoute();
const slug = route.params.slug as string;

// Utilisation du composable
const { loading, error, getArticleBySlug, getAllCategories } = useArticles();

// État pour l'article et les catégories
const article = ref<Article | null>(null);
const categories = ref<Category[]>([]);

// Fonction pour normaliser les liens YouTube
const normalizeYoutubeLinks = (article: Article): string[] => {
    // Vérifier si youtubeLinks existe et n'est pas null
    if (!article.youtubeLinks) {
        return [];
    }

    // Si youtubeLinks est déjà un tableau
    if (Array.isArray(article.youtubeLinks)) {
        return article.youtubeLinks.filter(link => link && typeof link === 'string' && link.trim() !== '');
    }

    // Si youtubeLinks est une chaîne de caractères (peut-être un JSON stringifié)
    if (typeof article.youtubeLinks === 'string') {
        try {
            const parsed = JSON.parse(article.youtubeLinks);
            if (Array.isArray(parsed)) {
                return parsed.filter(link => link && typeof link === 'string' && link.trim() !== '');
            }
        } catch (e) {
            // Si ce n'est pas un JSON valide, vérifier si c'est une URL unique
            const trimmed = article.youtubeLinks.trim();
            return trimmed ? [trimmed] : [];
        }
    }

    return [];
};

// Computed property pour vérifier si l'article a des liens YouTube valides
const hasYoutubeLinks = computed(() => {
    if (!article.value) return false;

    const normalizedLinks = normalizeYoutubeLinks(article.value);
    return normalizedLinks.length > 0;
});

// Computed property pour les liens YouTube en format d'embed
const embedLinks = computed(() => {
    if (!article.value) return [];

    const normalizedLinks = normalizeYoutubeLinks(article.value);

    return normalizedLinks.map(link => {
        // Convertir les URLs YouTube normales en URLs d'embed
        if (link.includes('youtube.com/watch?v=')) {
            const videoId = link.split('v=')[1]?.split('&')[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Déjà un lien d'embed
        if (link.includes('youtube.com/embed/')) {
            return link;
        }

        // Lien YouTube court (youtu.be)
        if (link.includes('youtu.be/')) {
            const videoId = link.split('youtu.be/')[1]?.split('?')[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Si aucun format reconnu, retourner le lien tel quel
        return link;
    });
});

// Fonction pour obtenir le nom de la catégorie
const getCategoryName = (article: Article): string => {
    // Si l'article a un objet catégorie avec un nom
    if (article.category && article.category.name) {
        return article.category.name;
    }

    // Sinon, chercher la catégorie par ID
    const category = categories.value.find(c => c.id === article.category_id);
    return category ? category.name : '';
};

// Fonction pour obtenir l'image principale
const getMainImage = (article: Article): string | null => {
    // Si images est un tableau
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

    return null;
};

// Fonction pour obtenir les images supplémentaires
const getAdditionalImages = (article: Article): string[] => {
    // Si images est un tableau
    if (Array.isArray(article.images) && article.images.length > 1) {
        // Vérifier si c'est un tableau d'objets avec src
        if (article.images[1].src) {
            return article.images.slice(1).map(img => img.src);
        }
        // Ou si c'est directement un tableau de chemins
        if (typeof article.images[1] === 'string') {
            return article.images.slice(1);
        }
    }

    return [];
};

// Formatage de la date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

// Déterminer la classe CSS en fonction de la catégorie
const getCategoryClass = (categoryName: string) => {
    if (!categoryName) return 'primary';

    const category = categories.value.find(c => c.name === categoryName);
    if (!category) return 'primary';

    const index = categories.value.indexOf(category);
    return index % 2 === 0 ? 'primary' : 'secondary';
};

// Au montage du composant
onMounted(async () => {
    try {
        // Charger toutes les catégories pour pouvoir déterminer la classe CSS
        categories.value = await getAllCategories();

        // Essayer de récupérer l'article depuis Supabase
        const supabaseArticle = await getArticleBySlug(slug);

        if (supabaseArticle) {
            // Si l'article existe dans Supabase, l'utiliser
            article.value = supabaseArticle;
            console.log('Article récupéré depuis Supabase:', supabaseArticle);
            // Afficher les liens youtube pour debug
            console.log('YouTube links:', normalizeYoutubeLinks(supabaseArticle));
        }
    } catch (err) {
        console.error(err);
    }
});

// Mettre à jour les méta-données de la page
watch(() => article.value, () => {
    if (article.value) {
        useHead({
            title: article.value.title || 'Article - Kartel',
            meta: [
                {
                    name: 'description',
                    content: article.value.description || 'Découvrez cet article sur Kartel'
                }
            ]
        });
    } else {
        useHead({
            title: 'Article introuvable - Kartel',
            meta: [
                {
                    name: 'description',
                    content: 'Cet article n\'existe pas.'
                }
            ]
        });
    }
}, { immediate: true });
</script>

<style scoped>
.container {
    margin-bottom: 56px;
}
.author {
    font-style: italic;
    color: gray;
}

.contenu-article {
    text-align: center;
}

.content-article {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 2rem 0;
    text-align: justify;
}

.top-bar {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 2rem;
    margin-top: 1rem;

    .back-link {
        color: #2828ab;
        text-decoration: none;
        font-weight: 500;
    }
}

.video {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    .video-wrapper {
        max-width: 560px;
        width: 100%;
        margin: 0 auto;
        text-align: center;

        iframe {
            width: 100%;
            height: 315px;
            border-radius: 10px;
        }
    }
}

.img-fluid {
    float: left;
    max-width: 33%;
    height: auto;
    border-radius: 10px;
    margin-right: 2rem;
}
.otherimages {
    max-width: 50%;
    height: auto;
    border-radius: 10px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 2rem;

    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
}

.category-badge {
    display: inline-block;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: 1rem;
}

.category-badge.primary {
    background-color: #2828ab;
    /* Bleu foncé */
    color: white;
}

.category-badge.secondary {
    background-color: #f5d742;
    /* Jaune */
    color: black;
}

.date {
    color: #666;
    font-size: 0.9rem;
}

.loading,
.error,
.not-found {
    margin: 3rem 0;
}

.error {
    color: #e74c3c;
}
</style>