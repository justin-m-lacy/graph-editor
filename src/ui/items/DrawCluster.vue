<script setup lang="ts">
import { TCluster } from '@/types/geom';
defineProps<{
	con: TCluster,
	stroke?: string
}>();

</script>
<template>
	<g stroke-width="2" :stroke="stroke ?? 'black'">
		<line v-for="[p1, p2] of con.links"
			  :x1="`${p1.x}`" :y1="`${p1.y}`"
			  :x2="`${p2.x}`" :y2="`${p2.y}`" />
	</g>
</template>