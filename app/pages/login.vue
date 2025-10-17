<template>
  <div class="max-w-md mx-auto">
    <Card>
      <template #title>
        <span class="text-3xl font-bold text-orange-500">Login</span>
      </template>
      <template #content>
        <Message v-if="error" severity="error" :closable="false">
          {{ error }}
        </Message>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <InputText
                v-model="form.email"
                type="email"
                required
                :disabled="authStore.loading"
                placeholder="your@email.com"
                class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <Password
                v-model="form.password"
                required
                :disabled="authStore.loading"
                placeholder="Your password"
                :feedback="false"
                toggleMask
                inputClass="w-full"
                class="w-full"
            />
          </div>

      <Button
        type="submit"
        :disabled="authStore.loading"
        :label="authStore.loading ? 'Logging in...' : 'Login'"
        icon="pi pi-sign-in"
        severity="warning"
        class="w-full justify-center transition-transform duration-200 hover:scale-105"
      />
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

      <Button
        @click="loginWithBattleNet"
        label="Login with Battle.net"
        icon="pi pi-discord"
        severity="info"
        class="w-full justify-center mt-4 transition-transform duration-200 hover:scale-105"
      />
        </div>

        <p class="text-center mt-4 text-gray-400">
          Don't have an account?
          <NuxtLink to="/register" class="text-orange-500 hover:underline">
            Register here
          </NuxtLink>
        </p>
      </template>
    </Card>
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
    error.value = result.error ?? 'An unknown error occurred.'
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