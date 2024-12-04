<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Login from '@/components/Login.vue'

import LoadingSpinner from '@/components/LoadingSpinner.vue'

const authStore = useAuthStore()
const isLoading = ref(true)

onMounted(async () => {
  await authStore.initAuth()
  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <template v-if="authStore.isLoggedIn">
        <router-view></router-view>
      </template>
      <template v-else>
        <div class="flex items-center justify-center min-h-screen">
          <Login />
        </div>
      </template>
    </template>
  </div>
</template>
