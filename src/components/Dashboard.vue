<script setup>
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/Sidebar.vue'

const authStore = useAuthStore()

const handleLogout = async () => {
  await supabase.auth.signOut()
}
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <div class="container p-4">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold">Welcome {{ authStore.user?.email }}</h1>
        </header>
        
        <main>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-xl font-semibold mb-4">Statistics</h2>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
