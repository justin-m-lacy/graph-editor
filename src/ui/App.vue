<script setup lang="ts">
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import ClustersPane from './ClustersPane.vue';
import DrawPane from './DrawPane.vue';
import Header from './Header.vue';
import OptionsPane from './OptionsPane.vue';
import PointPane from './PointPane.vue';

const pointStore = usePoints();
const select = useSelect();

</script>

<template>

  <div class="w-full h-full min-h-full">
    <Header></Header>
    <div class="flex h-full w-full">
      <ClustersPane class="z-10" />
      <PointPane class="absolute z-100" v-if="select.map.size > 0"
                 :pts="Array.from(select.map.values())"
                 @remove="pointStore.remove" />
      <DrawPane />
      <OptionsPane class="self-end z-10" />
    </div>
  </div>

</template>