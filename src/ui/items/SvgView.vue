<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TCluster, TPoint } from '@/types/geom';
import { useElementSize } from '@vueuse/core';
import DrawCluster from './DrawCluster.vue';
import DrawPoint from './DrawPoint.vue';

const props = withDefaults(defineProps<{
	tx?: number,
	ty?: number,
	scale?: number
}>(), {
	tx: 0,
	ty: 0,
	scale: 1
});

const emit = defineEmits<{
	(e: 'clickPoint', evt: MouseEvent, pt: TPoint): void
}>();

const svgRef = ref<SVGElement>();
const opts = useOptions();

const selected = useSelect();
const points = usePoints();
const clusters = useClusters();
const conSelected = (con: TCluster) => {
	return clusters.selected?.uid == con.uid;
}

const { width, height } = useElementSize(svgRef);
</script>
<template>
	<svg ref="svgRef" class="absolute w-full h-full"
		 :viewBox="`${-tx / scale} ${-ty / scale} ${width / scale} ${height / scale}`">

		<DrawCluster v-for="con of clusters.map.values()" :key="con.uid"
					 :con="con"
					 stroke-width="2" :stroke="conSelected(con) ? opts.lineSelectColor : con.color ?? opts.lineColor" />
		<DrawPoint v-for="[_, p] in points.map" :key="p.uid"
				   :pt="p" :color="opts.ptColor!"
				   :radius="opts.ptRadius ?? 3"
				   :selected="selected.has(p.uid)"
				   @click.stop
				   @mousedown="emit('clickPoint', $event, p as TPoint)" />
	</svg>
</template>