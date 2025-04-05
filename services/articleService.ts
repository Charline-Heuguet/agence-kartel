// services/articleService.ts
import { useSupabaseClient } from '#imports';

// Types pour notre application
export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  slug: string;
  images: { src: string; alt: string; title?: string }[];
  youtubeLinks?: string[];
  author?: string;
  role?: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

/**
 * Récupère tous les articles publiés
 */
export const getPublishedArticles = async (): Promise<Article[]> => {
  try {
    const supabase = useSupabaseClient();
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }

    return data as Article[];
  } catch (err) {
    console.error('Exception when fetching articles:', err);
    return [];
  }
};

/**
 * Récupère les articles publiés d'une catégorie spécifique
 */
export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const supabase = useSupabaseClient();
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching articles for category ${category}:`, error);
      return [];
    }

    return data as Article[];
  } catch (err) {
    console.error(`Exception when fetching articles for category ${category}:`, err);
    return [];
  }
};

/**
 * Récupère un article spécifique par son slug
 */
export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const supabase = useSupabaseClient();
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error(`Error fetching article ${slug}:`, error);
      return null;
    }

    return data as Article;
  } catch (err) {
    console.error(`Exception when fetching article ${slug}:`, err);
    return null;
  }
};

/**
 * Récupère toutes les catégories qui ont au moins un article publié
 */
export const getActiveCategories = async (): Promise<string[]> => {
  try {
    const articles = await getPublishedArticles();
    
    // Si aucun article n'est trouvé, retourner un tableau vide
    if (articles.length === 0) {
      return [];
    }
    
    // Extraire toutes les catégories des articles publiés
    const categoriesSet = new Set(articles.map(article => article.category));
    
    // Convertir le Set en array et trier par ordre alphabétique
    return Array.from(categoriesSet).sort();
  } catch (err) {
    console.error('Exception when fetching categories:', err);
    return [];
  }
};