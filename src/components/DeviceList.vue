<script setup>
import { onMounted } from 'vue'
import { useDeviceStore } from '@/stores/devices'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const deviceStore = useDeviceStore()

onMounted(() => {
  deviceStore.fetchDevices()
})

const columns = [
  {
    accessorKey: 'device_name',
    header: 'Device Name',
  },
  {
    accessorKey: 'ou',
    header: 'Organization Unit',
  },
  {
    accessorKey: 'display_name',
    header: 'Display Name',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'serial_number',
    header: 'Serial Number',
  },
  {
    accessorKey: 'os_version',
    header: 'OS Version',
  },
  {
    accessorKey: 'last_connected_at',
    header: 'Last Connected',
  },
  {
    accessorKey: 'is_device_compliant',
    header: 'Compliant',
  }
]
</script>

<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="column in columns" :key="column.accessorKey">
            {{ column.header }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="device in deviceStore.devices" :key="device.c">
          <TableCell v-for="column in columns" :key="column.accessorKey">
            <template v-if="column.accessorKey === 'is_device_compliant'">
              <span :class="device[column.accessorKey] ? 'text-green-600' : 'text-red-600'">
                {{ device[column.accessorKey] ? 'Yes' : 'No' }}
              </span>
            </template>
            <template v-else>
              {{ device[column.accessorKey] }}
            </template>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
