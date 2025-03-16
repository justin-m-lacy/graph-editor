<script setup lang="ts">
import { shallowRef } from 'vue';
import Point from './Point.vue';
import { usePtStore } from '@/store/point-store';
import PointPane from './PointPane.vue';
import { TPoint } from '@/types/geom';
import { useConstellations } from '@/store/constellations';
import { useCanvasStore } from '@/store/canvas-store';

const ptStore = usePtStore();
const constellations = useConstellations();
const canvasStore = useCanvasStore();

const onDragStart = (evt: DragEvent, pt: TPoint) => {
	ptStore.select(pt.uid);
	evt.dataTransfer?.setData('text/plain', pt.uid);
}

const onDragPt = (evt: DragEvent, pt: TPoint) => {

	const parent = (evt.target as HTMLElement).parentElement ?? document.body;
	const parentRect = parent.getBoundingClientRect();

	pt.x = evt.pageX - parentRect.x;
	pt.y = evt.pageY - parentRect.y;

}

const onDrop = (evt: DragEvent) => {

	evt.preventDefault();

	const ptId = evt.dataTransfer?.getData('text/plain');
	if (ptId) {

		const pt = ptStore.get(ptId);
		if (pt) {
		}

	}

}

const clickPt = (e: MouseEvent) => {

	ptStore.create(
		{
			uid: window.crypto.randomUUID(),
			id: '', x: e.clientX, y: e.clientY,
			r: 3
		}
	);

}

const addConstellation = (uid: string) => {

	const con = constellations.selected ?? constellations.create();
	constellations.addPt(con, uid);

}

</script>
<template>
	<div class="relative w-full h-full min-h-full min-w-full bg-mana-950"
		 :style="canvasStore.canvasStyle()"
		 @drop="onDrop" @dragover.prevent
		 @click="clickPt">

		<PointPane class="absolute z-100" v-if="ptStore.selected" :pt="ptStore.selected"
				   @remove="ptStore.remove" />
		<Point v-for="[_, p] in ptStore.points" :key="p.uid" :pt="p"
			   @click.stop="ptStore.select(p.uid)"
			   @click.shift="addConstellation(p.uid)"
			   @dragstart.stop="onDragStart($event, p)" @drag.stop="onDragPt($event, p)" />

	</div>
</template>