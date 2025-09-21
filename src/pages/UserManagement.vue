<!-- filepath: d:\HurryApp-Hackathon\hackathon-project\src\pages\UserManagement.vue -->
<template>
  <div class="space-y-8 animate-fade-in p-10">
    <div>
      <h1 class="text-[30px] font-bold text-[color:var(--color-primary)]">
        User Management
      </h1>
      <p class="text-[color:var(--paragraph-color)]">
        Manage registered users and their fingerprint status
      </p>
    </div>

    <div
      class="shadow-sm border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-lg p-6"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Registered Users</h2>
        <router-link
          to="/register-user"
          class="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:opacity-90"
        >
          + Add User
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[color:var(--border)]">
          <thead>
            <tr class="bg-[#f0f2f44d] dark:bg-[#12171F]">
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Name
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Company
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Job Title
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-semibold text-muted-foreground"
              >
                Fingerprints
              </th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="bg-[#f0f2f44d] dark:bg-[#12171F] hover:bg-[#f0f2f480] dark:hover:bg-[#1A202E] transition-colors duration-200"
            >
              <td class="px-4 py-2 font-medium">{{ user.fullName }}</td>
              <td class="px-4 py-2">{{ user.companyName }}</td>
              <td class="px-4 py-2">{{ user.jobTitle }}</td>
              <td class="px-4 py-2">
                <span
                  class="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300"
                >
                  {{ user.fingerPrintCount }}
                </span>
              </td>
              <td class="px-4 py-2">
                <button
                  class="text-[color:var(--color-primary)] hover:underline text-xs"
                  @click="deleteUser(user.id)"
                >
                  <i class="ri-delete-bin-line text-red-700 text-[16px]"></i>
                </button>
              </td>
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

interface User {
  id: number;
  fullName: string;
  companyName: string;
  jobTitle: string;
  fingerPrintCount: number;
}

const users = ref<User[]>([]);
const toast = useToast();

async function getUsers() {
  try {
    const response = await axiosData.get("/person");
    if (response.status === 200 && response.data) {
      users.value = response.data.items;
    }
  } catch (error) {
    console.log("Error fetching users:", error);
    toast.add({ 
      title: "Error",
      description: "Failed to fetch users.",
      color: "error",
    });
  }
}

async function deleteUser(id: number) {
  try {
    const response = await axiosData.delete(`/person/${id}`);
    if (response.status === 200) {
      users.value = users.value.filter((user) => user.id !== id);
        toast.add({
            title: "Success",
            description: "User deleted successfully.",
            color: "success",
        });
    }
  } catch (error) {
    console.log("Error deleting user:", error);
    toast.add({
      title: "Error",
      description: "Failed to delete user.",
      color: "error",
    });
  }
}

onMounted(() => {
  getUsers();
});
</script>
