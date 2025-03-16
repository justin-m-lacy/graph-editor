<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { TPoint } from '../types/geom';
import { usePoints } from '@/store/point-store';

const clusters = useClusters();
const pointStore = usePoints();

const selected = computed(() => {
	return clusters.selected
})

const curStars = computed(() => {

	const sel = selected.value;
	if (!sel) return;

	const starIds = sel.stars;
	const stars = <TPoint[]>[];

	for (let i = 0; i < starIds.length; i++) {

		const s = pointStore.get(starIds[i]);
		if (s) stars.push(s);
	}

	return stars;

});

const starIdClass = (s: TPoint) => {

	return {
		'font-bold': s.uid == pointStore.selected?.uid
	}
}

const select = (uid: string) => {
	clusters.select(uid);
}

const remove = (uid: string) => {
	clusters.remove(uid);
}


watch(() => clusters.selected, (sel) => {

}, { immediate: true, deep: true });

</script>
<template>
	<div class="flex flex-col  bg-earth-200 min-w-52 w-52">

		<button type="button" class="py-1 font-bold"
				@click.stop="clusters.create()">+ New Cluster</button>

		<div v-if="selected" class="flex flex-col flex-wrap min-h-52 border-t border-b border-blue-950
				 border-l-amber-950">

			<div class="flex justify-center font-bold bg-blue-300">Current Constellation</div>
			<input v-model="selected.id" placeholder="id"
				   class="bg-amber-700/40 px-2 text-amber-950 placeholder-amber-950/70">
			<input type="color" class="p-0 m-[2px] w-full" v-model="selected.color">
			<button type="button" class="bg-rose-900/50 font-bold py-1" @click="remove(selected.uid)">🗑 Delete
				Cluster</button>

			<div class="text-sm font-bold px-2 bg-amber-700/40">Stars</div>
			<div v-for="s in curStars" :key="s.uid" class="px-2"
				 :class="starIdClass(s)">
				<div>{{ s.id }}</div>
			</div>
		</div>

		<div class="font-bold px-1 bg-amber-700/40 ">constellations</div>
		<div v-for="[uid, con] in clusters.map">
			<div @click="select(uid)" :key="uid" class="px-2"
				 :class="uid == selected?.uid ? 'font-bold' : ''">{{ con.id }}</div>
		</div>

	</div>
</template>