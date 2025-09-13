<script setup lang="ts">
import { useWSImageWithPlugin } from "../../Composables/useWSImageWithPlugin";

const { imageSrc, connected, error } = useWSImageWithPlugin(
  import.meta.env.VITE_WS_URL as string
);
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="text-sm">
      <span :class="connected ? 'text-green-600' : 'text-red-600'">
        {{ connected ? "Connected" : "Disconnected" }}
      </span>
      <span v-if="error" class="ml-2 text-red-600">· {{ error }}</span>
    </div>

    <div
      class="w-[420px] h-[320px] bg-gray-100 rounded flex items-center justify-center overflow-hidden"
    >
      <img
        v-if="imageSrc"
        :src="imageSrc"
        alt="Live"
        class="max-w-full max-h-full object-contain select-none"
        draggable="false"
      />
      <span v-else class="text-gray-500 text-sm">Waiting for frames…</span>
    </div>
  </div>
</template>
