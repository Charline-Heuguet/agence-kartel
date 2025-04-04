<template>
    <div class="article-form">
        <h1>{{ isEditing ? 'Modifier' : 'Créer' }} un article</h1>

        <form @submit.prevent="submitArticle">
            <div class="form-group">
                <label>Titre</label>
                <input placeholder="Titre" v-model="articleForm.title" type="text" required @input="generateSlug">
            </div>

            <div class="form-group">
                <label>Auteur</label>
                <input placeholder="Auteur / autrice" v-model="articleForm.author" type="text" required>
            </div>

            <div class="form-group">
                <label>Catégorie</label>
                <select v-model="articleForm.category_id">
                    <option disabled value="" selected>Catégorie</option>

                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="La description doit être un résumé de votre article."
                    v-model="articleForm.description" required></textarea>
            </div>
            <!-- TipTap Editor -->
            <div class="form-group">
                <label>Contenu de l'article</label>

                <!-- Barre d'outils richtext-->
                <div class="editor-toolbar">
                    <button type="button" @click="editor.chain().focus().toggleBold().run()">
                        <strong>Gras</strong>
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleItalic().run()">
                        <em>Italique</em>
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleBulletList().run()">
                        • Liste à puces
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleOrderedList().run()">
                        1. Liste numérotée
                    </button>
                </div>

                <EditorContent :editor="editor" class="editor" />
            </div>
            <!-- IMAGES -->
            <div class="form-group">
                <label>Photos / images illustrants votre article</label>
                <input type="file" multiple accept="image/*" @change="handleImageUpload">
                <small>Photos / images illustrants votre article, 5 images max et pesant moins de 2Mo.</small>
                <small>Vous pouvez les convertir en .webp sur <NuxtLink to="https://convertio.co/fr/jpg-webp/">Convertio
                    </NuxtLink></small>
                <!-- Affichage des images existantes en mode édition -->
                <div v-if="isEditing && articleForm.images && articleForm.images.length">
                    <p>Images existantes :</p>
                    <ul>
                        <li v-for="(imgUrl, index) in articleForm.images" :key="`existing-${index}`">
                            <img :src="imgUrl" :alt="'Image existante ' + (index + 1)" width="100">
                            <button class="remove" type="button" @click="removeExistingImage(index)">Supprimer cette
                                image</button>
                        </li>
                    </ul>
                </div>
                <!-- Affichage des images sélectionnées avant l'upload -->
                <div v-if="selectedImages.length">
                    <p>Images sélectionnées :</p>
                    <ul>
                        <li v-for="(img, index) in selectedImages" :key="index">
                            <img :src="img.preview" :alt="'Image ' + (index + 1)" width="100">
                            <button class="remove" type="button" @click="removeImage(index)">Supprimer cette
                                image</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Lien YouTube -->
            <div class="form-group">
                <label>Lien YouTube (optionnel)</label>
                <div class="yt-link">
                    <input v-model="youtubeLink" type="text" placeholder="Collez un lien YouTube (optionnel)">
                    <button class="add" type="button" @click="addYoutubeLink">+</button>
                </div>

                <!-- Partie modifiée pour s'assurer que les liens sont correctement affichés -->
                <div v-if="articleForm.youtubeLinks && articleForm.youtubeLinks.length" class="youtube-links">
                    <p>Liens ajoutés :</p>
                    <ul>
                        <li v-for="(link, index) in getYoutubeLinksArray()" :key="index">
                            <a :href="link" target="_blank" rel="noopener noreferrer">{{ link }}</a>
                            <button class="remove" type="button" @click="removeYoutubeLink(index)">x</button>
                        </li>
                    </ul>
                </div>
            </div>

            <button class="submit-button" type="submit">
                {{ isEditing ? 'Mettre à jour' : 'Publier' }} l'article
            </button>
        </form>

        <!-- Modale -->
        <div class="show-modal" v-if="showModal">
            <div class="pop-modal">
                <h2 style="margin-top: 0;">Article {{ isEditing ? 'mis à jour' : 'enregistré' }} !</h2>
                <p>Redirection en cours vers la liste des articles.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useRouter } from 'vue-router'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import slugify from 'slugify'

