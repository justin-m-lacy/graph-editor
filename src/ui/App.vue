<script setup lang="ts">
import Header from './Header.vue';
import InfoPane from './panes/InfoPane.vue';
import OptionsPane from './panes/OptionsPane.vue';
import PointInfo from './panes/PointInfo.vue';
import ViewPane from './ViewPane.vue';

</script>

<template>

  <div class="flex flex-col h-full w-full min-h-full overflow-hidden">
    <Header></Header>
    <div class="flex grow w-full h-full">

      <InfoPane class="z-10" />
      <PointInfo class="absolute z-100" />
      <ViewPane />
      <OptionsPane class="self-end z-10" />
    </div>
  </div>

</template>