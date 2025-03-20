<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import EditId from '@/ui/items/EditId.vue';
import { TCluster, TPoint } from '../../types/geom';

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
	return select.has(s.uid) ? 'font-bold' : undefined;
}

function addPoints() {
	clusters.addPoints(select.pts);
}

function setCluster(con: TCluster) {
	clusters.select(con.uid);
}

function deleteCluster(con: TCluster) {
	clusters.remove(con.uid);
}


watch(() => clusters.selected, (sel) => {

}, { immediate: true, deep: true });

</script>
<template>
	<div class="flex flex-col  bg-earth-200 min-w-52 w-52 transition-all
		border-r border-black select-none">

		<button type="button" class="py-1 font-bold bg-blue-500/75"
				@click.stop="clusters.create()">+ New Cluster</button>

		<div v-if="curCluster" class="flex flex-col items-stretch transition-all
		border-t-2 border-b border-black">

			<div class="flex items-center justify-between font-bold header py-1">
				<EditId :t="curCluster" />
				<button type="button" @click="clusters.deselect">[X]</button>
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



			<div class="text-sm subheader">Stars</div>
			<div v-for="s in curStars" class="flex justify-between pr-1 border-b border-black/40">
				<EditId :key="s.id" :t="s"
						:class="starIdClass(s)"
						@click="addConPt($event, s)">
					{{ s.id }}
				</EditId>
				<button type="button" class="text-xs" @click="clusters.removePt(curCluster, s.uid)">[x]</button>
			</div>

			<button type="button" class="bg-rose-900/50 font-bold py-1 border-t border-blue-950 border-b"
					@click="deleteCluster(curCluster)">🗑 Delete Cluster</button>
		</div>


		<div class="flex flex-col">
			<div class="header">Clusters</div>
			<div v-for="[_, con] in clusters.map" class="py-1 border-b border-black/40"
				 :class="con.uid == curCluster?.uid ? 'font-bold' : ''">
				<input type="text" class="px-2 w-full bg-transparent" :key="con.uid"
					   @click="setCluster(con)"
					   v-model="con.id">
			</div>
		</div>

		<div class="flex flex-col" v-if="select.pts.length > 0">
			<div class="subheader">Selected Points</div>
			<div v-for="p in select.pts" :key="p.uid" class="px-1 py-1 border-b border-black/40">
				{{ p.id }}
			</div>
			<div class="flex text-xs justify-center bg-amber-500/30">Add/Remove to Cluster:</div>
			<div class="flex justify-stretch font-semibold">
				<button type="button" class="bg-blue-500/75 px-2 basis-1/2 border-black/20 border border-t-0"
						@click="addPoints">+ Add
					All</button>
				<button type="button"
						class="bg-red-700/85 px-2 basis-1/2  border-black/30 border border-t-0 "
						title="Remove from Cluster"
						@click="clusters.removePoints(select.pts)">Remove All</button>
			</div>
		</div>


	</div>
</template>