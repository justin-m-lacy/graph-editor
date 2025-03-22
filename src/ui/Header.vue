<script setup lang="ts">
import { loadJsonStr, useFileLink } from '@/export/files';
import { useDataStore } from '@/store/data-store';
import { usePoints } from '@/store/point-store';

const ptStore = usePoints();

function exportData() {

	const data = useDataStore().getData();
	useFileLink(data, 'stars.json');

}

const importPoints = () => {

}

const fileInput = ref<HTMLInputElement>();

const fileSelect = async (event: Event) => {

	try {

		const files = (event.target as HTMLInputElement).files;
		if (files && files.length > 0) {
			await loadFile(files);
		}

	} catch (err) {
		console.error(err);
	} finally {
		(event.target as HTMLInputElement).value = '';
	}

}

const loadFile = async (files: FileList) => {
	try {
		const fileData = await loadJsonStr(files);
		useDataStore().setData(fileData!);

	} catch (err) {
		console.error(err);
	}
}

const fileDrop = (e: DragEvent) => {

	const files = e.dataTransfer?.files;
	if (files && files.length > 0) {
		loadFile(files);
	}

}
const fileDrag = (e: DragEvent) => {
	e.preventDefault();
	e.dataTransfer!.dropEffect = 'copy';
}

</script>
<template>
	<div class="w-full px-4 bg-slate-900 text-slate-100">
		<button type="button" @click="exportData">Export</button>
		<button type="button" class="btn" id="drop-file"
				@click.stop.prevent="fileInput?.click()"
				@drop.prevent="fileDrop" @dragover="fileDrag"
				title="Import Data">
			[Import]
		</button>
		<input ref="fileInput" type="file" accept="text/json text/*"
			   class="hidden" @change="fileSelect($event)">
	</div>
</template>