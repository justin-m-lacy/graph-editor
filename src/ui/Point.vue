<script setup lang="ts">
import { TPoint } from '@/types/geom';
import { usePtStore } from '../store/point-store';

const props = defineProps<{
	pt: TPoint
}>();

const pts = usePtStore();

const elRef = shallowRef<HTMLElement>();

const style = computed(() => {

	return {
		left: props.pt.x + 'px',
		top: props.pt.y + 'px'
	}

});

const select = () => { pts.select(props.pt.uid) }
const onDrag = (evt: DragEvent) => {

	evt.dataTransfer?.setData('text/plain', props.pt.uid);

	props.pt.x = evt.pageX
	props.pt.y = evt.pageY;

}

</script>
<template>
	<div class="absolute " draggable="true"
		 :style="style"
		 @drag="onDrag"
		 @click.stop="select">
		<div class="w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-700"></div>
	</div>
</template>