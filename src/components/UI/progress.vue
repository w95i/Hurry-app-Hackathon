<script setup lang="ts">
import { ref, watch } from "vue";

// Props
const props = defineProps<{
  value?: number;
  className?: string;
}>();

// Refs
const indicatorRef = ref<HTMLElement | null>(null);

// Watch for value changes to update width style
watch(
  () => props.value,
  (val) => {
    if (indicatorRef.value) {
      const percent = Math.max(0, Math.min(val || 0, 100));
      indicatorRef.value.style.width = `${percent}%`;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="relative h-3 w-full overflow-hidden rounded-full bg-[#7547d1]"
    :class="className"
  >
    <div
      ref="indicatorRef"
      class="h-full transition-all rounded-full bg-[color:var(--color-primary)]"
      style="width: 0%"
    />
  </div>
</template>