const showModal = ref(false)
const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const uploadProgress = ref(0)
const selectedImages = ref([]) // Stocke les images sélectionnées avant upload
const props = defineProps({
    articleId: {
        type: Number,
        default: null
    }
})

const isEditing = computed(() => props.articleId !== null)
const categories = ref([])
const youtubeLink = ref('')

const articleForm = ref({
    title: '',
    slug: '',
    author: user.value?.email || '',
    description: '',
    content: '',
    category_id: '',
    images: [],
    youtubeLinks: []
})

// Initialisation de TipTap (richtext)
const editor = ref(null)


// GESTION DES IMAGES
const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    console.log("Fichiers sélectionnés :", files) // Vérifie si les fichiers sont bien détectés
    files.forEach(file => {
        selectedImages.value.push({
            file,
            preview: URL.createObjectURL(file) // Génère une prévisualisation
        })
    })
}

// Supprimer une image de la sélection avant upload
const removeImage = (index) => {
    selectedImages.value.splice(index, 1)
}

// Supprimer une image existante (pour le mode édition)
const removeExistingImage = (index) => {
    if (articleForm.value.images) {
        articleForm.value.images.splice(index, 1)
    }
}

const uploadImagesToSupabase = async () => {
    uploadProgress.value = 0
    const newImages = [...(articleForm.value.images || [])] // Conserver les images existantes en mode édition

    try {
        const uploadPromises = selectedImages.value.map(async (imageObj, index) => {
            const file = imageObj.file
            const fileExt = file.name.split('.').pop()
            const fileName = `article-${Date.now()}-${index}.${fileExt}` // Pas besoin de user.id

            // Uploader dans Supabase Storage
            const { data, error } = await supabase.storage
                .from('article-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw error

            // Récupérer l'URL publique
            const imageUrl = supabase.storage.from('article-images').getPublicUrl(fileName).data.publicUrl
            return imageUrl
        })

        // Attendre tous les uploads et stocker les URLs
        const uploadedImages = await Promise.all(uploadPromises)
        articleForm.value.images = [...newImages, ...uploadedImages]

        uploadProgress.value = 100 // Fin du téléchargement
    } catch (error) {
        console.error(' Erreur lors du chargement des images', error)
    }
}

// GESTION DES LIENS YOUTUBE

// Fonction pour s'assurer que youtubeLinks est bien un tableau de chaînes
const getYoutubeLinksArray = () => {
  // Si youtubeLinks est déjà un tableau, le retourner
  if (Array.isArray(articleForm.value.youtubeLinks)) {
    return articleForm.value.youtubeLinks;
  }
  
  // Si youtubeLinks est une chaîne, essayer de la parser comme JSON
  if (typeof articleForm.value.youtubeLinks === 'string') {
    try {
      const parsed = JSON.parse(articleForm.value.youtubeLinks);
      return Array.isArray(parsed) ? parsed : [articleForm.value.youtubeLinks];
    } catch (e) {
      // Si le parsing échoue, considérer la chaîne comme un lien unique
      return [articleForm.value.youtubeLinks];
    }
  }
  
  // Si youtubeLinks est undefined ou null, retourner un tableau vide
  return [];
}

// Ajouter un lien YouTube
const addYoutubeLink = () => {
  if (!youtubeLink.value) return;

  const links = getYoutubeLinksArray();
  links.push(youtubeLink.value);
  articleForm.value.youtubeLinks = links;

  // Vider l'input
  youtubeLink.value = '';
}

// Fonction pour supprimer un lien
const removeYoutubeLink = (index) => {
  const links = getYoutubeLinksArray();
  links.splice(index, 1);
  articleForm.value.youtubeLinks = links;
}

// Nettoyer l'éditeur en quittant la page
onBeforeUnmount(() => {
    if (editor.value) editor.value.destroy()
})

// Générer un slug
const generateSlug = () => {
    articleForm.value.slug = slugify(articleForm.value.title, { lower: true, strict: true })
}

// Récupérer les catégories depuis Supabase
const fetchCategories = async () => {
    const { data, error } = await supabase.from('Category').select('*')
    if (error) {
        console.error("Erreur lors du chargement des catégories :", error)
        return
    }
    categories.value = data || [] // Assurer que categories.value est toujours un tableau
}

// Charger l'article si on est en mode édition
const fetchArticle = async () => {
    if (!props.articleId) return
    
    const { data, error } = await supabase
        .from('Article')
        .select('*')
        .eq('id', props.articleId)
        .single()

    if (error) {
        console.error("Erreur lors du chargement de l'article :", error)
        return
    }

    if (data) {
        // S'assurer que les tableaux sont initialisés même s'ils sont null dans les données
        articleForm.value = {
            ...data,
            images: data.images || [],
            youtubeLinks: data.youtubeLinks || []
        }
        
        // Charger le contenu dans TipTap
        if (editor.value && data.content) {
            editor.value.commands.setContent(data.content || '')
        }
    }
}

// Soumettre l'article
const submitArticle = async () => {
    await uploadImagesToSupabase() // Upload les images avant d'enregistrer l'article

    const articleData = {
        ...articleForm.value
    }
    
    // Ajouter created_at seulement en mode création
    if (!isEditing.value) {
        articleData.created_at = new Date().toISOString()
    }

    let error
    if (isEditing.value) {
        ({ error } = await supabase.from('Article').update(articleData).eq('id', props.articleId))
    } else {
        ({ error } = await supabase.from('Article').insert(articleData))
    }
    
    if (error) {
        console.error('Erreur ajout article:', error)
        alert(`Erreur: ${error.message}`)
    }
    else {
        console.log('Affichage de la modale')
        showModal.value = true
        //Réinitialiser le formulaire après soumission
        selectedImages.value = []
        
        // ✅ Rediriger après 3 secondes
        setTimeout(() => {
            router.push("/espace-admin")
        }, 3000)
    }
}

onMounted(() => {
    editor.value = new Editor({
        content: articleForm.value.content, // Charger le contenu initial
        extensions: [
            StarterKit,
            Link
        ],
        onUpdate: ({ editor }) => {
            articleForm.value.content = editor.getHTML() // Stockage en HTML
        }
    })

    // Charger les catégories
    fetchCategories()

    // Charger l'article en mode édition
    if (isEditing.value) fetchArticle()
})

useHead({
    title: `Espace Admin - ${isEditing.value ? 'Modification' : 'Création'} d'article`,
    meta: [
        {
            name: 'description',
            content: `${isEditing.value ? 'Modifiez' : 'Créez'} un article!`
        }
    ]
})
</script>

<style scoped>
.article-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    
    .show-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999999;
        display: flex;
        justify-content: center;
        align-items: center;

        .pop-modal {
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 360px;
            text-align: center;
            z-index: 1000000;
        }
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        a {
            color: inherit;
            text-decoration: none;
        }

        .remove {
            color: red;
            border: none;
            background: none;
        }

        .add {
            width: 42px;
            height: 42px;
            border-radius: 42px;
            padding: 3px 10px;
            border: none;
            background-color: #aaa;
        }

        li {
            list-style: none;
        }

        label {
            visibility: hidden;
        }

        input,
        textarea,
        select {
            width: 60%;
            padding: 8px;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 3px;
        }

        .yt-link {
            display: flex;
            width: 90%;
            margin: 0 auto;
        }

    }

    .submit-button {
        padding: 12px;
        background-color: #f6dc75;
        color: #212ea5;

        font-weight: bold;
        border: none;
        border-radius: 5px;
    }

    .submit-button:hover {
        background-color: #212ea5;
        color: white;
    }
}

/* RichText */
.editor {
    border: 1px solid #ddd;
    min-height: 200px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
}

.editor-toolbar {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 10px;

    button {
        background: #f0f0f0;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 16px;
        border-radius: 4px;
    }
}
</style>