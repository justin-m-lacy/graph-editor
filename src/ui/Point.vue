<script setup lang="ts">
import { TPoint } from '@/types/geom';
const props = defineProps<{
	pt: TPoint
}>();

const style = computed(() => {

	return {
		left: props.pt.x + 'px',
		top: props.pt.y + 'px',
	}

});

</script>
<template>
	<div class="absolute " draggable="true" :style="style">
		<div class="w-3 h-3 -translate-x-1/2 -translate-y-1/2
			rounded-full"
			 :style="`background: ${props.pt.color ?? 'black'}`">
		</div>
	</div>
</template>