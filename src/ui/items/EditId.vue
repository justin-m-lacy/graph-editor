<script setup lang="ts">
defineProps<{
	t: { id: string }
}>();
</script>
<template>
	<input class="bg-transparent  px-1 max-w-full w-full" type="text" v-model="t.id">
</template>