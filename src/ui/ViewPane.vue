<script setup lang="ts">
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { useViewStore } from '@/store/view-store';
import { TPoint } from '@/types/geom';
import { useEventListener } from '@vueuse/core';
import SvgView from './items/SvgView.vue';

const pointStore = usePoints();
const viewStore = useViewStore();
const optsStore = useOptions();
const selectStore = useSelect();

let dragging = false;
let groupDrag = false;
/// previous point in drag operation.
let prevPt = { x: 0, y: 0 };

const container = ref<HTMLElement>();

const onWheel = (e: WheelEvent) => {

	let s = e.deltaY / 1000 + viewStore.scale;
	s = Math.max(0.5, Math.min(1.5, s));

	viewStore.setScale(s);

}

const makePoint = (e: MouseEvent) => {

	const coord = viewStore.toLocal(e, container.value!, { x: 0, y: 0 });
	const p = pointStore.create(
		coord
	);

	if (e.shiftKey) {
		selectStore.add(p);
	} else {
		selectStore.select(p);
	}

}

const mouseMove = (evt: MouseEvent) => {

	if (!dragging) return;

	const drags = selectStore.pts;
	if (drags.length <= 0) return;

	if (groupDrag) {

		const nextPt = { x: 0, y: 0 };
		viewStore.toLocal(evt, container.value!, nextPt,);

		const dx = nextPt.x - prevPt.x;
		const dy = nextPt.y - prevPt.y;
		prevPt.x = nextPt.x;
		prevPt.y = nextPt.y;

		for (let i = 0; i < drags.length; i++) {
			drags[i].x += dx;
			drags[i].y += dy;
		}

	} else {

		viewStore.toLocal(evt, container.value!, drags[0]);
	}


}

const selPoint = (evt: MouseEvent, p: TPoint) => {

	if (evt.shiftKey) {

		selectStore.add(p);
		groupDrag = true;

	} else {
		selectStore.select(p);
		groupDrag = false;
	}
	dragging = true;
	viewStore.toLocal(evt, container.value!, prevPt,);

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
		 @click="makePoint">

		<SvgView @clickPoint="selPoint"
				 :tx="viewStore.tx"
				 :ty="viewStore.ty"
				 :scale="viewStore.scale" />
	</div>
</template>