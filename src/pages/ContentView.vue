<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownContent from '@/components/MarkdownContent.vue'
import EmptyContent from '@/types/content.js'
import colors from '@/assets/styles/colors.js'
import { formatDate, parseDate } from '@/helper/dateformatter'

const route = useRoute()

let content = ref(EmptyContent)

const getContentStr = async (path) => {
    const resp = await fetch(path)
    const file = await resp.text()
    const match = file.match(/^([^\n]+)\n(\d{8})([\s\S]*)/m)
    content.value.title = match[1]. trim()
    content.value.published = formatDate(parseDate(match[2].trim()))
    content.value.body = match[3].trim()
}

onBeforeMount(async () => {
    await getContentStr(route.params.id.slice(1))
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
            {{ content.title }}
        </v-card-title>
        <v-card-item class="content-body">
            <p 
            class="content-timestamp" 
            :style="{ '--timestamp-color': colors.primary }"
            >
                Published: {{ content.published }}
            </p>

            <hr class="divider" :style="{ '--divider-color': colors.secondary }">

            <MarkdownContent
            :source="content.body"
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