<script setup lang="ts">
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TPoint } from '@/types/geom';

const points = usePoints();
const select = useSelect();

const sorted = computed(() => {
	return Array.from(points.map.values()).sort((a, b) => a.id.localeCompare(b.id));
});

const minimize = ref(false);

const selPoint = (evt: MouseEvent, p: TPoint) => {

	if (evt.shiftKey) {
		select.toggle(p);
	} else {
		select.select(p);
	}

}

</script>
<template>

	<div class="flex flex-col">
		<div class="header" @click="minimize = !minimize">Points</div>
		<div v-if="!minimize" v-for="p in sorted"
			 class="flex border-b justify-between border-b-gray-700 px-2"
			 :class="select.has(p.uid) ? 'font-bold' : ''"
			 @click="selPoint($event, p)">
			<div>{{ p.id }}</div><span v-if="'name' in p && p.name">{{ p.name }}</span>
		</div>
	</div>
</template>