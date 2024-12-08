<script setup>
import { Home, Settings, Users, Box, LogOut } from 'lucide-vue-next'
import FaureciaLogo from '@/assets/images/Faurecia_logo.svg'
import { supabase } from '@/lib/supabase'

const handleLogout = async () => {
  await supabase.auth.signOut()
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Box, label: 'Devices', path: '/devices' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: LogOut, label: 'Logout', action: handleLogout }
]
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Logo Section -->
    <div class="p-4 border-b">
      <img 
        :src="FaureciaLogo" 
        alt="Faurecia Logo" 
        class="w-48"
      />
      <div class="mt-4">
        <h1 class="text-xl font-bold">Faurecia</h1>
        <p class="text-sm text-gray-500">In development by Ben</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.label">
          <router-link 
            v-if="item.path"
            :to="item.path"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </router-link>
          <button 
            v-else
            @click="item.action"
            class="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-red-100 text-red-600"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
