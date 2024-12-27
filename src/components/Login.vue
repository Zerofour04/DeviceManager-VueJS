<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import FaureciaLogo from '@/assets/images/Faurecia_logo.svg'
import FaureciaBild1 from '@/assets/images/Faurecia_bild1.jpg'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  
  if (error) {
    errorMessage.value = error.message
  }
  isLoading.value = false
}

const handleSignUp = async () => {
  isLoading.value = true
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  
  if (error) {
    errorMessage.value = error.message
  }
  isLoading.value = false
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Left half - Image with overlay -->
    <div class="w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      <img 
        :src="FaureciaBild1" 
        alt="Faurecia Background" 
        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
      />
    </div>

    <!-- Right half - Enhanced login form -->
    <div class="w-1/2 flex items-center justify-center bg-white">
      <div class="w-full max-w-md p-12 space-y-8">
        <div class="text-center">
          <img 
            :src="FaureciaLogo" 
            alt="Faurecia Logo" 
            class="h-12 mx-auto mb-6"
          />
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
            Device Manager
          </h1>
          <p class="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <LoadingSpinner v-if="isLoading" class="mx-auto" />
        
        <div class="space-y-6">
          <div v-if="errorMessage" 
               class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <!-- Add an error icon here if desired -->
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div class="space-y-4">
            <button 
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
            
            <button 
              @click="handleSignUp"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </div>

        <div class="text-center text-sm">
          <p class="text-gray-600">
            Protected by Faurecia Security
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

