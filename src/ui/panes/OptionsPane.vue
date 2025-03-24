<script setup lang="ts">
import { useOptions } from '@/store/options-store';
import ColorOpt from '@/ui/controls/ColorOpt.vue';
import NumberOpt from '@/ui/controls/NumberOpt.vue';
import BoolOpt from '../controls/BoolOpt.vue';


const optsStore = useOptions();

</script>
<template>
	<div class="flex flex-col">

		<ColorOpt opt="bgColor" />
		<ColorOpt opt="ptColor" />
		<ColorOpt opt="lineColor" />
		<ColorOpt opt="lineSelectColor" />
		<BoolOpt opt="hideClusters" />
		<NumberOpt opt="ptRadius" />
		<!--<NumberOpt opt="blur" />-->


	</div>
</template>