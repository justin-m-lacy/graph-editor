<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TPoint } from '../../types/geom';

const clusters = useClusters();
const pointStore = usePoints();
const select = useSelect();

const curCluster = computed(() => {
	return clusters.selected
});

const curStars = computed(() => {

	const sel = curCluster.value;
	if (!sel) return;

	const starIds = sel.stars;
	const stars = <TPoint[]>[];

	for (let i = 0; i < starIds.length; i++) {

		const s = pointStore.get(starIds[i]);
		if (s) stars.push(s);
	}

	return stars;

});

function addConPt(evt: MouseEvent, p: TPoint) {

	const con = clusters.selected;
	if (!con) return;

	if (evt.shiftKey) {
		select.add(p);
	} else {
		select.select(p);
	}


}

const starIdClass = (s: TPoint) => {

	return {
		'font-bold': select.has(s.uid)
	}
}

function addPoints() {
	clusters.addPoints(select.list);
}

function removePoints() {
	clusters.removePoints(select.list);
}

function setCluster(uid: string) {
	clusters.select(uid);
}

function remove(uid: string) {
	clusters.remove(uid);
}


watch(() => clusters.selected, (sel) => {

}, { immediate: true, deep: true });

</script>
<template>
	<div class="flex flex-col  bg-earth-200 min-w-52 border-r border-black">

		<button type="button" class="py-1 font-bold"
				@click.stop="clusters.create()">+ New Cluster</button>

		<div v-if="curCluster" class="flex flex-col min-h-52 border-t-2 border-b-2 border-black
				 border-l-amber-950">

			<div class="flex justify-center font-semibold bg-blue-300">Current Cluster</div>
			⃠
			<button type="button" @click="clusters.deselect">[X] Deselect</button>
			<input v-model="curCluster.id" placeholder="id"
				   class="bg-amber-700/40 px-2 text-amber-950 placeholder-amber-950/70">

			<div class="flex items-center text-sm pl-1 font-semibold">color:<input type="color" class="p-0 grow mx-1"
					   v-model="curCluster.color">
			</div>

			<button type="button" class="bg-rose-900/50 font-bold py-1 border-t border-blue-950 border-b"
					@click="remove(curCluster.id)">🗑 Delete Cluster</button>

			<div class="text-sm font-bold px-2 bg-amber-700/40 border-b border-blue-950">Stars</div>
			<div v-for="s in curStars" :key="s.id" class="px-2 border-b border-blue-950"
				 :class="starIdClass(s)"
				 @click="addConPt($event, s)">
				{{ s.id }}
			</div>
		</div>

		<div class="flex flex-col">
			<div>Selected Stars</div>
			<div v-for="p in select.list" :key="p.uid">
				{{ p.id }}
			</div>
			<button type="button" @click="addPoints">+ Add All</button>
			<button type="button" title="Remove from Cluster"
					@click="removePoints">- Remove</button>
		</div>

		<div class="flex flex-col">
			<div class="font-bold px-1 bg-amber-700/40 border-b border-blue-950 ">clusters</div>
			<div v-for="[uid, con] in clusters.map" class="border-b border-blue-950">
				<input type="text" class="px-2 w-full" @click="setCluster(uid)" :key="uid"
					   v-model="con.id"
					   :class="uid == curCluster?.uid ? 'font-bold' : ''">
			</div>
		</div>

	</div>
</template>