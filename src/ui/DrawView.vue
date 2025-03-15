<script setup lang="ts">
import { shallowRef } from 'vue';
import Point from './Point.vue';
import { usePtStore } from '@/store/point-store';
import PtInfo from './PtInfo.vue';

const scale = shallowRef<number>(1);
const dx = shallowRef<number>(0);
const dy = shallowRef<number>(0);

const ptStore = usePtStore();

const getStyle = () => {
	return {
		transform: `scale(${scale.value}) translate(${-dx.value}px,${-dy.value}px)`
	}
}

const onDrop = (e: DragEvent) => {

	e.preventDefault();

	const ptId = e.dataTransfer?.getData('text/plain');
	if (ptId) {

		const pt = ptStore.get(ptId);
		if (pt) {
			pt.x = e.pageX;
			pt.y = e.pageY;
		}

	}

}

const clickPt = (e: MouseEvent) => {

	const cx = e.clientX;
	const ox = e.offsetX;

	ptStore.add(
		{ id: window.crypto.randomUUID(), name: '', x: cx, y: e.clientY }
	);

}

</script>
<template>
	<div class="relative w-full h-full min-h-full min-w-full bg-slate-100" :style="getStyle()"
		 @drop="onDrop" @dragover.prevent
		 @click="clickPt">

		<PtInfo />
		<Point v-for="p in ptStore.points" :key="p.id" :pt="p" />

	</div>
</template>