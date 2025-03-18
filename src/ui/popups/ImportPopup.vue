<script setup lang="ts">
import { decodeAll } from '@/export/decode';
import { loadJsonFile } from '@/export/files';


const fileInputEl = ref<HTMLInputElement>();
const fileName = ref<string>();

// name of json section for points.
const pointsPath = ref<string>('types.stars');

// name of json section for clusters.
const clustersPath = ref<string>('types.constellations');

function getPath(data: any, path: string) {

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

		const pointsData = getPath(fileData, pointsPath.value);
		const clustersData = getPath(fileData, clustersPath.value);

		const result = decodeAll(pointsData, clustersData);
		if (!result) {
			console.warn(`decode failed`);
		} else {

		}


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
		<input type="text" v-model="pointsPath">
		<input type="text" v-model="clustersPath">

		<button type="button" class="btn" id="drop-file"
				@click.stop.prevent="fileInputEl?.click()"
				@drop.prevent="dropFile" @dragover="fileDragOver"
				title="Import Data">
			Import
		</button>
		<input ref="fileInputEl" type="file" accept="text/json text/*"
			   class="hidden" @change="selectFile($event)">
	</div>
</template>