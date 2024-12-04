<script setup>
import DeviceList from '@/components/DeviceList.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <div class="p-4">
        <header class="mb-8">
          <h1 class="text-2xl font-bold">Devices</h1>
        </header>
        <DeviceList />
      </div>
    </div>
  </div>
</template>
