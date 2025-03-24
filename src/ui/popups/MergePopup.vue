<script setup lang="ts">
import { decodeAll } from '@/export/decode';
import { loadJsonFile } from '@/export/files';
import { useDataStore } from '@/store/data-store';


const fileInputEl = ref<HTMLInputElement>();
const fileName = ref<string>();

const dataStore = useDataStore();

// name of json section for points.
const pointsPath = ref<string>('types.stars');

// name of json section for clusters.
const clustersPath = ref<string>('types.constellations');

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

const loadFile = async (files: FileList) => {
	try {
		const fileData = await loadJsonFile<any>(files);
		if (!fileData) return;

		const pointsData = getAtPath(fileData, pointsPath.value);
		const clustersData = getAtPath(fileData, clustersPath.value);

		const obj = decodeAll(pointsData, clustersData)!;
		dataStore.mergeFrom(obj);

	} catch (err) {
		console.error(err);
	}
}

const fileDragOver = (e: DragEvent) => {
	e.preventDefault();
	e.dataTransfer!.dropEffect = 'copy';
}

function dropFile(e: DragEvent) {
	const files = e.dataTransfer?.files;
	if (files && files.length > 0) {
		loadFile(files);
	}
}

async function selectFile(evt: Event) {

	try {

		const files = (evt.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			await loadFile(files);
		}
	} catch (err) {
		console.error(err);
	} finally {
		(evt.target as HTMLInputElement).value = '';
	}
}
</script>
<template>
	<div class="absolute left-1/2 top-1/2">

		<input type="text" v-model="fileName">
		<div>
			<span class="text-xs">path to points data</span>
			<input type="text" v-model="pointsPath">
		</div>
		<div>
			<span class="text-xs">path to clusters data</span>
			<input type="text" v-model="clustersPath">
		</div>

		<button type="button" class="btn" id="drop-file"
				@click.stop.prevent="fileInputEl?.click()"
				@drop.prevent="dropFile" @dragover="fileDragOver"
				title="Load File">
			Load
		</button>
		<input ref="fileInputEl" type="file" accept="text/json text/*"
			   class="hidden" @change="selectFile($event)">
	</div>
</template>