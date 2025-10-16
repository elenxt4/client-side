<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-orange-500">Dashboard</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- User Info Card -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">👤 User Info</h2>
        <div class="space-y-2 text-sm">
          <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
          <p><strong>Name:</strong> {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}</p>
          <p><strong>Role:</strong> {{ authStore.user?.role }}</p>
          <p><strong>Auth Method:</strong> Cookie-based 🍪</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">🎮 Quick Actions</h2>
        <div class="space-y-2">
          <button @click="testHello" :disabled="loading" class="btn btn-primary w-full text-sm">
            Test Hello API
          </button>
          <button @click="testProfile" :disabled="loading" class="btn btn-secondary w-full text-sm">
            Test Profile API
          </button>
          <NuxtLink to="/diablo3" class="btn btn-secondary w-full text-sm block text-center">
            Diablo 3 API Testing
          </NuxtLink>
        </div>
      </div>

      <!-- API Response -->
      <div v-if="apiResponse" class="card md:col-span-2 lg:col-span-1">
        <h2 class="text-xl font-semibold mb-4">📊 Last API Response</h2>
        <div class="bg-gray-900 p-3 rounded text-xs overflow-auto max-h-40">
          <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
        <button @click="apiResponse = null" class="btn btn-secondary w-full mt-2 text-xs">
          Clear Response
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const authStore = useAuthStore()
const api = useApi()

const apiResponse = ref(null)
const loading = ref(false)

const testHello = async () => {
  loading.value = true
  try {
    const response = await api.hello()
    apiResponse.value = response
  } catch (error: any) {
    apiResponse.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

const testProfile = async () => {
  loading.value = true
  try {
    const response = await api.profile()
    apiResponse.value = response
  } catch (error: any) {
    apiResponse.value = { error: error.message }
  } finally {
    loading.value = false
  }
}
</script>