<script setup lang="ts">
import { useSelect } from '@/store/select-store';
import Header from './Header.vue';
import DataPane from './panes/DataPane.vue';
import InfoPane from './panes/InfoPane.vue';
import OptionsPane from './panes/OptionsPane.vue';
import PointInfo from './panes/PointInfo.vue';
import ViewPane from './ViewPane.vue';

const select = useSelect();
</script>

<template>

  <div class="flex flex-col h-full w-full min-h-full overflow-hidden">
    <Header></Header>
    <div class="flex grow w-full h-full overflow-hidden">


      <InfoPane class="z-10" />

      <PointInfo class="absolute z-100" />
      <ViewPane />
      <div class="flex flex-col items-stretch z-10 gap-y-2 w-52
        min-w-52 overflow-y-auto bg-earth-200 border border-black select-none px-1">
        <OptionsPane />
        <DataPane v-if="select.top" :obj="select.top" />
      </div>

    </div>
  </div>

</template>