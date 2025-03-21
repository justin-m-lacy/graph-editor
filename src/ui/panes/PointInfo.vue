<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { useViewStore } from '@/store/view-store';
import { TPoint } from '@/types/geom';
import { positionElm, setElmPos } from "@/util/dom";
import { round } from '../../util/dom';

const clusters = useClusters();
const select = useSelect();
const points = usePoints();
const view = useViewStore();

const elRef = shallowRef<HTMLElement>();
const topPt = shallowRef<TPoint | null>(null);

const dragOffset = { x: 0, y: 0 };

let manualDrag = false;

const unlink = () => {
	clusters.unlinkPoints(select.pts);
}

const onDrag = (evt: MouseEvent) => {

	const elm = elRef.value;
	if (!elm) return;

	manualDrag = true;
	const parent = elm.parentElement!;

	const tx = evt.clientX - dragOffset.x - parent.offsetLeft;
	const ty = evt.clientY - dragOffset.y - parent.offsetTop;
	setElmPos(elm, tx, ty);

}

function startDrag(evt: MouseEvent) {

	dragOffset.x = evt.offsetX;
	dragOffset.y = evt.offsetY;

	window.addEventListener('mousemove', onDrag);
	window.addEventListener('mouseup', endDrag);
}

function endDrag() {
	window.removeEventListener('mousemove', onDrag);
	window.removeEventListener('mouseup', endDrag);
}

onUnmounted(() => {
	endDrag();
});

watch(() => select.pts, (sel) => {

	if (sel && sel.length > 0) {

		if (sel[0].uid != topPt.value?.uid) {
			manualDrag = false;
		}
		topPt.value = sel[0];

		if (!manualDrag) {
			nextTick(() => {
				if (elRef.value) positionElm(elRef.value, view.tx + view.scale * topPt.value!.x,
					view.ty + view.scale * topPt.value!.y
				)
			});
		}

	} else {
		topPt.value = null;
	}

}, { immediate: true, deep: true });

</script>
<template>
	<div ref="elRef" v-if="topPt" class="absolute flex flex-col flex-wrap border border-gray-800
	border-t-10 border-t-amber-900 rounded-lg pb-1 p-1 shadow-lg
	 bg-earth-200 min-w-40 text-amber-950"
		 @mousedown.self="startDrag"
		 @click.stop>

		<input v-model="topPt.id" placeholder="id" @click.stop
			   class="bg-amber-700/40 px-1 text-amber-950 placeholder-amber-950/70">

		<div class="flex justify-between px-1">
			<div class="flex items-center font-semibold text-sm">{{ round(topPt.x) }}, {{ round(topPt.y) }}</div>
			<input type="color" class="p-0 w-10 py-0" v-model="topPt.color">
		</div>

		<input type="number" class="px-1" placeholder="radius" v-model="topPt.r">

		<button type="button" class="bg-rose-900/50 border border-black"
				@click="points.deletePt(topPt.uid)">🗑</button>

		<div v-if="select.size > 1">( {{ select.size - 1 }} more...)</div>
		<button type="button" class="bg-rose-900/50 border border-black font-semibold"
				title="Link in current cluster"
				@click="clusters.linkAll(select.pts)">Link ALL</button>
		<button type="button" class="bg-rose-900/50 border border-black font-semibold"
				title="Link points in a line"
				@click="clusters.linkLine(select.pts)">Link LINE</button>
		<button type="button" class="bg-rose-900/50 border border-black font-semibold"
				title="Unlink points in cluster"
				@click="unlink">Unlink</button>
	</div>
</template>