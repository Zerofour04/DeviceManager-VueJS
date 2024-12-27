<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useDeviceStore } from '@/stores/devices'

const deviceStore = useDeviceStore()
const isDialogOpen = ref(false)
const isLoading = ref(false)

const newDevice = ref({
    device_name: '',
    ou: '',
    display_name: '',
    model: '',
    serial_number: '',
    os_version: '',
    email_address: '',
    c: '',
    mobile_provider: '',
    phone_number: '',
    wifi_mac_address: '',
    mi_client: '',
    is_device_compliant: false,
    is_supported: false,
    is_depregistered: false,
    is_version_compliant_18_0: false,
    is_ipad_shopfloor: false
})

const handleSubmit = async () => {
    isLoading.value = true
    const { data, error } = await supabase
        .from('DeviceDatabase')
        .insert(newDevice.value)
    
    if (!error) {
        await deviceStore.fetchDevices()
        isDialogOpen.value = false
        resetForm()
    }
    isLoading.value = false
}

const resetForm = () => {
    Object.keys(newDevice.value).forEach(key => {
        newDevice.value[key] = typeof newDevice.value[key] === 'boolean' ? false : ''
    })
}

defineExpose({ isDialogOpen })
</script>

<template>
    <Dialog v-model:open="isDialogOpen">
        <DialogContent class="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle class="text-2xl font-bold">Add New Device</DialogTitle>
                <DialogDescription>Fill in the device details below</DialogDescription>
            </DialogHeader>

            <form @submit.prevent="handleSubmit" class="space-y-6 py-4">
                <!-- Basic Information Section -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Basic Information</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Device Name</label>
                            <input v-model="newDevice.device_name" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Organization Unit</label>
                            <input v-model="newDevice.ou" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Display Name</label>
                            <input v-model="newDevice.display_name" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Email Address</label>
                            <input v-model="newDevice.email_address" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>

                <!-- Technical Details Section -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Technical Details</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Model</label>
                            <input v-model="newDevice.model" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Serial Number</label>
                            <input v-model="newDevice.serial_number" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">OS Version</label>
                            <input v-model="newDevice.os_version" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">WiFi MAC Address</label>
                            <input v-model="newDevice.wifi_mac_address" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>

                <!-- Contact Information Section -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Contact Information</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Country</label>
                            <input v-model="newDevice.c" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Mobile Provider</label>
                            <input v-model="newDevice.mobile_provider" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Phone Number</label>
                            <input v-model="newDevice.phone_number" 
                                   class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>

                <!-- Device Status Section -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Device Status</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Device Compliant</label>
                            <select v-model="newDevice.is_device_compliant" 
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                                <option :value="true">Yes</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Supported</label>
                            <select v-model="newDevice.is_supported" 
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                                <option :value="true">Yes</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">DEP Registered</label>
                            <select v-model="newDevice.is_depregistered" 
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                                <option :value="true">Yes</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Version 18.0 Compliant</label>
                            <select v-model="newDevice.is_version_compliant_18_0" 
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                                <option :value="true">Yes</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium">iPad Shopfloor</label>
                            <select v-model="newDevice.is_ipad_shopfloor" 
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                                <option :value="true">Yes</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" @click="isDialogOpen = false">
                        Cancel
                    </Button>
                    <Button type="submit" :disabled="isLoading">
                        {{ isLoading ? 'Adding...' : 'Add Device' }}
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
