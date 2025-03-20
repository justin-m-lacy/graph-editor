<script setup lang="ts">
import { TPoint } from '@/types/geom';
const props = defineProps<{
	pt: TPoint,
	color: string,
	selected?: boolean
}>();

const size = computed(() => {

	return Math.max(2 * (props.pt.r ?? 4), 6);
});

const style = computed(() => {

	return {
		left: props.pt.x + 'px',
		top: props.pt.y + 'px',
	}

});

</script>
<template>
	<svg class="absolute box-content rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-transparent"
		 :width="size"
		 :height="size"
		 :style="style"
		 :class="selected ? 'outline-2 outline-black outline-dashed' : undefined">
		<circle cx="50%" cy="50%" r="40%" :fill="'black'" />
	</svg>

	<!--<div class="absolute" draggable="true" :style="style">
		<div class="w-[0.55rem] h-[0.55rem] bg-transparent
			-translate-x-1/2 -translate-y-1/2 rounded-full"
			 :class="selected ? 'outline-1 outline-black outline-dashed' : undefined"
			 :style="style">
		</div>
	</div>-->
</template>