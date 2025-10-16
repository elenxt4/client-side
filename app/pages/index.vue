<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-8 text-orange-500">
      🎮 Diablo III API Tester
    </h1>

    <p class="text-xl text-gray-300 mb-8">
      Test your Diablo III Community API integration with Battle.net OAuth
    </p>

    <div class="max-w-md mx-auto space-y-4">
      <template v-if="authStore.isAuthenticated">
        <div class="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
          <h3 class="text-green-400 font-semibold mb-2">✅ Welcome back!</h3>
          <p class="text-sm text-gray-300">
            You're logged in as {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
          </p>
        </div>

        <NuxtLink to="/dashboard" class="btn btn-primary w-full block text-center">
          Go to Dashboard
        </NuxtLink>
        <NuxtLink to="/diablo3" class="btn btn-secondary w-full block text-center">
          Test Diablo 3 API
        </NuxtLink>
      </template>
      <template v-else>
        <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
          <h3 class="text-orange-400 font-semibold mb-2">🔐 Get Started</h3>
          <p class="text-sm text-gray-300">
            Login or register to test the Diablo III Community API
          </p>
        </div>

        <NuxtLink to="/login" class="btn btn-primary w-full block text-center">
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="btn btn-secondary w-full block text-center">
          Register
        </NuxtLink>

        <div class="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <h4 class="text-blue-400 font-medium mb-2">🎮 Features</h4>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• Battle.net OAuth Integration</li>
            <li>• Diablo III Community API Testing</li>
            <li>• Cookie-based Authentication</li>
            <li>• Real-time API Response Viewer</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
</script>