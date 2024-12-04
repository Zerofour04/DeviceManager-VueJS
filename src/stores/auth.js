import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)
  const isLoading = ref(true)

  // Check initial session
  const initAuth = async () => {
    isLoading.value = true
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      user.value = session.user
      isLoggedIn.value = true
    }
    isLoading.value = false
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      user.value = session.user
      isLoggedIn.value = true
    } else {
      user.value = null
      isLoggedIn.value = false
    }
  })

  return {
    user,
    isLoggedIn,
    isLoading,
    initAuth
  }
})
