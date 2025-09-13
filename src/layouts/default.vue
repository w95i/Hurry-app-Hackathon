<script setup lang="ts">
import SideBar from "../components/navigation/SideBar.vue";
import ColorModeButton from "../components/Themes/ColorModeButton.vue";
</script>

<template>
  <div>
    <div class="upper-bar flex items-center justify-between gap-4">
      <div></div>
      <div>
        <img
          src="../assets/Images/Logo-12-Bh2XQq0o1.png"
          alt="Hackathon Aswar"
          class="logo-img"
        />
      </div>
      <ColorModeButton />
    </div>
    <div class="content-section">
      <div class="side-bar">
        <SideBar />
      </div>
      <div class="content-container w-full p-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.upper-bar {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--nav-color);
}

.content-section {
  display: flex;
}

.logo-img {
  height: 60px;
  width: 180px;
  filter: var(--img-color-logo);
}
</style>
