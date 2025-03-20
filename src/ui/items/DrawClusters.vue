<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { TCluster } from '@/types/geom';
import { useElementSize } from '@vueuse/core';

const props = withDefaults(defineProps<{
	tx?: number,
	ty?: number,
	scale?: number
}>(), {
	tx: 0,
	ty: 0,
	scale: 1
});

const svgRef = ref<SVGElement>();
const opts = useOptions();

const clusters = useClusters();
const selected = (con: TCluster) => {
	return clusters.selected?.uid == con.uid;
}

const { width, height } = useElementSize(svgRef);
</script>
<template>
	<svg ref="svgRef" class="absolute w-full h-full"
		 :viewBox="`${-tx / scale} ${-ty / scale} ${width / scale} ${height / scale}`">
		<circle cx="0" cy="0" r="2" fill="red" />

		<circle :cx="`${width / scale}`" :cy="`${height / scale}`" r="8" fill="green" />
		<g v-for="con of clusters.map.values()" stroke-width="2"
		   :stroke="selected(con) ? opts.lineSelectColor : (con.color ?? opts.lineColor ?? 'black')">
			<line v-for="[p1, p2] of con.links"
				  :x1="`${p1.x}`" :y1="`${p1.y}`"
				  :x2="`${p2.x}`" :y2="`${p2.y}`" />
		</g>
	</svg>

	<!--<div class="absolute" draggable="true" :style="style">
		<div class="w-[0.55rem] h-[0.55rem] bg-transparent
			-translate-x-1/2 -translate-y-1/2 rounded-full"
			 :class="selected ? 'outline-1 outline-black outline-dashed' : undefined"
			 :style="style">
		</div>
	</div>-->
</template>