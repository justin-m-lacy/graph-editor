<script setup lang="ts">
import { round } from '../util/dom';
import { useConstellations } from '@/store/constellations';

const constellations = useConstellations();

const selected = computed(() => {
	return constellations.selected
})

const select = (uid: string) => {
	constellations.select(uid);
}

const remove = (uid: string) => {
	constellations.remove(uid);
}


watch(() => constellations.selected, (sel) => {

}, { immediate: true, deep: true });

</script>
<template>
	<div class="flex flex-col  bg-earth-200 min-w-52 w-52">

		<div v-if="selected" class="flex flex-col flex-wrap pb-1 p-1 min-h-52
				border-b border-l-amber-950">

			<input v-model="selected.id" placeholder="id"
				   class="bg-amber-700/40 px-1 text-amber-950 placeholder-amber-950/70">
			<input type="color" class="p-0 m-[2px] w-full" v-model="selected.color">
			<button type="button" class="bg-rose-900/50" @click="remove(selected.uid)">🗑</button>

			<div v-for="s in selected.stars">
				<div>{{ s }}</div>
			</div>
		</div>

		<div v-for="[uid, con] in constellations.map">
			<div @click="select(uid)" :key="uid">{{ con.id }}</div>
		</div>

	</div>
</template>