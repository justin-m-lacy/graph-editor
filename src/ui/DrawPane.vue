<script setup lang="ts">
import { useCanvasStore } from '@/store/canvas-store';
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TPoint } from '@/types/geom';
import { useEventListener } from '@vueuse/core';
import Point from './Point.vue';

const pointStore = usePoints();
const clusters = useClusters();
const canvasStore = useCanvasStore();
const optsStore = useOptions();
const selectStore = useSelect();

const dragTarg = ref<TPoint | null>(null);

const onWheel = (e: WheelEvent) => {

	let s = e.deltaY / 1000 + canvasStore.scale;
	s = Math.max(0.5, Math.min(1.5, s));

	canvasStore.setScale(s);

}

const clickPt = (e: MouseEvent) => {

	const coord = canvasStore.toLocal(e, { x: 0, y: 0 }, e.target as HTMLElement);
	pointStore.create(
		coord
	);

}

const addCluster = (uid: string) => {

	const con = clusters.selected ?? clusters.create();
	clusters.addPt(con, uid);

}

const mouseMove = (evt: MouseEvent) => {

	if (dragTarg.value) {
		canvasStore.toLocal(evt, dragTarg.value, evt.target as HTMLElement);
	}
}

const startDrag = (p: TPoint) => {
	selectStore.select(p);
	dragTarg.value = p;
}
const stopDrag = () => {
	dragTarg.value = null;
}

useEventListener('mouseup', stopDrag);

</script>
<template>
	<div class="relative w-full h-full overflow-hidden border border-black"
		 :style="{ backgroundColor: optsStore.opts.bgColor ?? 'blue' }">

		<div class="relative w-full h-full min-h-full min-w-full"
			 :style="canvasStore.canvasStyle()"
			 @wheel.prevent="onWheel"
			 @mousemove.self="mouseMove"
			 @click="clickPt">

			<Point v-for="[_, p] in pointStore.map" :key="p.uid"
				   :pt="p" :color="optsStore.ptColor!"
				   :selected="selectStore.has(p.uid)"
				   @click.stop
				   @mousedown="startDrag(p)"
				   @mousedown.shift="selectStore.add(p)" />

		</div>
	</div>
</template>