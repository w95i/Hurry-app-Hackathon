<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "User Management",
      type: "label",
      ui: {
        label:
          "px-5 py-2 text-[12px] font-semibold text-[color:var(--text-color)] uppercase",
        linkLabel: "text-[#D3D7DE]",
      },
    },
    {
      label: "Dashboard",
      icon: "ri-dashboard-line",
      to: "/",
      ui: {
        link: "nav-link flex items-center gap-3 w-full px-5 py-2 text-[16px] text-[#D3D7DE] transition-colors data-[active]:bg-[#131720] hover:bg-[#131720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-ring,#646cff)] focus-visible:ring-offset-transparent",
        linkLabel: "text-[#D3D7DE]",
      },
    },
    {
      label: "Register",
      icon: "material-symbols:inbox-text-person",
      to: "/register-user",
      ui: {
        link: "nav-link flex items-center gap-3 w-full px-5 py-2 text-[16px] text-[#D3D7DE] transition-colors data-[active]:bg-[#131720] hover:bg-[#131720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-ring,#646cff)] focus-visible:ring-offset-transparent",
        linkLabel: "text-[#D3D7DE]",
      },
    },
    {
      label: "Finger Matching",
      icon: "iconoir:fingerprint-check-circle",
      to: "/finger-matching",
      ui: {
        link: "nav-link flex items-center gap-3 w-full px-5 py-2 text-[16px] text-[#D3D7DE] transition-colors data-[active]:bg-[#131720] hover:bg-[#131720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-ring,#646cff)] focus-visible:ring-offset-transparent",
        linkLabel: "text-[#D3D7DE]",
      },
    },
    {
      label: "User Management",
      icon: "ri-settings-3-line",
      to: "/user-management",
      ui: {
        link: "nav-link flex items-center gap-3 w-full px-5 py-2 text-[16px] text-[#D3D7DE] transition-colors data-[active]:bg-[#131720] hover:bg-[#131720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-ring,#646cff)] focus-visible:ring-offset-transparent",
        linkLabel: "text-[#D3D7DE]",
      },
    },
    {
      label: "Audit Log",
      icon: "ri-file-list-3-line",
      to: "/audit-log",
      ui: {
        link: "nav-link flex items-center gap-3 w-full px-5 py-2 text-[16px] text-[#D3D7DE] transition-colors data-[active]:bg-[#131720] hover:bg-[#131720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-ring,#646cff)] focus-visible:ring-offset-transparent",
        linkLabel: "text-[#D3D7DE]",
      },
    },
  ],
]);
</script>

<template>
  <aside
    class="flex flex-col bg-[#0B0E13] text-white h-full min-h-screen w-64 navigation-style"
  >
    <div class="flex items-center gap-2 px-5 py-6 border-b border-[#131720]">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4C6EF5] to-[#5AC8FA] flex items-center justify-center"
      >
        <i class="ri-fingerprint-line text-[28px] text-white"></i>
      </div>
      <div class="content">
        <h1 class="text-lg font-semibold">SecureAuth</h1>
        <p class="text-xs text-[#9BA0A8]">Biometric Security</p>
      </div>
    </div>

    <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]: bg-[#0B0E13] flex-1 navigation-style h-full min-h-screen w-64"
    />
  </aside>
</template>

<style scoped>
.navigation-style .nav-link,
.navigation-style .nav-link .icon,
.navigation-style .nav-link [data-slot="avatar"],
.navigation-style .nav-link [data-slot="leading"] {
  color: var(--text-color);
}

.navigation-style .nav-link:hover,
.navigation-style .nav-link[data-active] {
  color: var(--text-color);
}
</style>
