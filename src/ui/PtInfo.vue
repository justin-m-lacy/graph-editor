<script setup lang="ts">
import { TPoint } from '@/types/geom';

const props = defineProps<{
	pt: TPoint
}>();

const emit = defineEmits<{
	(e: 'remove', id: string): void;
}>();

const PadX = 12;
const PadY = 12;

const elRef = shallowRef<HTMLElement>();

const positionAt = (x: number, y: number) => {

	const el = elRef.value;
	if (!el) return;

	const style = el.style;
	const rect = el.getBoundingClientRect();

	const width = window.visualViewport?.width ?? 0;
	const height = window.visualViewport?.height ?? 0;

	if (x > width / 2) {
		x = (x - rect.width - PadX);
	} else {
		x = (x + PadX);
	}

	if (y < PadY) y = PadY;
	else if (y + rect.height > height - PadY) {
		y -= (rect.height + PadY);
	}

	style.left = `${x}px`;
	style.top = `${y}px`;


}


watch(() => props.pt, (sel) => {

	if (sel) {
		nextTick(() => positionAt(sel.x, sel.y));
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
		<div class="flex items-center font-semibold">{{ pt.x }}, {{ pt.y }}</div>
		<input type="color" class="p-0 m-[2px] w-full" v-model="pt.color">
		<button type="button" class="bg-rose-900/50" @click="emit('remove', pt.uid)">🗑</button>
	</div>
</template>