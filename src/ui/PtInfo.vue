<script setup lang="ts">
import { usePtStore } from '@/store/point-store';
import { TPoint } from '@/types/geom';

const PadX = 12;
const PadY = 12;

const elRef = shallowRef<HTMLElement>();

const ptStore = usePtStore();

const pt = shallowRef();

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
		y = height - rect.height - PadY;
	}

	style.left = `${x}px`;
	style.top = `${y}px`;


}


watch(() => ptStore.selected, (sel) => {

	pt.value = sel;
	if (sel) {
		nextTick(() => positionAt(sel.x, sel.y));
	}

}, { immediate: true });

</script>
<template>
	<div ref="elRef" class="absolute bg-amber-600/40 w-40 flex flex-col flex-wrap" v-if="pt">

		<button type="button" @click="ptStore.remove(pt.id)">🗑</button>
		<input v-model="pt.name" placeholder="Name">
		<div>{{ pt.x }}, {{ pt.y }}</div>
	</div>
</template>