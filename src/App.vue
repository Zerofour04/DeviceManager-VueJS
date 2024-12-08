<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Login from '@/components/Login.vue'
import Sidebar from '@/components/Sidebar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const authStore = useAuthStore()
const isLoading = ref(true)

onMounted(async () => {
  await authStore.initAuth()
  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <template v-if="authStore.isLoggedIn">
        <div class="flex h-screen overflow-hidden">
          <!-- Fixed Sidebar -->
          <aside class="w-64 fixed inset-y-0 bg-background border-r z-50">
            <Sidebar />
          </aside>

          <!-- Main Content -->
          <main class="flex-1 ml-64 overflow-auto">
            <router-view></router-view>
          </main>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center min-h-screen">
          <Login />
        </div>
      </template>
    </template>
  </div>
</template>
