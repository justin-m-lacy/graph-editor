<script setup lang="ts">
import { useOptions } from '@/store/options-store';
import ColorOpt from '@/ui/controls/ColorOpt.vue';
import NumberOpt from '@/ui/controls/NumberOpt.vue';


const optsStore = useOptions();

</script>
<template>
	<div class="flex flex-col h-full bg-earth-200 min-w-52 border border-black">

		<ColorOpt opt="bgColor" />
		<ColorOpt opt="ptColor" />
		<ColorOpt opt="lineColor" />
		<ColorOpt opt="lineSelectColor" />
		<NumberOpt opt="ptRadius" />
		<!--<NumberOpt opt="blur" />-->


	</div>
</template>