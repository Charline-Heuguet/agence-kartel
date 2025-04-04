// composables/useSpotifyShow.ts
import { ref } from 'vue'

export const useSpotifyShow = () => {
  const episodeUrls = ref<string[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  // Idéalement, ces valeurs devraient être dans des variables d'environnement
  const clientId = '60aff7cf9e524628be7ff9c8fadad049'
  const clientSecret = '71d823ded6c64037889e8e2f3f13cf3e'

  const getClientToken = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials'
        })
      })
      
      const data = await response.json()
      return data.access_token
    } catch (err) {
      console.error("Erreur lors de l'obtention du token:", err)
      error.value = "Impossible de se connecter à Spotify"
      return null
    }
  }

  const fetchShowEpisodes = async (showId: string) => {
    try {
      isLoading.value = true
      
      const token = await getClientToken()
      if (!token) return
      
      const response = await fetch(`https://api.spotify.com/v1/shows/${showId}/episodes?limit=4&market=FR`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        // Transformer les ID d'épisodes en URLs d'embed
        episodeUrls.value = data.items.map((episode: any) => 
          `https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator`
        )
      } else {
        error.value = "Aucun épisode trouvé"
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des épisodes:", err)
      error.value = "Erreur lors du chargement des épisodes"
    } finally {
      isLoading.value = false
    }
  }

  return {
    episodeUrls,
    isLoading,
    error,
    fetchShowEpisodes
  }
}