<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-vue-next'

const props = defineProps(['payment'])
const emit = defineEmits(['expand'])

const handleExpand = () => {
  emit('expand')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="handleExpand">
        Expand row
      </DropdownMenuItem>
      <DropdownMenuItem @click="() => navigator.clipboard.writeText(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
