<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { useDataStore } from '@/store/data-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import EditId from '@/ui/items/EditId.vue';
import { TCluster, TPoint } from '../../types/geom';
import ConfirmBtn from '../controls/ConfirmBtn.vue';

const clusters = useClusters();
const points = usePoints();
const select = useSelect();

const dataStore = useDataStore();

const curCluster = computed(() => clusters.selected);

const selectIn = (con: TCluster) => {
	select.selectAllIn(con);
}

const curStars = computed(() => {

	const sel = curCluster.value;
	if (!sel) return;

	const starIds = sel.stars;
	const stars = <TPoint[]>[];

	for (let i = 0; i < starIds.length; i++) {

		const s = points.get(starIds[i]);
		if (s) stars.push(s);
	}

	return stars;

});

function selConPt(evt: MouseEvent, p: TPoint) {

	if (evt.shiftKey) {

		select.toggle(p);

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
	<div class="flex flex-col grow bg-earth-200 min-w-52 w-52
		overflow-y-scroll min-h-full transition-all 
		border-r border-black select-none">

		<ConfirmBtn @confirm="dataStore.reset()">🗑 Delete All Points</ConfirmBtn>
		<button type="button" class="py-1 font-bold bg-blue-500/75"
				@click.stop="clusters.create()">+ New Cluster</button>

		<div v-if="curCluster" class="flex flex-col grow items-stretch transition-all
		border-t-2 border-b border-black">

			<div class="flex items-center justify-between font-bold header py-1">
				<EditId :it="curCluster" :id-check="clusters.checkId" />
				<button type="button" @click="clusters.deselect">[X]</button>
			</div>


			<div class="subheader flex gap-x-1">
				<span>id: </span>
				<EditId :it="curCluster" :id-check="clusters.checkId" />
			</div>

			<div class="flex items-center text-sm pl-1 h-5 font-semibold">
				color:<input type="color"
					   class="p-0 grow mx-1 h-5"
					   v-model="curCluster.color">
			</div>



			<div class="text-sm subheader flex justify-between">
				Cluster Stars
				<button type="button" class="px-1 bg-indigo-500/50" @click="selectIn(curCluster)">+Select All</button>
			</div>
			<div v-for="s in curStars" :key="s.uid" class="flex justify-between pr-1 border-b border-black/40">
				<EditId :it="s" :id-check="points.checkId"
						:class="starIdClass(s)"
						@click="selConPt($event, s)" />

				<button type="button" class="text-xs" @click="clusters.removePt(curCluster, s.uid)">[x]</button>
			</div>

			<button type="button" class="bg-rose-900/50 font-bold py-1 border-t border-blue-950 border-b"
					@click="deleteCluster(curCluster)">🗑 Delete Cluster</button>
		</div>


		<div class="flex flex-col grow">
			<div class="header">Clusters</div>
			<div v-for="[_, con] in clusters.map" :key="con.uid"
				 class="py-1 border-b border-black/40"
				 :class="con.uid == curCluster?.uid ? 'font-bold' : ''"
				 @click="setCluster(con)">

				<EditId :it="con" :id-check="clusters.checkId" />

			</div>
		</div>

		<div class="flex flex-col grow" v-if="select.pts.length > 0">
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