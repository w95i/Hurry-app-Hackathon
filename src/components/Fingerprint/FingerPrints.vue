<script setup lang="ts">
import Progress from "../UI/progress.vue";

interface FingerprintItem {
  id: string;
  finger: string;
  status: "pending" | "captured" | "verified";
  quality: number;
}

defineProps<{
  fingerprint: FingerprintItem;
  currentCapture: string | null;
  isCapturing: boolean;
  captureFingerprint: (id: string) => void;
  resetFingerprint: (id: string) => void;
}>();
</script>

<template>
  <div
    class="p-4 border rounded-lg transition-all duration-300 my-3"
    :class="{
      'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5 fingerprint-scan':
        currentCapture === fingerprint.id,
      'border-[color:var(--bg-success)] bg-[color:var(--bg-success)]/50':
        fingerprint.status === 'captured',
      'border-[color:var(--border)] hover:border-[color:var(--color-primary)]/50':
        fingerprint.status === 'pending' && currentCapture !== fingerprint.id,
    }"
  >
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center"
          :class="{
            'bg-[color:var(--bg-success)] text-green-700':
              fingerprint.status === 'captured',
          }"
        >
          <i
            v-if="fingerprint.status === 'captured'"
            class="ri-checkbox-circle-line text-[20px]"
          ></i>
          <i v-else class="ri-fingerprint-line text-[20px]"></i>
        </div>

        <div>
          <p class="font-medium">{{ fingerprint.finger }}</p>
          <p class="text-xs text-[color:var(--paragraph-color)]">
            <template v-if="fingerprint.status === 'pending'">Ready to capture</template>
            <template v-else-if="fingerprint.status === 'captured'">
              Quality: {{ fingerprint.quality }}%
            </template>
            <template v-else-if="fingerprint.status === 'verified'">
              Verified: {{ fingerprint.quality }}%
            </template>
          </p>
        </div>
      </div>

      <div class="flex gap-2">
        <button
          v-if="fingerprint.status === 'pending'"
          size="sm"
          :disabled="isCapturing"
          class="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 text-white p-1 px-2 rounded-xl"
          @click="captureFingerprint(fingerprint.id)"
        >
          <i class="ri-add-line text-[16px] mr-1"></i>
          Capture
        </button>

        <template v-else>
          <span
            class="px-2 py-1 rounded text-xs"
            :class="fingerprint.status === 'verified'
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-700'"
          >
            {{ fingerprint.status }}
          </span>
          <button
            size="sm"
            variant="outline"
            @click="resetFingerprint(fingerprint.id)"
          >
            <i class="ri-close-line h-4 w-4"></i>
          </button>
        </template>
      </div>
    </div>

    <div v-if="fingerprint.quality > 0" class="space-y-2">
      <Progress :value="fingerprint.quality" class="h-2" />
    </div>

    <div
      v-if="currentCapture === fingerprint.id && isCapturing"
      class="mt-3 flex items-center gap-2 text-[color:var(--color-primary)]"
    >
      <div
        class="animate-spin w-4 h-4 border-2 border-[color:var(--color-primary)] border-t-transparent rounded-full"
      ></div>
      Scanning fingerprint...
    </div>
  </div>
</template>
