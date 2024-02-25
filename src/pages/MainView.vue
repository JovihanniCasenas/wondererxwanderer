<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ContentList from './ContentList.vue';
import { useContentStore } from '@/stores/content'
import { useAppStateStore } from '@/stores/appState';

const contentStore = useContentStore()
const appState = useAppStateStore()
const router = useRouter()

onMounted(async () => {
    if(!contentStore.doneInit) {
        await contentStore.init()
        contentStore.doneInit = true
        appState.isLoading = false
    }

    router.push('/content')
})

</script>

<template>
    <ContentList />
</template>