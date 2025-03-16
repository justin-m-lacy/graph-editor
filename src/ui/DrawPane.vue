<script setup lang="ts">
import { shallowRef } from 'vue';
import Point from './Point.vue';
import { usePoints } from '@/store/point-store';
import PointPane from './PointPane.vue';
import { TPoint } from '@/types/geom';
import { useClusters } from '@/store/clusters';
import { useCanvasStore } from '@/store/canvas-store';
import { toLocalPos } from '@/util/dom';

const ptStore = usePoints();
const clusters = useClusters();
const canvasStore = useCanvasStore();

const onDragStart = (evt: DragEvent, pt: TPoint) => {
	ptStore.select(pt.uid);
	evt.dataTransfer?.setData('text/plain', pt.uid);
}

const onDragPt = (evt: DragEvent, pt: TPoint) => {
	toLocalPos(evt, pt);
}

const onDrop = (evt: DragEvent) => {

	evt.preventDefault();

	const ptId = evt.dataTransfer?.getData('text/plain');
	if (ptId) {

		console.log(`drop: ${evt.pageX},${evt.pageY}`);

		const pt = ptStore.get(ptId);
		if (pt) {
			console.log(`pt: ${pt.x},${pt.y}`);
		}

	}

}

const onWheel = (e: WheelEvent) => {

	console.log(`delt: ${e.deltaY}`)
	let s = e.deltaY / 100 + canvasStore.scale;
	if (s < 0.5) s = 0.5;
	else if (s > 2) s = 2;

	canvasStore.setScale(s);

}

const clickPt = (e: MouseEvent) => {

	const pt = { x: 0, y: 0 };
	toLocalPos(e, pt, e.target as HTMLElement);

	ptStore.create(
		pt
	);

}

const addCluster = (uid: string) => {

	const con = clusters.selected ?? clusters.create();
	clusters.addPt(con, uid);

}

</script>
<template>
	<div class="relative w-full h-full min-h-full min-w-full bg-mana-950"
		 :style="canvasStore.canvasStyle()"
		 @wheel="onWheel"
		 @drop="onDrop" @dragover.prevent
		 @click="clickPt">

		<PointPane class="absolute z-100" v-if="ptStore.selected" :pt="ptStore.selected"
				   @remove="ptStore.remove" />
		<Point v-for="[_, p] in ptStore.points" :key="p.uid" :pt="p"
			   @click.stop="ptStore.select(p.uid)"
			   @click.shift="addCluster(p.uid)"
			   @dragstart.stop="onDragStart($event, p)" @drag.stop="onDragPt($event, p)" />

	</div>
</template>