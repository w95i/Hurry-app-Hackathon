<script setup lang="ts">
import Progress from "../components/UI/progress.vue";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

interface ActivityItem {
  user: string;
  action: string;
  time: string;
  status: "success" | "error" | "info";
}

interface Device {
  name: string;
  location: string;
  status: "connected" | "disconnected";
  quality: number;
}

const stats: Stat[] = [
  {
    title: "Total Users",
    value: "84",
    change: "+12%",
    icon: "ri-user-line",
    color: "text-primary",
  },
  {
    title: "Fingerprints Stored",
    value: "142",
    change: "+5%",
    icon: "ri-fingerprint-line",
    color: "text-[purple]",
  },
];

const recentActivity: ActivityItem[] = [
  {
    user: "John Doe",
    action: "Fingerprint registered",
    time: "2 min ago",
    status: "success",
  },
  {
    user: "Jane Smith",
    action: "Authentication successful",
    time: "5 min ago",
    status: "success",
  },
];

const devices: Device[] = [
  {
    name: "Scanner Hub 01",
    location: "Main Entrance",
    status: "connected",
    quality: 98,
  },
];
</script>

<template>
  <div class="space-y-8 animate-fade-in p-10">
    <div>
      <h1 class="text-[30px] font-bold text-[color:var(--color-primary)]">
        Security Dashboard
      </h1>
      <p class="text-[color:var(--paragraph-color)]">
        Monitor your biometric authentication system in real-time
      </p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-2 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="stat.title"
        class="group shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg relative overflow-hidden transition-all duration-300 animate-slide-up p-6"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-muted-foreground">
            {{ stat.title }}
          </h3>
          <i :class="`${stat.color} ${stat.icon}`" class="text-[20px]"></i>
        </div>
        <div>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p
            class="text-xs flex items-center gap-1 mt-1"
            :class="stat.change.startsWith('+') ? 'text-success' : 'text-error'"
          >
            {{ stat.change }} from last month
          </p>
        </div>
        <div
          class="absolute bottom-0 left-0 w-full h-0 group-hover:h-2 bg-[color:var(--color-primary)] transition-all duration-300"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div
        class="animate-scale-in shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg p-6"
      >
        <div class="mb-6">
          <div class="flex items-center gap-2 text-[24px] font-semibold">
            <i class="ri-pulse-line text-primary text-[20px]"></i>
            Recent Activity
          </div>
          <div class="text-[14px] text-[color:var(--paragraph-color)]">
            Latest authentication events and system activities
          </div>
        </div>
        <div class="space-y-4 p-2">
          <div
            v-for="(activity, index) in recentActivity"
            :key="index"
            class="flex items-center justify-between p-3 bg-[#f0f2f44d] rounded-lg hover:bg-[#f0f2f480] transition-colors duration-200 dark:bg-[#12171F] dark:hover:bg-[#1A202E]"
          >
            <div class="space-y-1">
              <p class="text-sm font-medium">{{ activity.user }}</p>
              <p class="text-xs text-muted-foreground">{{ activity.action }}</p>
            </div>
            <div class="text-right space-y-1">
              <div
                :class="{
                  'bg-green-600 ': activity.status === 'success',
                  'bg-red-600 ': activity.status === 'error',
                  'bg-gray-600 ': activity.status === 'info',
                }"
                class="px-2 py-1 rounded text-xs text-white font-semibold inline-block"
              >
                {{ activity.status }}
              </div>
              <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Device Status -->
      <div
        class="animate-scale-in shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg p-6"
        :style="{ animationDelay: '200ms' }"
      >
        <div class="mb-6">
          <div class="flex items-center gap-2 text-[24px] font-semibold">
            <i class="ri-wifi-line text-primary text-[20px]"></i>
            Device Status
          </div>
          <div class="text-[14px] text-[color:var(--paragraph-color)]">
            Fingerprint scanner connectivity and performance
          </div>
        </div>
        <div class="space-y-4">
          <div
            v-for="(device, index) in devices"
            :key="index"
            class="space-y-3 p-3 bg-[#f0f2f44d] rounded-lg hover:bg-[#f0f2f480] transition-colors duration-200 dark:bg-[#12171F] dark:hover:bg-[#1A202E]"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">{{ device.name }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ device.location }}
                </p>
              </div>
              <div
                :class="[
                  'px-2 py-1 rounded text-xs font-semibold inline-block transition-colors duration-200 text-white',
                  device.status === 'connected'
                    ? 'bg-green-600'
                    : 'bg-red-600',
                ]"
              >
                {{
                  device.status === "connected" ? "Connected" : "Disconnected"
                }}
              </div>
            </div>
            <div v-if="device.status === 'connected'" class="space-y-2">
              <div class="flex justify-between text-xs">
                <span>Signal Quality</span>
                <span>{{ device.quality }}%</span>
              </div>
              <Progress :value="device.quality" class="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
