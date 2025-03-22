<script setup lang="ts" generic="T extends {id:string}">
const props = defineProps<{
	it: T,
	idCheck?: (it: T, v: string) => boolean
}>();

const localId = shallowRef<string>(props.it.id);
const error = shallowRef<boolean>(false);

watch(()=>props.it, (item)=>{
	localId.value=item.id;
})

const onInput = (v: Event) => {

	const targ = v.target as HTMLInputElement;
	const idCheck = props.idCheck;

	if (idCheck && !idCheck(props.it, localId.value)) {
		targ.setCustomValidity('Id must be unique.');
		error.value = true;
	} else {
		error.value = false;
		props.it.id = localId.value
	}

}
</script>
<template>
	<input type="text" class="bg-transparent  px-1 max-w-full w-full"
		   :class="error ? 'focus:outline focus:outline-red-700 focus:outline-2 outline outline-red-700 outline-2' : ''"
		   @input="onInput" v-model="localId">
</template>