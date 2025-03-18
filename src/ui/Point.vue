<script setup lang="ts">
import { TPoint } from '@/types/geom';
const props = defineProps<{
	pt: TPoint,
	selected?: boolean
}>();

const style = computed(() => {

	return {
		left: props.pt.x + 'px',
		top: props.pt.y + 'px',
	}

});

</script>
<template>
	<div class="absolute" draggable="true" :style="style">
		<div class="w-[0.55rem] h-[0.55rem] bg-transparent
			-translate-x-1/2 -translate-y-1/2 rounded-full"
			 :class="selected ? 'outline-1 outline-black outline-dashed' : undefined"
			 :style="style">
		</div>
	</div>
</template>