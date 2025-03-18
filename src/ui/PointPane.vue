<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TPoint } from '@/types/geom';
import { positionElm } from "@/util/dom";
import { round } from '../util/dom';

const clusters = useClusters();
const select = useSelect();
const pointStore = usePoints();

const elRef = shallowRef<HTMLElement>();
const topPt = shallowRef<TPoint | null>(null);

const unlink = () => {
	clusters.unlink(Array.from(select.map.values()));
}
const linkAll = () => {
	clusters.link(Array.from(select.map.values()));
}

const removePt = (uid: string) => {
	pointStore.remove(uid)
}

watch(() => select.map, (sel) => {

	if (sel && sel.size > 0) {

		const pt = topPt.value = select.first();
		nextTick(() => {
			if (pt) positionElm(elRef.value, pt.x, pt.y)
		});

	} else {
		topPt.value = null;
	}

}, { immediate: true, deep: true });

</script>
<template>
	<div ref="elRef" class="absolute flex flex-col flex-wrap border border-gray-800
	border-t-8 border-t-amber-900 rounded-lg pb-1 p-1 shadow-lg
	 bg-earth-200 min-w-40 text-amber-950
	 " @click.stop v-if="topPt">

		<input v-model="topPt.id" placeholder="id" @click.stop
			   class="bg-amber-700/40 px-1 text-amber-950 placeholder-amber-950/70">
		<div class="flex items-center font-semibold text-sm">{{ round(topPt.x) }}, {{ round(topPt.y) }}</div>
		<input type="color" class="p-0 m-[2px] w-full" v-model="topPt.color">
		<input type="number" v-model="topPt.r">
		<button type="button" class="bg-rose-900/50" @click="removePt(topPt.uid)">🗑</button>
		<div v-if="select.map.size > 1">( {{ select.map.size - 1 }} more...)</div>
		<button type="button" class="bg-rose-900/50"
				title="Link in current cluster"
				@click="linkAll">Link All</button>
		<button type="button" class="bg-rose-900/50"
				title="Unlink points in cluster"
				@click="unlink">Unlink</button>
	</div>
</template>