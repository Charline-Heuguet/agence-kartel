<template>
    <div class="login-container">
        <div class="login-form">
            <h1>Espace admin</h1>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="Email administrateur" required />
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" v-model="password" placeholder="Mot de passe" required />
                </div>

                <button type="submit" :disabled="loading">
                    {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

// Autoriser uniquement l'utilisateur admin
const ADMIN_EMAIL = 'agencekartel@gmail.com'

const handleLogin = async () => {
    // Vérifier si l'email est celui de l'admin
    if (email.value !== ADMIN_EMAIL) {
        errorMessage.value = 'Seul un administrateur peut se connecter.'
        return
    }

    loading.value = true
    errorMessage.value = ''

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) throw error

        // Connexion réussie, rediriger vers l'index de l'espace admin
        router.push('/espace-admin')
    } catch (error: any) {
        errorMessage.value = error.message || 'Erreur lors de la connexion'
    } finally {
        loading.value = false
    }
}

useHead({
    title: 'Connexion Espace Admin',
    meta: [
        {
            name: 'description',
            content: 'Connexion à l\'espace d\'administration'
        }
    ]
})
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
}


h1 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #4338ca;
}

button:disabled {
    background-color: #a5a5a5;
    cursor: not-allowed;
}

.error-message {
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #fee2e2;
    color: #ef4444;
    border-radius: 4px;
    font-size: 0.875rem;
}
</style>