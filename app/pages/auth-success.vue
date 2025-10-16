<template>
  <div class="max-w-md mx-auto text-center">
    <div class="card">
      <h1 class="text-3xl font-bold mb-4 text-green-500">🎉 Success!</h1>
      <p class="text-gray-300 mb-6">
        You have been successfully authenticated with Battle.net!
      </p>

      <div class="space-y-4">
        <button @click="goToDashboard" class="btn btn-primary w-full">
          Go to Dashboard
        </button>
        <NuxtLink to="/diablo3" class="btn btn-secondary w-full">
          Test Diablo 3 API
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()

const goToDashboard = () => {
  navigateTo('/dashboard')
}

onMounted(async () => {
  // Check auth status after OAuth
  await authStore.checkAuth()
})
</script>