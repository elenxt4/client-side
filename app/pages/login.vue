<template>
  <div class="max-w-md mx-auto">
    <div class="card">
      <h1 class="text-3xl font-bold text-center mb-8 text-orange-500">Login</h1>

      <div v-if="error" class="bg-red-900/50 border border-red-700 rounded-lg p-3 mb-4">
        <p class="text-red-300">{{ error }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :disabled="authStore.loading"
              placeholder="your@email.com"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
              v-model="form.password"
              type="password"
              required
              class="form-input"
              :disabled="authStore.loading"
              placeholder="Your password"
          >
        </div>

        <button
            type="submit"
            :disabled="authStore.loading"
            class="btn btn-primary w-full"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-800 text-gray-400">or</span>
          </div>
        </div>

        <button @click="loginWithBattleNet" class="btn btn-primary w-full mt-4">
          🎮 Login with Battle.net
        </button>
      </div>

      <p class="text-center mt-4 text-gray-400">
        Don't have an account?
        <NuxtLink to="/register" class="text-orange-500 hover:underline">
          Register here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
const config = useRuntimeConfig()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  error.value = ''

  const result = await authStore.login(form.value.email, form.value.password)

  if (result.success) {
    await navigateTo('/dashboard')
  } else {
    error.value = result.error
  }
}

const loginWithBattleNet = () => {
  window.location.href = `${config.public.apiBase}/api/v1/auth/battlenet`
}

// Redirect if already authenticated
watchEffect(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>