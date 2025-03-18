<script setup lang="ts">
import { TPoint } from '@/types/geom';
import { positionElm } from "@/util/dom";
import { round } from '../util/dom';

const props = defineProps<{
	pts: TPoint[]
}>();

const emit = defineEmits<{
	(e: 'remove', id: string): void;
}>();

const elRef = shallowRef<HTMLElement>();

const first = shallowRef<TPoint | null>(null);

watch(() => props.pts, (sel) => {

	if (sel && sel.length > 0) {

		const pt = first.value = sel[0];
		nextTick(() => positionElm(elRef.value, pt.x, pt.y));

	} else {
		first.value = null;
	}

}, { immediate: true, deep: true });

</script>
<template>
	<div ref="elRef" class="absolute flex flex-col flex-wrap border border-gray-800
	border-t-8 border-t-amber-900 rounded-lg pb-1 p-1 shadow-lg
	 bg-earth-200 min-w-40 text-amber-950
	 " @click.stop v-if="first">

		<input v-model="first.id" placeholder="id" @click.stop
			   class="bg-amber-700/40 px-1 text-amber-950 placeholder-amber-950/70">
		<div class="flex items-center font-semibold text-sm">{{ round(first.x) }}, {{ round(first.y) }}</div>
		<input type="color" class="p-0 m-[2px] w-full" v-model="first.color">
		<input type="number" v-model="first.r">
		<button type="button" class="bg-rose-900/50" @click="emit('remove', first.id)">🗑</button>
		<div v-if="pts.length > 1">( {{ pts.length - 1 }} more...)</div>
	</div>
</template>