<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { useViewStore } from '@/store/view-store';
import { TPoint } from '@/types/geom';
import { useEventListener } from '@vueuse/core';
import DrawClusters from './items/DrawClusters.vue';
import Point from './items/Point.vue';

const pointStore = usePoints();
const clusters = useClusters();
const viewStore = useViewStore();
const optsStore = useOptions();
const selectStore = useSelect();

let dragging = false;
let groupDrag = false;
/// previous point in drag operation.
let prevPt = { x: 0, y: 0 };

const container = ref<HTMLElement>();

const elRef = ref<HTMLElement>();

const onWheel = (e: WheelEvent) => {

	let s = e.deltaY / 1000 + viewStore.scale;
	s = Math.max(0.5, Math.min(1.5, s));

	viewStore.setScale(s);

}

const makePt = (e: MouseEvent) => {

	const coord = viewStore.toLocal(e, elRef.value!, { x: 0, y: 0 });

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

	if (!dragging) return;

	const drags = selectStore.list;
	if (drags.length <= 0) return;

	if (groupDrag) {

		const nextPt = { x: 0, y: 0 };
		viewStore.toLocal(evt, elRef.value!, nextPt,);

		const dx = nextPt.x - prevPt.x;
		const dy = nextPt.y - prevPt.y;
		prevPt.x = nextPt.x;
		prevPt.y = nextPt.y;

		for (let i = 0; i < drags.length; i++) {
			drags[i].x += dx;
			drags[i].y += dy;
		}

	} else {

		viewStore.toLocal(evt, elRef.value!, drags[0]);
	}


}

const clickPt = (evt: MouseEvent, p: TPoint) => {

	if (evt.shiftKey) {

		selectStore.add(p);
		groupDrag = true;

	} else {
		selectStore.select(p);
		groupDrag = false;
	}
	dragging = true;
	viewStore.toLocal(evt, elRef.value!, prevPt,);

}

const stopDrag = () => {
	dragging = false;
}

onMounted(() => {

	const w = container.value?.clientWidth ?? 0;
	const h = container.value?.clientHeight ?? 0;

	// center. initial position
	viewStore.setPos(w / 2, h / 2);

});

useEventListener('mouseup', stopDrag);

</script>
<template>
	<div ref="container" class="relative w-full h-full overflow-hidden border border-black"
		 :style="{ backgroundColor: optsStore.opts.bgColor ?? 'blue' }"
		 @mousemove="mouseMove"
		 @wheel.prevent="onWheel"
		 @click="makePt">


		<DrawClusters :tx="viewStore.tx" :ty="viewStore.ty" :scale="viewStore.scale" />

		<div ref="elRef" class="relative w-full h-full"
			 :style="viewStore.canvasStyle()">

			<Point v-for="[_, p] in pointStore.map" :key="p.uid"
				   :pt="p" :color="optsStore.ptColor!"
				   :selected="selectStore.has(p.uid)"
				   @click.stop
				   @mousedown="clickPt($event, p)" />

		</div>
	</div>
</template>