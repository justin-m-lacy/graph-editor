<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';
import { useSelect } from '@/store/select-store';
import { TCluster, TPoint } from '@/types/geom';
import { useElementSize } from '@vueuse/core';
import SvgCluster from './SvgCluster.vue';
import SvgPoint from './SvgPoint.vue';

withDefaults(defineProps<{
	tx?: number,
	ty?: number,
	scale?: number
}>(), {
	tx: 0,
	ty: 0,
	scale: 1
});

const emit = defineEmits<{
	(e: 'dblclick', evt: MouseEvent, pt: TPoint): void;
	(e: 'clickPoint', evt: MouseEvent, pt: TPoint): void
}>();

const svgRef = ref<SVGElement>();
const opts = useOptions();

const selected = useSelect();
const points = usePoints();
const clusters = useClusters();
const isSelected = (con: TCluster) => clusters.selected?.uid == con.uid;

const { width, height } = useElementSize(svgRef);
</script>
<template>
	<svg ref="svgRef" class="absolute w-full h-full"
		 :viewBox="`${-(0.5 * width / scale) - tx} ${-(0.5 * height) / scale - ty} ${width / scale} ${height / scale}`">

		<template v-for="con of clusters.map.values()" :key="con.uid">
			<SvgCluster v-if="!opts.hideClusters || isSelected(con)"
						:con="con"
						stroke-width="1.6"
						:stroke="isSelected(con) ? opts.lineSelectColor : con.color ?? opts.lineColor" />
		</template>
		<SvgPoint v-for="[_, p] in points.map" :key="p.uid" :pt="p" :color="opts.ptColor!" :radius="opts.ptRadius ?? 3"
				  :selected="selected.has(p.uid)" @click.stop @dblclick="emit('dblclick', $event, p)"
				  @mousedown="emit('clickPoint', $event, p as TPoint)" />
	</svg>
</template>