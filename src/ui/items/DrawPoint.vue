<script setup lang="ts">
import { TPoint } from '@/types/geom';
const props = defineProps<{
	pt: TPoint,
	color: string,
	radius: number,
	selected?: boolean
}>();

const size = computed(() => {
	return Math.max((props.pt.r ?? 4), 2);
});

</script>
<template>
	<g>
		<circle v-if="selected"
				:cx="`${pt.x}`" :cy="`${pt.y}`" :r="`${size + 3}`" fill="none"
				:stroke="pt.color ?? color" />
		<circle :cx="`${pt.x}`" :cy="`${pt.y}`" :r="`${size}`" :fill="pt.color ?? color" />
		<text class="select-none"
			  :x="`${pt.x - 10}`" :y="`${pt.y + 18}`" font-size="12"
			  :fill="pt.color ?? color">{{ pt.id }}</text>
	</g>
</template>