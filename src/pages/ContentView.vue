<script setup>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownContent from '@/components/MarkdownContent.vue'
import colors from '@/assets/styles/colors.js'
import { useContentStore } from '@/stores/content'

const route = useRoute()

const contentStore = useContentStore()

onBeforeMount(async () => {
    contentStore.getSelectedContent(route.params.id)
})
</script>

<template>
    <v-card 
    class="content-wrapper"
    variant="elevated"
    >
        <v-card-title 
        class="content-title"
        :style="{ '--content-title-color': colors.primary }"
        >
            {{ contentStore.selectedContent.title }}
        </v-card-title>
        <v-card-item class="content-body">
            <p 
            class="content-timestamp" 
            :style="{ '--timestamp-color': colors.primary }"
            >
                Published: {{ contentStore.selectedContent.published }}
            </p>

            <hr class="divider" :style="{ '--divider-color': colors.secondary }">

            <MarkdownContent
            :source="contentStore.selectedContent.body"
            />
        </v-card-item>
    </v-card>
</template>

<style scoped>
.content-title {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 40px;
    text-align: center;
}
</style>