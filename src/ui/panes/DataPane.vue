<script setup lang="ts">
import { round } from '@/util/dom';

const props = defineProps<{
	obj: object & any
}>();

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
	<div class="flex flex-col px-1 text-sm">
		<div v-for="[k, v] in values" :key="k" class="flex">
			<span class="font-semibold">{{ k }}:&nbsp;</span>
			<span>{{ v }}</span>
		</div>
	</div>
</template>