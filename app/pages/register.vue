<template>
  <div class="max-w-md mx-auto">
    <div class="card">
      <h1 class="text-3xl font-bold text-center mb-8 text-orange-500">Register</h1>

      <div v-if="error" class="bg-red-900/50 border border-red-700 rounded-lg p-3 mb-4">
        <p class="text-red-300">{{ error }}</p>
      </div>

      <div v-if="success" class="bg-green-900/50 border border-green-700 rounded-lg p-3 mb-4">
        <p class="text-green-300">{{ success }}</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :disabled="loading"
              placeholder="your@email.com"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="form-input"
              :disabled="loading"
              placeholder="At least 6 characters"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">First Name</label>
          <input
              v-model="form.first_name"
              type="text"
              required
              class="form-input"
              :disabled="loading"
              placeholder="John"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Last Name</label>
          <input
              v-model="form.last_name"
              type="text"
              required
              class="form-input"
              :disabled="loading"
              placeholder="Doe"
          >
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-4 text-gray-400">
        Already have an account?
        <NuxtLink to="/login" class="text-orange-500 hover:underline">
          Login here
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

const form = ref({
  email: '',
  password: '',
  first_name: '',
  last_name: ''
})

const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  const result = await authStore.register(form.value)

  if (result.success) {
    success.value = 'Registration successful! Please login.'
    form.value = { email: '', password: '', first_name: '', last_name: '' }
  } else {
    error.value = result.error
  }

  loading.value = false
}

// Redirect if already authenticated
watchEffect(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>