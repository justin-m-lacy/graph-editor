<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { TCluster } from '@/types/geom';
import { useElementSize } from '@vueuse/core';
const svgRef = ref<SVGElement>();


const clusters = useClusters();
const selected = (con: TCluster) => {
	return clusters.selected?.uid == con.uid;
}

const { width, height } = useElementSize(svgRef);

onUpdated(() => {
	console.log(`cluster update`);
})
const style = computed(() => {
});

</script>
<template>
	<svg ref="svgRef" class="absolute w-full h-full" :view-box="`0 0 ${width} ${height}`">
		<circle cx="8" cy="4" r="8" fill="red" />
		<circle cx="100" cy="100" r="8" fill="purple" />
		<circle :cx="`${width}`" :cy="`${height}`" r="8" fill="green" />
		<g v-for="con of clusters.map.values()"
		   :class="selected(con) ? '' : undefined"
		   :stroke="selected(con) ? 'red' : (con.color ?? 'black')">
			<line v-for="[p1, p2] of con.links"
				  :x1="`'${p1.x}''`" :y1="`'${p1.y}'`"
				  :x2="`'${p2.x}'`" :y2="`'${p2.y}'`"
				  stroke-width="2" />
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