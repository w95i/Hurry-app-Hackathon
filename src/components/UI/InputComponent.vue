<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['placeholder', 'maxLength', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue || '',
  set: (newValue) => emit('update:modelValue', newValue)
})

const maxLength = props.maxLength || 52
</script>

<template>
  <UInput v-model="value" :maxlength="maxLength" aria-describedby="character-count" :placeholder="props.placeholder" class="w-full mt-1"
    :ui="{
      base: 'h-11 px-4 text-[var(--text-color)] w-full placeholder:text-[color:var(--input-placeholder,#9CA3AF)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--input-ring,#646cff)] focus:border-transparent transition-colors',
      leading: 'text-[var(--text-color)]',
      trailing: 'pointer-events-none  text-[color:var(--muted-color,#9CA3AF)]'
    }">
    <template #trailing>
      <div id="character-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
        {{ value?.length }}/{{ maxLength }}
      </div>
    </template>
  </UInput>
</template>

<style scoped></style>