<script setup lang="ts">
import { shallowRef } from 'vue';
import DrawView from './DrawView.vue';
import Header from './Header.vue';
import PtInfo from './PtInfo.vue';

</script>

<template>

  <div class="w-full h-full min-h-full">
    <Header></Header>
    <DrawView />
  </div>

</template>