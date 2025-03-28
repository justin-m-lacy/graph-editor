<script setup lang="ts">
import { decodeAll } from '@/export/decode';
import { loadJsonFile } from '@/export/files';
import { useDataStore } from '@/store/data-store';
import { useOptions } from '@/store/options-store';
import { useFileSelect } from '../composables/file-select';

const emit = defineEmits<{
	(e: 'close'): void
}>()

const options = useOptions();

function getAtPath(data: any, path: string) {

	const parts = path.split('.');

	let sub = data;
	for (let i = 0; i < parts.length; i++) {

		sub = sub[parts[i]];
		if (!data) sub = {};
		else if (typeof sub !== 'object') {
			console.warn(`bad path type at: ${path}: ${parts[i]}`, sub);
			sub = {};
		}

	}

	return sub;

}

const loadAndMerge = async (files: FileList) => {
	try {

		const fileData = await loadJsonFile<any>(files);
		if (!fileData) return;

		const pointsData = getAtPath(fileData, options.pointsPath ?? '');
		const clustersData = getAtPath(fileData, options.clustersPath ?? '');

		const obj = decodeAll(pointsData, clustersData)!;
		useDataStore().mergeFrom(obj);

		emit('close');

	} catch (err) {
		console.error(err);
	}
}

const selectFile = useFileSelect(loadAndMerge);

const fileDragOver = (e: DragEvent) => {
	e.preventDefault();
	e.dataTransfer!.dropEffect = 'copy';
}

function dropFile(e: DragEvent) {
	const files = e.dataTransfer?.files;
	if (files && files.length > 0) {
		loadAndMerge(files);
	}
}

</script>
<template>
	<div class="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2
		min-h-max bg-earth-200 z-100 p-3
		flex flex-col gap-y-2">

		<button type="button" class="absolute top-0 right-1"
				@click="emit('close')">[X]</button>

		<div class="flex flex-col">
			<span class="text-xxs">path to points data</span>
			<input type="text" class="pl-1" v-model="options.pointsPath">
		</div>
		<div class="flex flex-col">
			<span class="text-xxs">path to clusters data</span>
			<input type="text" class="pl-1" v-model="options.clustersPath">
		</div>

		<button type="button" class=""
				@click.stop.prevent="selectFile.open"
				@drop.prevent="dropFile" @dragover="fileDragOver"
				title="Load File">
			Load
		</button>
	</div>
</template>