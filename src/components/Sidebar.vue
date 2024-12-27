<script setup>
import { onMounted } from 'vue';
import { Home, Settings, Users, Box, LogOut } from 'lucide-vue-next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FaureciaLogo from '@/assets/images/Faurecia_logo.svg';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(() => {
    userStore.fetchUser();
});

const handleLogout = async () => {
    await supabase.auth.signOut();
};

const mainMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Box, label: 'Devices', path: '/devices' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' }
];
</script>

<template>
    <div class="h-full flex flex-col bg-white">
        <!-- Logo Section -->
        <div class="p-4 border-b">
            <img :src="FaureciaLogo" alt="Faurecia Logo" class="w-48" />
            <div class="mt-4">
        <h1 class="text-xl font-bold">Device Manager</h1>
        <p class="text-sm text-gray-500">In development by Ben</p>
      </div>
        </div>

        <!-- Main Navigation -->
        <nav class="flex-1 p-4">
            <ul class="space-y-2">
                <li v-for="item in mainMenuItems" :key="item.label">
                    <router-link :to="item.path" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                        <component :is="item.icon" class="w-5 h-5" />
                        {{ item.label }}
                    </router-link>
                </li>
            </ul>
        </nav>

        <!-- User Profile and Logout -->
        <div class="p-4 border-t">
            <div class="flex items-center gap-4 mb-4">
                <Avatar>
                    <AvatarImage :src="userStore.currentUser?.profile_picture" />
                    <AvatarFallback>
                        {{ userStore.currentUser?.first_name?.charAt(0).toUpperCase() }}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p class="font-medium">
                        {{ `${userStore.currentUser?.first_name} ${userStore.currentUser?.last_name}` }}
                    </p>
                    <div class="flex items-center gap-2 text-sm text-gray-500">
                        <span>{{ userStore.currentUser?.department }}</span>
                        <span>-</span>
                        <span>{{ userStore.currentUser?.role }}</span>
                    </div>
                </div>
            </div>
            <button
                @click="handleLogout"
                class="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-red-100 text-red-600">
                <LogOut class="w-5 h-5" />
                Logout
            </button>
        </div>
    </div>
</template>
