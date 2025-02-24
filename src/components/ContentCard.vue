<script setup>
import MarkdownContent from './MarkdownContent.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import colors from '@/assets/styles/colors.js'

const router = useRouter()
const { mobile } = useDisplay()

defineProps({
    id: {
        default: ''
    },
    title: {
        default: 'no title'
    },
    published: {
        default: 'unknown'
    },
    mdContent: {
        default: 'empty'
    }
})

const contentCardBodyClass = computed(() => {
    return mobile.value ? 'content-card-body-mobile' : 'content-card-body'
})

const toContent = (id) => {
    router.push({ name: 'content', params: { id: id }})
}
</script>

<template>
    <v-card 
    class="content-card"
    variant="elevated"
    @click="toContent(id)"
    >
        <v-card-title 
        class="content-card-title text-wrap"
        :style="{ '--content-card-title': colors.primary }"
        >
            {{ title }}
        </v-card-title>
        <v-card-subtitle>{{ published }}</v-card-subtitle>
        <MarkdownContent
            :class="contentCardBodyClass"
            :source="mdContent"
        />
    </v-card>
</template>