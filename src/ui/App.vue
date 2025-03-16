<script setup lang="ts">
import DrawPane from './DrawPane.vue';
import Header from './Header.vue';
import ClustersPane from './ClustersPane.vue';

</script>

<template>

  <div class="w-full h-full min-h-full">
    <Header></Header>
    <div class="flex h-full w-full">
      <ClustersPane />
      <DrawPane />
    </div>
  </div>

</template>