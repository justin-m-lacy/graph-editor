<script setup lang="ts">
import { usePtStore } from '@/store/point-store';
import { TPoint } from '@/types/geom';

const props = defineProps<{
	pt: TPoint
}>();

const ptStore = usePtStore();

</script>
<template>
	<div class="absolute bg-orange-300 w-40 flex flex-col flex-wrap">

		<button type="button" @click="ptStore.remove(pt.id)">🗑</button>
		<input v-model="pt.name" placeholder="Name">
		<div>{{ pt.x }}, {{ pt.y }}</div>
	</div>
</template>