<script setup lang="ts">
import { encodePoints, parsePoints } from '@/export/encode';
import { readJsonFile } from '@/export/files';
import { usePtStore } from '@/store/point-store';
import { TPoint } from '@/types/geom';

const ptStore = usePtStore();

const expPoints = () => {

	const json = encodePoints(ptStore.points);

}

const importPoints = () => {

	const json = encodePoints(ptStore.points);

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
		const fileData = await readJsonFile<TPoint[]>(files);
		if (fileData) {

			const points = parsePoints(fileData);
			if (points) {
				ptStore.setPoints(points);
			}

		}
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
	<div class="w-full">
		<button type="button" @click="expPoints">Export</button>
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