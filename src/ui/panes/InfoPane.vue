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
	clusters.addPoints(select.pts);
}

function removePoints() {
	clusters.removePoints(select.pts);
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

		<div v-if="curCluster" class="flex flex-col min-h-52 border-t-2 border-b border-black
				 border-l-amber-950">

			<div class="flex justify-between font-bold header">
				<div>cluster: {{ curCluster.id }}</div>
				<button type="button" @click="clusters.deselect">[ X ]</button>
			</div>


			<div class="subheader flex gap-x-1">
				<span>id: </span>
				<input v-model="curCluster.id" placeholder="id" class="px-1 bg-transparent">
			</div>

			<div class="flex items-center text-sm pl-1 h-5 font-semibold">
				color:<input type="color"
					   class="p-0 grow mx-1 h-5"
					   v-model="curCluster.color">
			</div>

			<button type="button" class="bg-rose-900/50 font-bold py-1 border-t border-blue-950 border-b"
					@click="remove(curCluster.id)">🗑 Delete Cluster</button>

			<div class="text-sm subheader">Stars</div>
			<div v-for="s in curStars" :key="s.id" class="px-2 border-b border-black/40"
				 :class="starIdClass(s)"
				 @click="addConPt($event, s)">
				{{ s.id }}
			</div>
		</div>


		<div class="flex flex-col">
			<div class="header">Clusters</div>
			<div v-for="[_, con] in clusters.map" class="py-1 border-b border-black/40"
				 :class="con.uid == curCluster?.uid ? 'font-bold' : ''">
				<input type="text" class="px-2 w-full bg-transparent" :key="con.uid"
					   @click="setCluster(con.uid)"
					   v-model="con.id">
			</div>
		</div>

		<div class="flex flex-col" v-if="select.pts.length > 0">
			<div class="subheader">Selected Points</div>
			<div v-for="p in select.pts" :key="p.uid" class="px-1 py-1 border-b border-black/40">
				{{ p.id }}
			</div>
			<div class="flex justify-stretch font-semibold">
				<button type="button" class="bg-lime-700/90 px-2 grow" @click="addPoints">+ Add All</button>
				<button type="button" class="bg-maroon-800/85 px-2 grow" title="Remove from Cluster"
						@click="removePoints">- Remove</button>
			</div>
		</div>


	</div>
</template>