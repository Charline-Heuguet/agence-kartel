// composables/useArticles.ts
import { ref } from 'vue';
import { useSupabaseClient } from '#imports';

// Types pour notre application
export interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  description: string;
  images: any; // Type flexible pour gérer différents formats d'images
  youtubeLinks: string;
  created_at: string;
  category_id: number;
  content: string;
  // Champs supplémentaires pour joindre avec la catégorie
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
}

export const useArticles = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  /**
   * Traite un article pour normaliser les données, surtout les images
   */
  const processArticle = (article: any): Article => {
    // Si images est une chaîne, essayons de la parser comme JSON
    if (typeof article.images === 'string') {
      try {
        article.images = JSON.parse(article.images);
      } catch (e) {
        console.error(`Erreur de parsing JSON pour les images de l'article ${article.id}:`, e);
        // Garder la chaîne comme elle est si elle ne peut pas être parsée
      }
    }
    
    return article as Article;
  };
  
  /**
   * Récupère tous les articles publiés avec leurs catégories
   */
  const getPublishedArticles = async (): Promise<Article[]> => {
    try {
      loading.value = true;
      error.value = null;
      
      const supabase = useSupabaseClient();
      
      // Récupérer les articles avec leur catégorie associée
      const { data, error: supabaseError } = await supabase
        .from('Article')
        .select(`
          *,
          category:Category(id, name)
        `)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Error fetching articles:', supabaseError);
        error.value = 'Impossible de récupérer les articles';
        return [];
      }

      // Traiter chaque article pour normaliser les données
      return data ? data.map(processArticle) : [];
    } catch (err) {
      console.error('Exception when fetching articles:', err);
      error.value = 'Une erreur est survenue';
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère les articles d'une catégorie spécifique
   */
  const getArticlesByCategory = async (categoryId: number): Promise<Article[]> => {
    try {
      loading.value = true;
      error.value = null;
      
      const supabase = useSupabaseClient();
      
      const { data, error: supabaseError } = await supabase
        .from('Article')
        .select(`
          *,
          category:Category(id, name)
        `)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error(`Error fetching articles for category ${categoryId}:`, supabaseError);
        error.value = `Impossible de récupérer les articles de la catégorie ${categoryId}`;
        return [];
      }

      // Traiter chaque article pour normaliser les données
      return data ? data.map(processArticle) : [];
    } catch (err) {
      console.error(`Exception when fetching articles for category ${categoryId}:`, err);
      error.value = 'Une erreur est survenue';
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère un article spécifique par son slug
   */
  const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    try {
      loading.value = true;
      error.value = null;
      
      const supabase = useSupabaseClient();
      
      const { data, error: supabaseError } = await supabase
        .from('Article')
        .select(`
          *,
          category:Category(id, name)
        `)
        .eq('slug', slug)
        .single();

      if (supabaseError) {
        console.error(`Error fetching article ${slug}:`, supabaseError);
        error.value = `Impossible de récupérer l'article ${slug}`;
        return null;
      }

      // Traiter l'article pour normaliser les données
      return data ? processArticle(data) : null;
    } catch (err) {
      console.error(`Exception when fetching article ${slug}:`, err);
      error.value = 'Une erreur est survenue';
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère toutes les catégories qui ont au moins un article
   */
  const getActiveCategories = async (): Promise<Category[]> => {
    try {
      loading.value = true;
      error.value = null;
      
      const supabase = useSupabaseClient();
      
      // Cette requête utilise un count pour voir quelles catégories ont des articles
      const { data, error: supabaseError } = await supabase
        .from('Category')
        .select(`
          id, 
          name,
          articles:Article(count)
        `)
        .order('name');

      if (supabaseError) {
        console.error('Error fetching categories:', supabaseError);
        error.value = 'Impossible de récupérer les catégories';
        return [];
      }

      // Ne garder que les catégories qui ont au moins un article
      const activeCategories = data ? data.filter(cat => {
        return cat.articles && cat.articles.length > 0 && cat.articles[0].count > 0;
      }) : [];

      return activeCategories;
    } catch (err) {
      console.error('Exception when fetching categories:', err);
      error.value = 'Impossible de récupérer les catégories';
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère toutes les catégories
   */
  const getAllCategories = async (): Promise<Category[]> => {
    try {
      loading.value = true;
      error.value = null;
      
      const supabase = useSupabaseClient();
      
      const { data, error: supabaseError } = await supabase
        .from('Category')
        .select('*')
        .order('name');

      if (supabaseError) {
        console.error('Error fetching all categories:', supabaseError);
        error.value = 'Impossible de récupérer les catégories';
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Exception when fetching all categories:', err);
      error.value = 'Une erreur est survenue';
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    getPublishedArticles,
    getArticlesByCategory,
    getArticleBySlug,
    getActiveCategories,
    getAllCategories
  };
};