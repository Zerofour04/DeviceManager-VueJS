import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      currentUser.value = data
    }
  }

  return {
    currentUser,
    fetchUser
  }
})
