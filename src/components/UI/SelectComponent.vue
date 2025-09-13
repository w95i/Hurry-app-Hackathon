<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["items", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue || "",
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<template>
  <USelect v-model="value" :items="items"
    class="w-full mt-1 h-11 px-4 text-[var(--text-color)] placeholder:text-[color:var(--input-placeholder,#9CA3AF)] rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors" />
</template>