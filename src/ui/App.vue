<script setup lang="ts">
import ClustersInfo from './ClustersInfo.vue';
import Header from './Header.vue';
import OptionsPane from './OptionsPane.vue';
import PointInfo from './PointInfo.vue';
import ViewPane from './ViewPane.vue';

</script>

<template>

  <div class="w-full h-full min-h-full">
    <Header></Header>
    <div class="flex h-full w-full">
      <ClustersInfo class="z-10" />
      <PointInfo class="absolute z-100" />
      <ViewPane />
      <OptionsPane class="self-end z-10" />
    </div>
  </div>

</template>