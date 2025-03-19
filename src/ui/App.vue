<script setup lang="ts">
import ClustersPane from './ClustersPane.vue';
import Header from './Header.vue';
import OptionsPane from './OptionsPane.vue';
import PointPane from './PointPane.vue';
import ViewPane from './ViewPane.vue';

</script>

<template>

  <div class="w-full h-full min-h-full">
    <Header></Header>
    <div class="flex h-full w-full">
      <ClustersPane class="z-10" />
      <PointPane class="absolute z-100" />
      <ViewPane />
      <OptionsPane class="self-end z-10" />
    </div>
  </div>

</template>