<script setup lang="ts">
import { useClusters } from '@/store/clusters';
import { useOptions } from '@/store/options-store';
import { usePoints } from '@/store/point-store';

const elRef = shallowRef<HTMLCanvasElement>();

const points = usePoints();
const clusters = useClusters();
const opts = useOptions();

const drawPoints = (ctx: CanvasRenderingContext2D) => {

	const base = opts.ptColor ?? '#000';
	const pi2 = 2 * Math.PI;

	for (const p of points.map.values()) {

		ctx.fillStyle = p.color ?? base;
		ctx.arc(p.x, p.y, p.r ?? 5, 0, pi2);
		ctx.fill();

	}

}

const drawClusters = (ctx: CanvasRenderingContext2D) => {

	const base = opts.lineColor ?? '#000';

	for (const con of clusters.map.values()) {

		ctx.strokeStyle = con.color ?? base;
		ctx.beginPath();

		for (const link of con.links) {

			const p1 = link[0];
			const p2 = link[1];

			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);

		}

		ctx.stroke();

	}

}


const update = () => {

	const el = elRef.value;
	if (!el) return;
	const ctx = el.getContext('2d');
	if (!ctx) return;

	console.log(`size: ${el.width},${el.height}`);
	ctx.clearRect(0, 0, el.width, el.height);

	drawPoints(ctx);
	drawClusters(ctx);

}

watchEffect(update);



</script>
<template>
	<canvas ref="elRef" class="w-full h-full">

	</canvas>
</template>