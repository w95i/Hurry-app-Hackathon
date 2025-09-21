<script setup lang="ts">
import SideBar from "../components/navigation/SideBar.vue";
import ColorModeButton from "../components/Themes/ColorModeButton.vue";

const toaster = { position: "bottom-right" as const, duration: 5000, expand: false };
</script>

<template>
  <UApp :toaster="toaster">
    <div class="content-section">
      <div class="side-bar">
        <SideBar />
      </div>
      <div class="content-container w-full">
        <div
          class="h-16 border-b border-[color:var(--border)] bg-[color:var(--nav-color)] backdrop-blur-sm px-6 flex items-center justify-between"
        >
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              Fingerprint Authentication System
            </h1>
            <p class="text-sm text-gray-500">Secure biometric access control</p>
          </div>

          <div class="flex items-center gap-6">
            <div
              class="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              System Online
            </div>

            <ColorModeButton />

            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4C6EF5] to-[#5AC8FA] flex items-center justify-center"
              >
                <i class="ri-user-line text-[16px] text-white"></i>
              </div>
              <div class="leading-tight">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Admin User
                </p>
                <p class="text-xs text-gray-500">System Administrator</p>
              </div>
            </div>
          </div>
        </div>
        <RouterView />
      </div>
    </div>
  </UApp>
</template>

<style scoped>
.content-section {
  display: flex;
}
</style>
