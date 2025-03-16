<script setup lang="ts">
import { shallowRef } from 'vue';
import Point from './Point.vue';
import { usePtStore } from '@/store/point-store';
import PtInfo from './PtInfo.vue';
import { TPoint } from '@/types/geom';

const scale = shallowRef<number>(1);
const dx = shallowRef<number>(0);
const dy = shallowRef<number>(0);

const ptStore = usePtStore();

const getStyle = () => {
	return {
		transform: `scale(${scale.value}) translate(${-dx.value}px,${-dy.value}px)`
	}
}

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

	const cx = e.clientX;
	const ox = e.offsetX;

	ptStore.add(
		{ uid: window.crypto.randomUUID(), id: '', x: cx, y: e.clientY }
	);

}

</script>
<template>
	<div class="relative w-full h-full min-h-full min-w-full bg-slate-100" :style="getStyle()"
		 @drop="onDrop" @dragover.prevent
		 @click="clickPt">

		<PtInfo class="absolute z-100" v-if="ptStore.selected" :pt="ptStore.selected"
				@remove="ptStore.remove" />
		<Point v-for="p in ptStore.points" :key="p.uid" :pt="p"
			   @click.stop="ptStore.select(p.uid)"
			   @dragstart.stop="onDragStart($event, p)" @drag.stop="onDragPt($event, p)" />

	</div>
</template>