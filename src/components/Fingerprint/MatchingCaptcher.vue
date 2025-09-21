<template>
  <div class="space-y-8 animate-fade-in p-10">
    <div class="titles mb-4">
      <h1 class="text-[28px] font-bold text-[color:var(--color-primary)]">
        Fingerprint Matching
      </h1>
      <p class="text-[color:var(--paragraph-color)]">
        Compare captured fingerprints and view match accuracy.
      </p>
    </div>
    <div
      class="shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg p-8 max-w-3xl mx-auto space-y-6"
    >
      <div class="images-wrapper w-full flex justify-center items-center gap-6">
        <i
          v-if="!imgSrc"
          class="ri-fingerprint-line text-[120px] text-[#5eff5e]"
        ></i>
        <img
          v-if="imgSrc"
          :src="imgSrc"
          alt="Captured"
          class="border rounded-lg"
          style="max-width: 250px; max-height: 300px"
        />
        <UIcon
          v-if="imgSrc"
          name="icon-park-outline:file-conversion"
          class="size-14"
        />
        <img
          v-if="imgSrc"
          :src="imgMatch ? imgMatch : placeholderImage"
          alt="Matched / Scanning"
          class="border rounded-lg"
          style="max-width: 250px; max-height: 300px"
        />
        <span v-if="loading"></span>
      </div>

      <div
        v-if="imageAccuracy !== null"
        class="flex flex-col items-center mt-4"
      >
        <div class="text-3xl font-bold text-[color:var(--color-primary)]">
          {{ animatedAccuracy }}%
        </div>
        <div class="text-xs text-[color:var(--paragraph-color)] mt-1">
          Match Accuracy
        </div>
      </div>

      <div class="information text-center mt-5">
        <span class="text-sm text-[color:var(--paragraph-color)]">{{
          statusText
        }}</span>
      </div>

      <div class="btn-wrapper flex justify-center items-center gap-8 mt-5">
        <button
          @click="requestCapture"
          :disabled="!connected"
          title="Capture from device"
          class="bg-[color:var(--color-primary)] text-white px-6 py-2 rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          Capture
        </button>
        <button
          @click="checker"
          :disabled="!connected2 || !imgSrc || isScanning"
          title="Compare captured with reference"
          class="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          Let's Find it
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import placeholderImage from "../../assets/Images/3c596ee60c6aec400b19af6a3dbb3c44.jpg";

const WS_URL = (import.meta.env.VITE_WS_URL as string) ?? "";
const WS2_URL = (import.meta.env.VITE_WS2_URL as string) ?? "";

const statusText = ref("Connecting…");
const loading = ref(false);
const imgSrc = ref<string>("");
const imgMatch = ref<string>("");
const imageAccuracy = ref<number | null>(null);
const percentage = ref<number | null>(null);
const connected = ref(false);
const connected2 = ref(false);

const randomImages = ref<string[]>([]);
const isScanning = ref(false);

let ws: WebSocket | null = null;
let wsMatch: WebSocket | null = null;

let scanIntervalId: number | null = null;
let scanTimeoutId: number | null = null;

function safeParse(json: string): any | null {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function toDataUrlFromBase64(b64: string, mime = "image/bmp"): string {
  if (b64.startsWith("data:")) return b64;
  if (/^https?:\/\//i.test(b64) || b64.startsWith("blob:")) return b64;
  return `data:${mime};base64,${b64}`;
}

function stripDataUrl(dataUrl: string): string {
  const i = dataUrl.indexOf(",");
  return i >= 0 ? dataUrl.slice(i + 1) : dataUrl;
}

function clearScanTimers() {
  if (scanIntervalId !== null) {
    clearInterval(scanIntervalId);
    scanIntervalId = null;
  }
  if (scanTimeoutId !== null) {
    clearTimeout(scanTimeoutId);
    scanTimeoutId = null;
  }
  isScanning.value = false;
}

function openCaptureSocket() {
  if (!WS_URL) {
    statusText.value = "Capture URL missing (VITE_WS_URL).";
    return;
  }
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    connected.value = true;
    statusText.value = "Connected (capture).";
    requestCapture();
  };

  ws.onmessage = (evt: MessageEvent) => {
    const data = safeParse(String(evt.data));
    if (!data) {
      statusText.value = "Invalid message (capture).";
      return;
    }

    if (data.ok) {
      if (!data.ok) {
        statusText.value = "Error (capture): " + (data.error ?? "Unknown");
        return;
      }
      const bmp = data.data ?? "";
      if (bmp) {
        imgSrc.value = toDataUrlFromBase64(String(bmp), "image/bmp");
      }
    }
  };

  ws.onerror = () => {
    statusText.value = "WebSocket error (capture).";
  };
  ws.onclose = () => {
    connected.value = false;
    statusText.value = "Disconnected (capture).";
  };
}

function requestCapture() {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    statusText.value = "Not connected (capture).";
    return;
  }
  ws.send(JSON.stringify({ action: "scan" }));
}

