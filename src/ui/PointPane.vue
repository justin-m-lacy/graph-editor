<script setup lang="ts">
import { TPoint } from '@/types/geom';
import { round } from '../util/dom';
import { positionElm } from "@/util/dom";

const props = defineProps<{
	pt: TPoint
}>();

const emit = defineEmits<{
	(e: 'remove', id: string): void;
}>();

const elRef = shallowRef<HTMLElement>();

watch(() => props.pt, (sel) => {

	if (sel) {
		nextTick(() => positionElm(elRef.value, sel.x, sel.y));
	}

}, { immediate: true, deep: true });

</script>
<template>
	<div ref="elRef" class="absolute flex flex-col flex-wrap
	border-t-8 border-t-amber-900 rounded-t-lg rounded-b-sm pb-1 p-1
	 bg-earth-200 min-w-40 text-amber-950
	 " @click.stop>

		<input v-model="pt.id" placeholder="id" @click.stop
			   class="bg-amber-700/40 px-1 text-amber-950 placeholder-amber-950/70">
		<div class="flex items-center font-semibold">{{ round(pt.x) }}, {{ round(pt.y) }}</div>
		<input type="color" class="p-0 m-[2px] w-full" v-model="pt.color">
		<input type="number" v-model="pt.r">
		<button type="button" class="bg-rose-900/50" @click="emit('remove', pt.uid)">🗑</button>
	</div>
</template>