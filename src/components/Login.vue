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
  <div class="flex h-screen">
    <!-- Left half - Image -->
    <div class="w-1/2 bg-blue-50 flex items-center justify-center">
      <img 
        :src="FaureciaBild1" 
        alt="Faurecia Logo" 
        class="w-full h-full object-cover"
        />
    </div>

    <!-- Right half - Login form -->
    <div class="w-1/2 flex items-center justify-center">
      <div class="w-full max-w-sm p-8">
        <img 
        :src="FaureciaLogo" 
        alt="Faurecia Logo" 
        class="w-full h-full object-cover"
        />
        <h1 class="text-2xl font-bold text-gray-800 mb-8">Device Manager</h1>
        <LoadingSpinner v-if="isLoading" />
        <div class="space-y-4">
          <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ errorMessage }}
          </div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full p-2 border rounded"
          />
          <button 
            @click="handleLogin"
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Loading...' : 'Login' }}
          </button>
          <button 
            @click="handleSignUp"
            class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Loading...' : 'Sign Up' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
