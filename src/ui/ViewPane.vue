<script setup lang="ts">
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { useViewStore } from '@/store/view-store';
import { TPoint } from '@/types/geom';
import { useEventListener } from '@vueuse/core';
import { useDrag } from './composables/use-drag';
import SvgView from './items/SvgView.vue';

const points = usePoints();
const view = useViewStore();
const optsStore = useOptions();
const select = useSelect();

let draggingPt = false;
let groupDrag = false;
/// previous point in drag operation.
let prevPt = { x: 0, y: 0 };

const container = ref<HTMLElement>();
useDrag(container, view);

const onWheel = (e: WheelEvent) => {

	let s = e.deltaY / 1000 + view.scale;
	s = Math.max(0.5, Math.min(1.5, s));

	view.setScale(s);

}

const makePoint = (e: MouseEvent) => {

	const coord = view.toLocal(e, container.value!, { x: 0, y: 0 });
	const p = points.create(
		coord
	);

	if (e.shiftKey) {
		select.add(p);
	} else {
		select.select(p);
	}

}

const mouseMove = (evt: MouseEvent) => {

	if (!draggingPt) return;

	const drags = select.pts;
	if (drags.length <= 0) return;

	if (groupDrag) {

		const nextPt = { x: 0, y: 0 };
		view.toLocal(evt, container.value!, nextPt,);

		const dx = nextPt.x - prevPt.x;
		const dy = nextPt.y - prevPt.y;
		prevPt.x = nextPt.x;
		prevPt.y = nextPt.y;

		for (let i = 0; i < drags.length; i++) {
			drags[i].x += dx;
			drags[i].y += dy;
		}

	} else {

		view.toLocal(evt, container.value!, drags[0]);
	}


}

function onKeyDown(evt: KeyboardEvent) {

	if (evt.key == "Delete") {

		const pts = select.pts.concat();
		select.clear();

		for (let i = pts.length - 1; i >= 0; i--) {
			points.deletePt(pts[i].uid);
		}

	}
}

const selPoint = (evt: MouseEvent, p: TPoint) => {

	evt.stopPropagation();

	if (evt.shiftKey) {

		select.add(p);
		groupDrag = true;

	} else {
		select.select(p);
		groupDrag = false;
	}
	draggingPt = true;
	view.toLocal(evt, container.value!, prevPt,);

}

const stopPtDrag = () => {
	draggingPt = false;
}

onMounted(() => {

	const w = container.value?.clientWidth ?? 0;
	const h = container.value?.clientHeight ?? 0;

	// center. initial position
	view.setPos(w / 2, h / 2);

});

useEventListener('keydown', onKeyDown);
useEventListener('mouseup', stopPtDrag);

</script>
<template>
	<div ref="container" class="relative w-full h-full overflow-hidden border border-black"
		 :style="{ backgroundColor: optsStore.opts.bgColor ?? 'blue' }"
		 @mousemove="mouseMove"
		 @wheel.prevent="onWheel"
		 @click="makePoint">

		<SvgView @clickPoint="selPoint" id="SVGV?IEW"
				 :tx="view.tx"
				 :ty="view.ty"
				 :scale="view.scale" />
	</div>
</template>