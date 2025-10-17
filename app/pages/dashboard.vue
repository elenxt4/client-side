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
      <Button
        @click="testHello"
        :disabled="loading"
        label="Test Hello API"
        icon="pi pi-wave-pulse"
        severity="warning"
        class="w-full justify-center text-sm transition-transform duration-200 hover:scale-105"
      />
      <Button
        @click="testProfile"
        :disabled="loading"
        label="Test Profile API"
        icon="pi pi-id-card"
        severity="secondary"
        class="w-full justify-center text-sm transition-transform duration-200 hover:scale-105"
      />
          <NuxtLink to="/diablo3">
      <Button
        label="Diablo 3 API Testing"
        icon="pi pi-bolt"
        severity="help"
        class="w-full justify-center text-sm transition-transform duration-200 hover:scale-105"
      />
          </NuxtLink>
        </div>
      </div>

      <!-- API Response -->
      <div v-if="apiResponse" class="card md:col-span-2 lg:col-span-1">
        <h2 class="text-xl font-semibold mb-4">📊 Last API Response</h2>
        <div class="bg-gray-900 p-3 rounded text-xs overflow-auto max-h-40">
          <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
    <Button
      @click="apiResponse = null"
      label="Clear Response"
      icon="pi pi-times"
      severity="secondary"
      outlined
      class="w-full mt-2 text-xs transition-transform duration-200 hover:scale-105"
    />
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

const apiResponse = ref<unknown | null>(null)
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