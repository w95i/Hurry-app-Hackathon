<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "User Management",
      type: "label",
    },
    {
      label: "Register",
      icon: "material-symbols:inbox-text-person",
      to: "/register-user",
      ui: {
        link: "nav-link flex items-center gap-3 w-full px-5 py-2 text-[16px] text-[var(--text-color)] transition-colors data-[active]:bg-[var(--nav-active-bg,rgba(255,255,255,0.08))] hover:bg-[var(--nav-hover-bg,rgba(255,255,255,0.06))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--nav-ring,#646cff)] focus-visible:ring-offset-transparent",
        linkLabel: "text-[var(--text-color)]",
      },
    },
  ],
]);
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]: bg-background-navigation navigation-style min-h-screen w-64"
  />
</template>

<style scoped>
/* Ensure link text and icon always keep the design color */
.navigation-style .nav-link,
.navigation-style .nav-link .icon,
.navigation-style .nav-link [data-slot="avatar"],
.navigation-style .nav-link [data-slot="leading"] {
  color: var(--text-color);
}

/* Do not override color on active/hover, only background changes */
.navigation-style .nav-link:hover,
.navigation-style .nav-link[data-active] {
  color: var(--text-color);
}
</style>
