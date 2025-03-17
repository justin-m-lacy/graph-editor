<script setup lang="ts">
import Point from './Point.vue';
import { usePoints } from '@/store/point-store';
import { TPoint } from '@/types/geom';
import { useClusters } from '@/store/clusters';
import { useCanvasStore } from '@/store/canvas-store';

const pointStore = usePoints();
const clusters = useClusters();
const canvasStore = useCanvasStore();

const onDragStart = (evt: DragEvent, pt: TPoint) => {
	pointStore.select(pt.uid);
	evt.dataTransfer?.setData('text/plain', pt.uid);
}

const onDragPt = (evt: DragEvent, pt: TPoint) => {
	canvasStore.toLocal(evt, pt);
}

const onDrop = (evt: DragEvent) => {

	evt.preventDefault();

	const ptId = evt.dataTransfer?.getData('text/plain');
	if (ptId) {

		console.log(`drop: ${evt.pageX},${evt.pageY}`);

		const pt = pointStore.get(ptId);
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

	const pt = canvasStore.toLocal(e, { x: 0, y: 0 }, e.target as HTMLElement);


	pointStore.create(
		pt
	);

}

const addCluster = (uid: string) => {

	const con = clusters.selected ?? clusters.create();
	clusters.addPt(con, uid);

}

</script>
<template>
	<div class="absolute w-full h-full overflow-hidden bg-mana-100">
		<div class="relative w-full h-full min-h-full min-w-full border border-black "
			 :style="canvasStore.canvasStyle()"
			 @wheel.prevent="onWheel"
			 @drop="onDrop" @dragover.prevent
			 @click="clickPt">

			<Point v-for="[_, p] in pointStore.points" :key="p.uid" :pt="p"
				   @click.stop="pointStore.select(p.uid)"
				   @click.shift="addCluster(p.uid)"
				   @dragstart.stop="onDragStart($event, p)" @drag.stop="onDragPt($event, p)" />

		</div>
	</div>
</template>