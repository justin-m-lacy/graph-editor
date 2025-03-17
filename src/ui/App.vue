<script setup lang="ts">
import DrawPane from './DrawPane.vue';
import Header from './Header.vue';
import ClustersPane from './ClustersPane.vue';
import { usePoints } from '@/store/point-store';
import PointPane from './PointPane.vue';

const pointStore = usePoints();

</script>

<template>

  <div class="w-full h-full min-h-full">
    <Header></Header>
    <div class="flex h-full w-full">
      <ClustersPane class="z-10" />
      <PointPane class="absolute z-100" v-if="pointStore.selected" :pt="pointStore.selected"
                 @remove="pointStore.remove" />
      <DrawPane />
    </div>
  </div>

</template>