<template>
  <div class="flex flex-col gap-5 justify-center items-center">
    <h1 class="text-3xl font-bold mb-4">Register User</h1>
    <form @submit.prevent="SendData()" class="space-y-4 w-[50%]">
      <div class="w-full flex flex-col gap-4">
        <div class="input-group">
          <label for="username" class="block text-sm font-medium">Full Name</label>
          <ui-input placeholder="Enter Your Full Name" v-model="fullName" />
        </div>
        <div class="input-group">
          <label>Company Name</label>
          <ui-select :items="Company" v-model="selectedCompany" />
        </div>
        <div class="input-group">
          <label>Company Name</label>
          <ui-select :items="jobTitle" v-model="selectedJob" />
        </div>
      </div>
      <div>
        <button type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Next
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axiosData from "../Services/api";

const fullName = ref<string>("");
const selectedCompany = ref<string>("Facebook")
const selectedJob = ref<string>("Front-End Developer")
const Company = ref<string[]>([
  "Facebook",
  "instagram",
  "twitter",
  "telegram",
  "whatsApp"
]);
const jobTitle = ref<string[]>([
  "Front-End Developer",
  "Back-End Developer",
  "Mobile Developer",
  "AI Agent",
  "UI/UX",
]);

async function SendData() {
  try {
    const response = await axiosData.post("/register.php", {
      full_name: fullName.value,
      company_name: selectedCompany.value,
      job_title: selectedJob.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (response.status === 200) {
      console.log(response.data.id)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
