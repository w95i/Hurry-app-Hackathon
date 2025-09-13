<script setup lang="ts">
import { computed } from 'vue';
import Blank from './layouts/blank.vue';
import Default from './layouts/default.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layoutComponent = computed(() => (route.meta?.layout === 'blank' ? Blank : Default));
</script>

<template>
  <component :is="layoutComponent" />
</template>