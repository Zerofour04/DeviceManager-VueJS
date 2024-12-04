import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useDeviceStore = defineStore('devices', () => {
  const devices = ref([])
  const isLoading = ref(false)

  const fetchDevices = async () => {
    isLoading.value = true
    const { data, error } = await supabase
      .from('DeviceDatabase')
      .select('*')
    
    console.log('Data:', data)
    console.log('Error:', error)
    
    if (data) {
      devices.value = data
    }
    isLoading.value = false
  }

  return {
    devices,
    isLoading,
    fetchDevices
  }
})
