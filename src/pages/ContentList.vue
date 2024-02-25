<script setup>
import ContentCard from '@/components/ContentCard.vue'
import { useAppStateStore } from '@/stores/appState'
import colors from '@/assets/styles/colors'
import { useContentStore } from '@/stores/content'

const appState = useAppStateStore()
const contentStore = useContentStore()

const clipBody = (body) => {
    let clipped = body.slice(0, 150)
    if(body.length > 150) return `${clipped}...`
    return clipped
}
</script>

<template>
    <v-overlay
    :model-value="appState.isLoading"
    class="align-center justify-center"
    :contained="true"
    :persistent="true"
    >
        <v-progress-circular 
        size="60" 
        indeterminate 
        :color="colors.primary"></v-progress-circular>
    </v-overlay>

    <ContentCard
    v-for="md in contentStore.contents"
    :key="md.key"
    :id="md.key"
    :title="md.title"
    :published="md.published"
    :md-content="clipBody(md.body)"
    ></ContentCard>
</template>