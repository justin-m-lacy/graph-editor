<script setup lang="ts">
import { TPoint } from '@/types/geom';
const props = defineProps<{
	pt: TPoint,
	starStyle?: any | string | (string | any | undefined)[]
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
		<div class="w-[0.55rem] h-[0.55rem]
			-translate-x-1/2 -translate-y-1/2 rounded-full"
			 :style="[props.starStyle,
			pt.color ? `background-color:${pt.color}` : undefined,
			]">
		</div>
	</div>
</template>