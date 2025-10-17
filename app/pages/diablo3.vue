<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-orange-500">⚔️ Diablo 3 API</h1>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- API Actions -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">🎮 API Actions</h2>
        <div class="space-y-3">
          <Button
            label="Test Access Token"
            icon="pi pi-key"
            severity="warning"
            class="w-full justify-center transition-transform duration-200 hover:scale-105"
            :disabled="loading"
            @click="testToken"
          />

          <Button
            label="Get My Profile"
            icon="pi pi-user"
            severity="info"
            class="w-full justify-center transition-transform duration-200 hover:scale-105"
            :disabled="loading"
            @click="getProfile"
          />

            <Button
              label="Get Acts"
              icon="pi pi-list"
              severity="secondary"
              class="w-full justify-center transition-transform duration-200 hover:scale-105"
              :disabled="loading"
              @click="getActs"
            />


          <div class="pt-4 border-t border-gray-700">
            <label class="block text-sm font-medium mb-2">Get Specific Act:</label>
            <div class="flex gap-2">
              <InputNumber
                  v-model="actId"
                  placeholder="Act ID (1-5)"
                  :min="1"
                  :max="5"
                  showButtons
                  class="flex-1"
              />
              <Button
                label="Get Act"
                icon="pi pi-search"
                severity="success"
                class="transition-transform duration-200 hover:scale-105"
                :disabled="loading || !actId"
                @click="getSpecificAct"
              />

            </div>
          </div>

          <div class="pt-4 border-t border-gray-700">
            <label class="block text-sm font-medium mb-2">Get Item:</label>
            <div class="flex gap-2">
              <InputText
                  v-model="itemSlug"
                  placeholder="Item slug and ID"
                  class="flex-1"
              />
              <Button
                label="Get Item"
                icon="pi pi-box"
                severity="info"
                class="justify-center transition-transform duration-200 hover:scale-105"
                :disabled="loading || !itemSlug"
                @click="getItem"
              />

            </div>
            <p class="text-xs text-gray-400 mt-1">
              Example: corrupted-ashbringer-Unique_Sword_2H_104_x1
            </p>
          </div>
        </div>
      </div>

      <!-- Response Display -->
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">📊 Response</h2>
          <Button
            v-if="response"
            label="Clear"
            icon="pi pi-times"
            severity="secondary"
            size="small"
            class="text-xs transition-transform duration-200 hover:scale-105"
           @click="clearResponse"
          />

        </div>

        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p class="mt-2 text-gray-400">Loading...</p>
        </div>

        <div v-else-if="response" class="space-y-4">
          <!-- Status indicator -->
          <div class="flex items-center gap-2">
            <div
                :class="response.error ? 'bg-red-500' : 'bg-green-500'"
                class="w-3 h-3 rounded-full"
            ></div>
            <span :class="response.error ? 'text-red-400' : 'text-green-400'" class="text-sm font-medium">
              {{ response.error ? 'Error' : 'Success' }}
            </span>
            <span v-if="response.status" class="text-gray-400 text-sm">
              ({{ response.status }})
            </span>
          </div>

          <!-- Response content -->
          <div class="bg-gray-900 p-4 rounded overflow-auto max-h-96">
            <pre class="text-xs">{{ JSON.stringify(response, null, 2) }}</pre>
          </div>
        </div>

        <div v-else class="text-center py-8 text-gray-400">
          No response yet. Try an API call!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const api = useApi()

interface ApiResponse {
  error: boolean
  data?: any
  message?: string
  status?: number
  timestamp: string
  action: string
}

const response = ref<ApiResponse | null>(null)
const loading = ref(false)
const actId = ref(1)
const itemSlug = ref('corrupted-ashbringer-Unique_Sword_2H_104_x1')

const makeApiCall = async (apiFunction: () => Promise<any>, actionName: string) => {
  loading.value = true
  try {
    console.log(`Making API call: ${actionName}`)
    const result = await apiFunction()
    console.log(`API call successful:`, result)
    response.value = {
      error: false,
      data: result,
      timestamp: new Date().toISOString(),
      action: actionName
    }
  } catch (error: any) {
    console.error(`API call failed (${actionName}):`, error)
    response.value = {
      error: true,
      message: error.message || 'Unknown error',
      timestamp: new Date().toISOString(),
      action: actionName
    }
  } finally {
    loading.value = false
  }
}

const clearResponse = () => {
  response.value = null
}

// API methods
const testToken = () => makeApiCall(() => api.d3.testToken(), 'Test Token')
const getProfile = () => makeApiCall(() => api.d3.getProfile(), 'Get Profile')
const getActs = () => makeApiCall(() => api.d3.getActs(), 'Get Acts')
const getSpecificAct = () => makeApiCall(() => api.d3.getAct(actId.value), `Get Act ${actId.value}`)
const getItem = () => makeApiCall(() => api.d3.getItem(itemSlug.value), `Get Item: ${itemSlug.value}`)

// Debug: Log when component mounts
onMounted(() => {
  console.log('Diablo3 page mounted')
  console.log('API base URL:', useRuntimeConfig().public.apiBase)
})
</script>