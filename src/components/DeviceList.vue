<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/devices';
import { supabase } from '@/lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';

const deviceStore = useDeviceStore();
const searchQuery = ref('');
const isDialogOpen = ref(false);
const selectedDeviceDetails = ref(null);
const isEditDialogOpen = ref(false);
const editingDevice = ref(null);

onMounted(() => {
    deviceStore.fetchDevices();
});

const filteredDevices = computed(() => {
    if (!searchQuery.value) return deviceStore.devices;

    const query = searchQuery.value.toLowerCase();
    return deviceStore.devices.filter((device) => {
        return Object.entries(device).some(([key, value]) => {
            if (value === null) return false;
            return String(value).toLowerCase().includes(query);
        });
    });
});

const showDeviceDetails = (device) => {
    selectedDeviceDetails.value = device;
    isDialogOpen.value = true;
};

const startEdit = (device) => {
    editingDevice.value = { ...device };
    isEditDialogOpen.value = true;
    isDialogOpen.value = false;
};

const handleSave = async () => {
    if (editingDevice.value) {
        const { error } = await supabase
            .from('DeviceDatabase')
            .update(editingDevice.value)
            .eq('id', editingDevice.value.id);

        if (!error) {
            await deviceStore.fetchDevices();
            isEditDialogOpen.value = false;
            editingDevice.value = null;
        }
    }
};

const isDeleteDialogOpen = ref(false);
const deviceToDelete = ref(null);

const startDelete = (device) => {
    deviceToDelete.value = device;
    isDeleteDialogOpen.value = true;
};

const handleDelete = async () => {
    if (deviceToDelete.value) {
        const { error } = await supabase.from('DeviceDatabase').delete().eq('id', deviceToDelete.value.id);

        if (!error) {
            await deviceStore.fetchDevices();
            isDialogOpen.value = false;
            isDeleteDialogOpen.value = false;
            deviceToDelete.value = null;
        }
    }
};

const columns = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'created_at',
        header: 'Created At'
    },
    {
        accessorKey: 'c',
        header: 'Country'
    },
    {
        accessorKey: 'ou',
        header: 'Organization Unit'
    },
    {
        accessorKey: 'display_name',
        header: 'Display Name'
    },
    {
        accessorKey: 'mobile_provider',
        header: 'Mobile Provider'
    },
    {
        accessorKey: 'phone_number',
        header: 'Phone Number'
    },
    {
        accessorKey: 'model',
        header: 'Model'
    },
    {
        accessorKey: 'serial_number',
        header: 'Serial Number'
    },
    {
        accessorKey: 'device_name',
        header: 'Device Name'
    },
    {
        accessorKey: 'registration_date',
        header: 'Registration Date'
    },
    {
        accessorKey: 'last_connected_at',
        header: 'Last Connected'
    },
    {
        accessorKey: 'mi_client',
        header: 'MI Client'
    },
    {
        accessorKey: 'wifi_mac_address',
        header: 'WiFi MAC'
    },
    {
        accessorKey: 'os_version',
        header: 'OS Version'
    },
    {
        accessorKey: 'is_version_compliant_18_0',
        header: 'Version 18.0 Compliant'
    },
    {
        accessorKey: 'is_ipad_shopfloor',
        header: 'iPad Shopfloor'
    },
    {
        accessorKey: 'is_depregistered',
        header: 'DEP Registered'
    },
    {
        accessorKey: 'is_supported',
        header: 'Supported'
    },
    {
        accessorKey: 'is_device_compliant',
        header: 'Device Compliant'
    },
    {
        accessorKey: 'noncompliance_reasons',
        header: 'Noncompliance Reasons'
    },
    {
        accessorKey: 'email_address',
        header: 'Email'
    }
];
</script>

