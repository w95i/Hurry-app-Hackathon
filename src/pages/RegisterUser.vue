<template>
  <div class="flex flex-col gap-5 p-10">
    <div class="titles">
      <h1 class="text-[30px] font-bold text-[color:var(--color-primary)]">
        User Registration
      </h1>
      <p class="text-[color:var(--paragraph-color)]">
        Register new users securely using fingerprint templates.
      </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div
        class="card shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg animate-slide-up p-6"
      >
        <div class="content">
          <div class="user-information flex items-center gap-3">
            <i
              class="ri-user-line text-[color:var(--color-primary)] text-[20px]"
            ></i>
            <h3
              class="text-[color:var(--text-color)] text-[24px] font-semibold"
            >
              User Information
            </h3>
          </div>
          <p class="text-[color:var(--paragraph-color)]">
            Enter the basic user details
          </p>
        </div>
        <div class="mt-6 flex flex-col gap-4">
          <div class="input-group flex flex-col gap-1">
            <label class="flex items-center gap-0.5 text-[14px]"
              ><i class="ri-user-line text-[color:var(--text-color)]"></i>Full
              Name</label
            >
            <input
              v-model="fullName"
              id="fullName"
              type="text"
              placeholder="Enter full name"
              class="w-full px-3 py-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-input)] text-[color:var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
            />
          </div>
          <div class="input-group flex flex-col gap-1">
            <label class="flex items-center gap-0.5 text-[14px]"
              ><i class="ri-building-4-line text-[color:var(--text-color)]"></i
              >Company</label
            >
            <input
              v-model="selectedCompany"
              id="company"
              type="text"
              placeholder="Enter company name"
              class="w-full px-3 py-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-input)] text-[color:var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
            />
          </div>
          <div class="input-group flex flex-col gap-1">
            <label class="flex items-center gap-0.5 text-[14px]"
              ><i class="ri-briefcase-3-line text-[color:var(--text-color)]"></i
              >Job Title</label
            >
            <input
              v-model="selectedJob"
              id="jobTitle"
              type="text"
              placeholder="Enter job title"
              class="w-full px-3 py-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-input)] text-[color:var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
            />
          </div>
        </div>
        <div class="space-y-3 pt-4 border-t border-[color:var(--border)] mt-8">
          <div class="flex justify-between text-sm">
            <span>Fingerprint Progress</span>
            <span>{{ completedCount }}/5 completed</span>
          </div>
          <Progress :value="progress" class="h-2" />
          <p class="text-xs text-muted-foreground">
            Minimum 3 fingerprints required for registration
          </p>
        </div>
        <button
          class="w-full transition-all duration-300 text-white py-2 px-4 rounded-xl mt-6 hover:opacity-90 disabled:opacity-50"
          :style="{ background: 'var(--gradient-primary)' }"
          :disabled="completedCount < 3"
          @click="SendData()"
        >
          Register User
        </button>
      </div>
      <div
        class="card shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg animate-slide-up p-6"
      >
        <div class="content">
          <div class="user-information flex items-center gap-3">
            <i
              class="ri-fingerprint-fill text-[color:var(--color-primary)] text-[20px]"
            ></i>
            <h3
              class="text-[color:var(--text-color)] text-[24px] font-semibold"
            >
              Fingerprint Templates
            </h3>
          </div>
          <p class="text-[color:var(--paragraph-color)]">
            Capture 5 encrypted fingerprint templates
          </p>
        </div>
        <div class="fingers">
          <div v-for="fp in fingerprints" :key="fp.id">
            <FingerPrints
              :fingerprint="fp"
              :currentCapture="currentCapture"
              :isCapturing="isCapturing"
              :captureFingerprint="captureFingerprint"
              :resetFingerprint="resetFingerprint"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Progress from "../components/UI/progress.vue";
import FingerPrints from "../components/Fingerprint/FingerPrints.vue";
import axiosData from "../Services/api";
import { useWebSocket } from "../composables/useWebSocket";

interface FingerprintItem {
  id: string;
  finger: string;
  status: "pending" | "captured" | "verified";
  quality: number;
}
const fullName = ref<string>("");
const selectedCompany = ref<string>("");
const selectedJob = ref<string>("");
const images = ref<string[]>([]);
const toast = useToast();

const progress = ref<number>(0);
const completedCount = ref<number>(0);

const fingerprints = ref<FingerprintItem[]>([
  { id: "1", finger: "Finger", status: "pending", quality: 0 },
  { id: "2", finger: "Finger", status: "pending", quality: 0 },
  { id: "3", finger: "Finger", status: "pending", quality: 0 },
  { id: "4", finger: "Finger", status: "pending", quality: 0 },
  { id: "5", finger: "Finger", status: "pending", quality: 0 },
]);
const currentCapture = ref<string | null>(null);
const isCapturing = ref(false);

const WS_URL = import.meta.env.VITE_WS_URL as string;
const { connect, send, lastMessage } = useWebSocket(WS_URL);

onMounted(() => {
  connect();
});

watch(lastMessage, async (msg) => {
  if (msg && msg.data && currentCapture.value) {
    // Convert base64 to Blob
    const base64Data = msg.data;
    const byteString = atob(base64Data.split(",")[1] || base64Data);
    // Removed unused mimeString variable
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    await uploadImage(base64Data);

    const fp = fingerprints.value.find((f) => f.id === currentCapture.value);
    if (fp) {
      fp.status = "captured";
      fp.quality = Math.floor(Math.random() * 40) + 60;
    }
    isCapturing.value = false;
    currentCapture.value = null;
    updateProgress();
  }
});

async function uploadImage(imageBlob: string) {
  try {
   
    const response = await axiosData.post("/file/base64", {
      base64Data: imageBlob,
      fileName: "fingerprint",
      imageFormat: "png",
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 && response.data) {
      images.value.push(response.data.filePath);
    }
  } catch (error) {
    console.log("Error uploading image:", error);
  }
  return null;
}

function captureFingerprint(id: string) {
  currentCapture.value = id;
  isCapturing.value = true;
  send({ action: "scan" });
}

function resetFingerprint(id: string) {
  const fpIndex = fingerprints.value.findIndex((f) => f.id === id);
  if (fpIndex !== -1) {
    fingerprints.value[fpIndex].status = "pending";
    fingerprints.value[fpIndex].quality = 0;
    images.value.splice(fpIndex, 1);
    updateProgress();
  }
}

function updateProgress() {
  completedCount.value = fingerprints.value.filter(
    (f) => f.status === "captured" || f.status === "verified"
  ).length;
  progress.value = (completedCount.value / fingerprints.value.length) * 100;
}

async function SendData() {
  try {
    const response = await axiosData.post(
      "/person",
      {
        fullName: fullName.value,
        companyName: selectedCompany.value,
        jobTitle: selectedJob.value,
        fingerPrints: images.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      toast.add({
      title: "Success",
      description: "Users fetched successfully.",
      color: "success",
    });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
