<script setup lang="ts">
import Header from './Header.vue';
import ClustersInfo from './panes/ClustersInfo.vue';
import OptionsPane from './panes/OptionsPane.vue';
import PointInfo from './panes/PointInfo.vue';
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