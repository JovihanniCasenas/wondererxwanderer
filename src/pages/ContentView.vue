<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import MarkdownContent from '@/components/MarkdownContent.vue'
import colors from '@/assets/styles/colors.js'
import { useContentStore } from '@/stores/content'

const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()

const contentStore = useContentStore()

const showBottomBtn = ref(false)

const el = useTemplateRef('content')
const { height } = useElementSize(el)

const onBack = () => {
    router.push('/content')
}

const computeShowBtn = () => {
    const cardH = height.value + 10 + 36 + 70
    const screenH = window.innerHeight
    console.log('jovihanni', height.value, cardH, screenH)
    showBottomBtn.value = cardH > screenH
}

const contentBodyClass = computed(() => {
    return mobile.value ? 'content-body-mobile' : 'content-body'
})

onBeforeMount(async () => {
    if (!route.params.id) router.push('/content')
    if (!contentStore.doneInit) {
        await contentStore.init()
        contentStore.doneInit = true
    }
    contentStore.getSelectedContent(route.params.id)
})

watch(
    height,
    () => computeShowBtn()
)
</script>

<template>
    <v-btn variant="text" rounded @click="onBack">
        <v-icon :color="colors.secondary">mdi-arrow-left</v-icon>
        Back
    </v-btn>
    <v-card class="content-wrapper" variant="elevated" ref="content">
        <v-card-title class="content-title text-wrap" :style="{ '--content-title-color': colors.primary }">
            {{ contentStore.selectedContent.title }}
        </v-card-title>

        <v-card-item :class="contentBodyClass">
            <p class="content-timestamp" :style="{ '--timestamp-color': colors.primary }">
                Published: {{ contentStore.selectedContent.published }}
            </p>

            <hr class="divider" :style="{ '--divider-color': colors.secondary }">

            <MarkdownContent :source="contentStore.selectedContent.body" />
        </v-card-item>
    </v-card>
    <v-btn variant="text" rounded @click="onBack" v-if="showBottomBtn">
        <v-icon :color="colors.secondary">mdi-arrow-left</v-icon>
        Back
    </v-btn>
</template>
