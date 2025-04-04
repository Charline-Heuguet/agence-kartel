export default defineNuxtRouteMiddleware(async (to, from) => {
    // Ne pas appliquer le middleware à la page de login
    if (to.path === '/espace-admin/login') {
      return
    }
    
    const supabase = useSupabaseClient()
    const { data } = await supabase.auth.getSession()
    
    // Vérifier si l'utilisateur est connecté
    if (!data.session) {
      return navigateTo('/espace-admin/login')
    }
    
    // Vérifier si l'email est celui de l'admin
    const currentUser = data.session.user
    if (currentUser.email !== 'agencekartel@gmail.com') {
      // Déconnecter l'utilisateur s'il n'est pas admin
      await supabase.auth.signOut()
      return navigateTo('/espace-admin/login')
    }
  })