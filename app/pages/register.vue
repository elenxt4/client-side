<template>
  <div class="max-w-md mx-auto">
    <Card>
      <template #title>
        <span class="text-3xl font-bold text-orange-500">Register</span>
      </template>
      <template #content>
        <Message v-if="error" severity="error" :closable="false" class="mb-4">
          {{ error }}
        </Message>

        <Message v-if="success" severity="success" :closable="false" class="mb-4">
          {{ success }}
        </Message>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <InputText
                v-model="form.email"
                type="email"
                required
                :disabled="loading"
                placeholder="your@email.com"
                class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <Password
                v-model="form.password"
                required
                :disabled="loading"
                placeholder="At least 6 characters"
                toggleMask
                :feedback="false"
                inputClass="w-full"
                class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">First Name</label>
            <InputText
                v-model="form.first_name"
                type="text"
                required
                :disabled="loading"
                placeholder="John"
                class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Last Name</label>
            <InputText
                v-model="form.last_name"
                type="text"
                required
                :disabled="loading"
                placeholder="Doe"
                class="w-full"
            />
          </div>

          <Button
              type="submit"
              :disabled="loading"
              :label="loading ? 'Registering...' : 'Register'"
              icon="pi pi-user-plus"
              severity="warning"
              class="w-full justify-center"
          />
        </form>

        <p class="text-center mt-4 text-gray-400">
          Already have an account?
          <NuxtLink to="/login" class="text-orange-500 hover:underline">
            Login here
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
    error.value = result.error ?? ''
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