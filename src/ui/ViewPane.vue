<script setup lang="ts">
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { useViewStore } from '@/store/view-store';
import { TPoint } from '@/types/geom';
import { useEventListener } from '@vueuse/core';
import { useViewDrag } from './composables/view-drag';
import SvgView from './items/SvgView.vue';

const MIN_SCALE = 0.25;
const MAX_SCALE = 1.5;

const points = usePoints();
const view = useViewStore();
const optsStore = useOptions();
const select = useSelect();

let draggingPt = false;
let groupDrag = false;
/// previous point in drag operation.
const prevPt = { x: 0, y: 0 };

const container = ref<HTMLElement>();
useViewDrag(container, view);

const onWheel = (e: WheelEvent) => {

	let s = e.deltaY / 1000 + view.scale;
	s = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

	view.setScale(s);

}

const makePoint = (e: MouseEvent) => {

	if (draggingPt) {
		return;
	}

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

const dragPt = (evt: MouseEvent) => {

	if (!draggingPt) return;

	const drags = select.pts;
	if (drags.length <= 0) return;

	if (groupDrag) {
		const nextPt = { x: 0, y: 0 };
		view.toLocal(evt, container.value!, nextPt);

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

		select.toggle(p);
		groupDrag = true;

	} else {
		select.select(p);
		groupDrag = false;
	}
	draggingPt = true;
	view.toLocal(evt, container.value!, prevPt);

}

const stopPtDrag = () => {

	if (!draggingPt) return;

	draggingPt = false;

	// swallow any click events.
	window.addEventListener('click', (e) => {

		e.preventDefault();
		e.stopPropagation();

	}, { capture: true, once: true });

}

onMounted(() => {
});

useEventListener('keydown', onKeyDown);
useEventListener('mouseup', stopPtDrag);

</script>
<template>
	<div ref="container" class="relative w-full h-full overflow-hidden border border-black"
		 :style="{ backgroundColor: optsStore.opts.bgColor ?? 'blue' }"
		 @mousemove="dragPt"
		 @wheel.prevent="onWheel"
		 @click="makePoint">

		<SvgView @clickPoint="selPoint" id="SVGV?IEW"
				 :tx="view.tx"
				 :ty="view.ty"
				 :scale="view.scale" />
	</div>
</template>