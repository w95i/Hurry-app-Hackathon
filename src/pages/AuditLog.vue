<!-- filepath: d:\HurryApp-Hackathon\hackathon-project\src\pages\AuditLog.vue -->
<template>
  <div class="space-y-8 animate-fade-in p-10">
    <div>
      <h1 class="text-[30px] font-bold text-[color:var(--color-primary)]">
        Audit Log
      </h1>
      <p class="text-[color:var(--paragraph-color)]">
        View and track all user actions and system events
      </p>
    </div>

    <div
      class="shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg p-6"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Audit Log Entries</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[color:var(--border)]">
          <thead>
            <tr class="bg-[#f0f2f44d] dark:bg-[#12171F]">
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                UserID
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Audit Type
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Time
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Details
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="log in logs"
              :key="log.id"
              class="bg-[#f0f2f44d] dark:bg-[#12171F] hover:bg-[#f0f2f480] dark:hover:bg-[#1A202E] transition-colors duration-200"
            >
              <td class="px-4 py-2 font-medium">{{ log.userId }}</td>
              <td class="px-4 py-2">{{ log.auditType }}</td>
              <td class="px-4 py-2">{{ log.timestamp }}</td>
              <td class="px-4 py-2">{{ log.details }}</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axiosData from "../Services/api";

interface AuditLog {
  id: number;
  userId: number;
  auditType: string;
  timestamp: string;
  isSuccessful: boolean;
  details: string;
}

const logs = ref<AuditLog[]>([]);
const toast = useToast();

async function getAuditLogs() {
  try {
    const response = await axiosData.get("/person/audit-logs");
    if (response.status === 200 && response.data) {
      logs.value = response.data.items;
    }
  } catch (error) {
    console.log("Error fetching audit logs:", error);
    toast.add({
      title: "Error",
      description: "Failed to fetch audit logs.",
      color: "error",});
  }
}

onMounted(() => {
  getAuditLogs();
});
</script>
