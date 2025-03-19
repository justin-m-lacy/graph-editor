<script setup lang="ts">
import { useCanvasStore } from '@/store/canvas-store';
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TPoint } from '@/types/geom';
import { useEventListener } from '@vueuse/core';
import DrawClusters from './items/DrawClusters.vue';
import Point from './items/Point.vue';

const pointStore = usePoints();
const clusters = useClusters();
const canvasStore = useCanvasStore();
const optsStore = useOptions();
const selectStore = useSelect();

const dragTarg = ref<TPoint | null>(null);

const container = ref<HTMLElement>();

const elRef = ref<HTMLElement>();

const onWheel = (e: WheelEvent) => {

	let s = e.deltaY / 1000 + canvasStore.scale;
	s = Math.max(0.5, Math.min(1.5, s));

	canvasStore.setScale(s);

}

const makePt = (e: MouseEvent) => {

	const coord = canvasStore.toLocal(e, { x: 0, y: 0 }, elRef.value);

	const p = pointStore.create(
		coord
	);

	if (e.shiftKey) {
		selectStore.add(p);
	} else {
		selectStore.select(p);
	}

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

const clickPt = (evt: MouseEvent, p: TPoint) => {

	if (evt.shiftKey) {
		selectStore.add(p);
	} else {
		selectStore.select(p);
		dragTarg.value = p;
	}

}

const stopDrag = () => {
	dragTarg.value = null;
}

onMounted(() => {

	const w = container.value?.clientWidth ?? 0;
	const h = container.value?.clientHeight ?? 0;

	// center. initial position
	canvasStore.setPos(w / 2, h / 2);

});

useEventListener('mouseup', stopDrag);

</script>
<template>
	<div ref="container" class="relative w-full h-full overflow-hidden border border-black"
		 :style="{ backgroundColor: optsStore.opts.bgColor ?? 'blue' }"
		 @click="makePt">

		<div ref="elRef" class="relative w-full h-full"
			 :style="canvasStore.canvasStyle()"
			 @wheel.prevent="onWheel"
			 @mousemove.self="mouseMove">

			<DrawClusters />
			<Point v-for="[_, p] in pointStore.map" :key="p.uid"
				   :pt="p" :color="optsStore.ptColor!"
				   :selected="selectStore.has(p.uid)"
				   @click.stop
				   @mousedown="clickPt($event, p)" />

		</div>
	</div>
</template>