<template>
    <div class="w-full space-y-4">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Devices</h2>
            </div>

            <div class="flex items-center space-x-2">
                <Input placeholder="Search devices..." v-model="searchQuery" class="max-w-sm" />
            </div>

            <!-- Details Dialog -->
            <Dialog v-model:open="isDialogOpen">
                <DialogContent class="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <div class="flex justify-between items-center">
                            <DialogTitle class="text-xl font-bold">
                                {{ selectedDeviceDetails?.device_name }}
                            </DialogTitle>
                            <div class="space-x-2">
                                <Button @click="startEdit(selectedDeviceDetails)" variant="outline"> Edit </Button>
                                <Button @click="startDelete(selectedDeviceDetails)" variant="destructive">
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <DialogDescription>
                            {{ selectedDeviceDetails?.model }} - {{ selectedDeviceDetails?.serial_number }}
                        </DialogDescription>
                    </DialogHeader>

                    <!-- Delete Confirmation Dialog -->
                    <AlertDialog v-model:open="isDeleteDialogOpen">
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the device "{{
                                        deviceToDelete?.device_name
                                    }}" from the database.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel @click="isDeleteDialogOpen = false"> Cancel </AlertDialogCancel>
                                <AlertDialogAction @click="handleDelete"> Delete </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <div v-if="selectedDeviceDetails" class="grid gap-6 py-4">
                        <!-- Basic Information -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">Basic Information</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">Organization Unit</p>
                                    <p>{{ selectedDeviceDetails.ou }}</p>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">Display Name</p>
                                    <p>{{ selectedDeviceDetails.display_name }}</p>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">Email</p>
                                    <p>{{ selectedDeviceDetails.email_address }}</p>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">Country</p>
                                    <p>{{ selectedDeviceDetails.c }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Device Status -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">Device Status</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div
                                    v-for="key in [
                                        'is_device_compliant',
                                        'is_supported',
                                        'is_depregistered',
                                        'is_version_compliant_18_0',
                                        'is_ipad_shopfloor'
                                    ]"
                                    :key="key"
                                    class="flex items-center justify-between p-2 rounded-lg border">
                                    <span class="text-sm">{{
                                        columns.find((col) => col.accessorKey === key)?.header
                                    }}</span>
                                    <Badge :variant="selectedDeviceDetails[key] ? 'success' : 'destructive'">
                                        {{ selectedDeviceDetails[key] ? 'Yes' : 'No' }}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <!-- Technical Details -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">Technical Details</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">OS Version</p>
                                    <p>{{ selectedDeviceDetails.os_version }}</p>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">WiFi MAC</p>
                                    <p>{{ selectedDeviceDetails.wifi_mac_address || 'N/A' }}</p>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">MI Client</p>
                                    <p>{{ selectedDeviceDetails.mi_client || 'N/A' }}</p>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm text-muted-foreground">Last Connected</p>
                                    <p>{{ selectedDeviceDetails.last_connected_at }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <!-- Edit Dialog -->
            <Dialog v-model:open="isEditDialogOpen">
                <DialogContent class="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Device</DialogTitle>
                        <DialogDescription> Make changes to device information </DialogDescription>
                    </DialogHeader>

                    <div v-if="editingDevice" class="grid gap-4 py-4">
                        <!-- Basic Information -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">Basic Information</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Organization Unit</label>
                                    <Input v-model="editingDevice.ou" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Display Name</label>
                                    <Input v-model="editingDevice.display_name" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Email</label>
                                    <Input v-model="editingDevice.email_address" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Country</label>
                                    <Input v-model="editingDevice.c" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Model</label>
                                    <Input v-model="editingDevice.model" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Serial Number</label>
                                    <Input v-model="editingDevice.serial_number" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">Device Name</label>
                                    <Input v-model="editingDevice.device_name" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm text-muted-foreground">OS Version</label>
                                    <Input v-model="editingDevice.os_version" />
                                </div>
                            </div>
                        </div>

                        <!-- Device Status -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">Device Status</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div
                                    v-for="key in [
                                        'is_device_compliant',
                                        'is_supported',
                                        'is_depregistered',
                                        'is_version_compliant_18_0',
                                        'is_ipad_shopfloor'
                                    ]"
                                    :key="key"
                                    class="space-y-2">
                                    <label class="text-sm text-muted-foreground">
                                        {{ columns.find((col) => col.accessorKey === key)?.header }}
                                    </label>
                                    <select
                                        v-model="editingDevice[key]"
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                                        <option :value="true">Yes</option>
                                        <option :value="false">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" @click="isEditDialogOpen = false"> Cancel </Button>
                        <Button @click="handleSave"> Save changes </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <!-- Table -->
            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead v-for="column in columns" :key="column.accessorKey" class="whitespace-nowrap">
                                {{ column.header }}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            v-for="device in filteredDevices"
                            :key="device.id"
                            class="hover:bg-muted/50 cursor-pointer"
                            @click="showDeviceDetails(device)">
                            <TableCell v-for="column in columns" :key="column.accessorKey" class="font-medium">
                                <template v-if="column.accessorKey.startsWith('is_')">
                                    <Badge :variant="device[column.accessorKey] ? 'success' : 'destructive'">
                                        {{ device[column.accessorKey] ? 'Yes' : 'No' }}
                                    </Badge>
                                </template>
                                <template v-else>
                                    {{ device[column.accessorKey] }}
                                </template>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-muted-foreground {
    @apply text-gray-500;
}
</style>
