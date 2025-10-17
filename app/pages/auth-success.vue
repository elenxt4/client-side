<template>
  <div class="max-w-md mx-auto text-center">
    <Card class="mb-0">
      <template #title>
        <span class="text-3xl font-bold text-green-500">🎉 Success!</span>
      </template>
      <template #content>
        <p class="text-gray-300 mb-6">
          You have been successfully authenticated with Battle.net!
        </p>
        <div class="space-y-4">
          <Button 
            @click="goToDashboard" 
            label="Go to Dashboard" 
            icon="pi pi-th-large" 
            severity="warning" 
            class="w-full transition-transform duration-200 hover:scale-105" 
          />
          <NuxtLink to="/diablo3">
            <Button 
              label="Test Diablo 3 API" 
              icon="pi pi-bolt" 
              severity="secondary" 
              class="w-full transition-transform duration-200 hover:scale-105" 
            />
          </NuxtLink>
        </div>
      </template>
    </Card>
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