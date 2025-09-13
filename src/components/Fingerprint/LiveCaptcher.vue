<template>
  <div class="p-4">
    <button @click="capture" :disabled="!connected"
            style="padding:.5rem 1rem;border:1px solid #ccc;border-radius:6px;cursor:pointer">
      Capture
    </button>

    <div style="margin-top:8px">{{ statusText }}</div>

    <img v-if="imgSrc"
         :src="imgSrc"
         alt="Captured"
         style="max-width:100%;border:1px solid #ccc;margin-top:10px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const WS_URL = import.meta.env.VITE_WS_URL as string;

const statusText = ref('Connecting…');
const imgSrc = ref<string>('');
const connected = ref(false);

let ws: WebSocket | null = null;

function connect() {
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    connected.value = true;
    statusText.value = 'Connected.';
  };

  ws.onmessage = (evt: MessageEvent) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.type === 'result') {
        if (!data.ok) {
          statusText.value = 'Error: ' + (data.error ?? 'Unknown error');
          return;
        }
        statusText.value = 'Captured via ' + (data.device_mode || 'device');
        imgSrc.value = 'data:image/bmp;base64,' + data.image_base64_bmp;
      }
    } catch (e) {
      statusText.value = 'Invalid message received.';
    }
  };

  ws.onerror = () => {
    statusText.value = 'WebSocket error.';
  };

  ws.onclose = () => {
    connected.value = false;
    statusText.value = 'Disconnected.';
  };
}

function capture() {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    statusText.value = 'Not connected.';
    return;
  }
  ws.send(JSON.stringify({ action: 'capture' }));
}

onMounted(connect);

onBeforeUnmount(() => {
  if (ws && ws.readyState === WebSocket.OPEN) ws.close();
  ws = null;
});
</script>