function openMatchSocket() {
  if (!WS2_URL) {
    statusText.value = "Match URL missing (VITE_WS2_URL).";
    return;
  }
  wsMatch = new WebSocket(WS2_URL);

  wsMatch.onopen = () => {
    connected2.value = true;
    statusText.value = "Connected (match).";
  };

  wsMatch.onmessage = (evt: MessageEvent) => {
    const data = safeParse(String(evt.data));
    if (!data) {
      statusText.value = "Invalid message (match).";
      return;
    }

    if (!data.ok) {
      loading.value = true;
    }

    if (data.ok) {
      loading.value = false;
      clearScanTimers();

      imgMatch.value = `https://awa.lonar.net/${data.results[0].path}`;
      imageAccuracy.value = data.results[0].accuracy;

      percentage.value = data.similarity;
      statusText.value = "Match found.";
    }
  };

  wsMatch.onerror = () => {
    statusText.value = "WebSocket error (match).";
  };
  wsMatch.onclose = () => {
    connected2.value = false;
    statusText.value = "Disconnected (match).";
  };
}

async function checker() {
  statusText.value = "Preparing scan…";

  isScanning.value = true;
  let idx = 0;
  imgMatch.value = randomImages.value[0];

  scanIntervalId = window.setInterval(() => {
    idx = (idx + 1) % randomImages.value.length;
    imgMatch.value = randomImages.value[idx];
  }, 150);

  if (!wsMatch || wsMatch.readyState !== WebSocket.OPEN) {
    statusText.value = "Not connected (match).";
    clearScanTimers();
    return;
  }
  if (!imgSrc.value) {
    statusText.value = "No captured image to compare.";
    clearScanTimers();
    return;
  }

  statusText.value = "Comparing…";
  const base64Payload = stripDataUrl(imgSrc.value);
  wsMatch.send(
    JSON.stringify({
      action: "compare",
      image_base64: base64Payload,
      image: imgSrc.value,
    })
  );

  scanTimeoutId = window.setTimeout(() => {
    if (isScanning.value) {
      clearScanTimers();
      statusText.value = "Waiting for match result…";
    }
  }, 2500);
}

const animatedAccuracy = ref(0);

watch(imageAccuracy, (newVal) => {
  if (typeof newVal === "number") {
    let start = animatedAccuracy.value;
    const end = Math.round(newVal);
    const duration = 800; // ms
    const step = Math.max(1, Math.round((end - start) / (duration / 16)));
    let current = start;
    animatedAccuracy.value = start;
    const timer = setInterval(() => {
      current += step;
      if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
        animatedAccuracy.value = end;
        clearInterval(timer);
      } else {
        animatedAccuracy.value = current;
      }
    }, 16);
  }
});

// --- Lifecycle
onMounted(() => {
  openCaptureSocket();
});

onMounted(() => {
  openMatchSocket();
});

onBeforeUnmount(() => {
  try {
    ws?.close();
  } catch {}
  try {
    wsMatch?.close();
  } catch {}
  ws = null;
  wsMatch = null;
  clearScanTimers();
});
</script>

<style scoped>
.images-wrapper img {
  width: 250px;
  height: 300px;
  border-radius: 10px;
}
</style>
