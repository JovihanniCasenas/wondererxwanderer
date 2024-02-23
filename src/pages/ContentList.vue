<script setup>
import { onMounted, ref } from 'vue'
import ContentCard from '@/components/ContentCard.vue'
import Content from '@/types/content.js'
import EmptyContent from '@/types/content.js'
import { sortAndFormatDates } from '@/helper/dateformatter.js'
import { mdPaths, mdRaw } from '@/helper/paths'

let isLoading = ref(true)

let mdContents = ref([Content])

const getContentStr = async (path, raw) => {
    let content = { ...EmptyContent }
    content.key = path
    const match = raw.match(/^([^\n]+)\n(\d{8})([\s\S]{0,150})/m)
    content.title = match[1]. trim()
    content.published = match[2].trim()
    content.body = match[3].trim() + '...'
    
    return content
}

const getContents = async () => {
    let out = []
    for (let i = 0; i < mdPaths.length; i++) {
        out.push(await getContentStr(mdPaths[i], mdRaw[i]))
    }
    isLoading.value = false
    return out
}
 onMounted(async () => {
    mdContents.value = await getContents()
    mdContents.value = sortAndFormatDates(mdContents.value)
 })
</script>

<template>
    <ContentCard
    v-for="md in mdContents"
    :key="md.key"
    :id="md.key"
    :title="md.title"
    :published="md.published"
    :md-content="md.body"
    ></ContentCard>
</template>