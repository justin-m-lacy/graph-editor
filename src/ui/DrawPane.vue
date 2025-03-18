<script setup lang="ts">
import { useCanvasStore } from '@/store/canvas-store';
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TPoint } from '@/types/geom';
import CanvasPane from './CanvasPane.vue';
import Point from './Point.vue';

const pointStore = usePoints();
const clusters = useClusters();
const canvasStore = useCanvasStore();
const optsStore = useOptions();
const selectStore = useSelect();

const onDragStart = (evt: DragEvent, pt: TPoint) => {
	selectStore.select(pt);
	evt.dataTransfer?.setData('text/plain', pt.uid);
}

const onDragPt = (evt: DragEvent, pt: TPoint) => {
	canvasStore.toLocal(evt, pt);
}

const onDrop = (evt: DragEvent) => {

	evt.preventDefault();

	const ptUid = evt.dataTransfer?.getData('text/plain');
	if (ptUid) {

		console.log(`drop: ${evt.pageX},${evt.pageY}`);

		const pt = pointStore.get(ptUid);
		if (pt) {
			console.log(`pt: ${pt.x},${pt.y}`);
		}

	}

}

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

/*const starStyle = computed(() => {

	return {
		'background-color': optsStore.opts.bgColor ?? '#ff0000',
		blur: optsStore.opts.blur ? 'filter: blur(2px)' : undefined,
	}

});*/

</script>
<template>
	<div class="relative w-full h-full overflow-hidden">

		<div class="relative w-full h-full min-h-full min-w-full border border-black"
			 :style="canvasStore.canvasStyle()"
			 @wheel.prevent="onWheel"
			 @drop="onDrop" @dragover.prevent
			 @click="clickPt">

			<CanvasPane class="absolute w-full h-full min-w-full"
						:style="{ backgroundColor: optsStore.opts.bgColor ?? 'blue' }" />

			<Point v-for="[_, p] in pointStore.map" :key="p.uid" :pt="p"
				   :selected="selectStore.has(p.uid)"
				   @click.stop="selectStore.select(p)"
				   @click.shift="selectStore.add(p)"
				   @dragstart.stop="onDragStart($event, p)" @drag.stop="onDragPt($event, p)" />

		</div>
	</div>
</template>