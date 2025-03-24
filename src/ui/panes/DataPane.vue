<script setup lang="ts">
import { round } from '@/util/dom';

const props = defineProps<{
	obj: object & any
}>();
console.log(`showin data`);
const values = computed(() => {

	const arr: Array<[string, any]> = [];

	for (const k in props.obj) {
		console.log(`k: ${k}`);
		const v = props.obj[k];
		if (typeof v === 'object') {
			arr.push([k, JSON.stringify(v)]);
		} else if (typeof v == 'number') {
			arr.push([k, round(v)]);
		} else {
			arr.push([k, v?.toString()]);
		}
	}

	return arr;

});
</script>
<template>
	<div class="flex flex-col">
		<div v-for="[k, v] in values" :key="k" class="flex">
			<span>{{ k }}:&nbsp;</span>
			<span>{{ v }}</span>
		</div>
	</div>
</template>