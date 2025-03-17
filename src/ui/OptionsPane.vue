<script setup lang="ts">
import { useOptions } from '@/store/options-store';
import ColorOpt from './controls/ColorOpt.vue';


const optsStore = useOptions();

</script>
<template>
	<div class="flex flex-col h-full bg-earth-200 min-w-52 border border-black">

		<ColorOpt opt="bgColor" />
		<ColorOpt opt="ptColor" />


	</div>
</template>