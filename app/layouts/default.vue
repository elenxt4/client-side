<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-gray-800 border-b border-orange-500">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="text-2xl font-bold text-orange-500">
            🎮 Diablo III Tester
          </NuxtLink>

          <div class="flex items-center space-x-4">
            <template v-if="authStore.isAuthenticated">
              <NuxtLink to="/dashboard" class="nav-link">Dashboard</NuxtLink>
              <NuxtLink to="/diablo3" class="nav-link">Diablo 3 API</NuxtLink>
              <span class="text-gray-300">{{ authStore.user?.first_name }}</span>
              <button @click="authStore.logout()" class="btn btn-secondary">
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
              <NuxtLink to="/register" class="nav-link">Register</NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

// Check auth on mount
onMounted(async () => {
  await authStore.checkAuth()
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-300 hover:text-orange-500 px-3 py-2 rounded transition-colors;
}
</style>