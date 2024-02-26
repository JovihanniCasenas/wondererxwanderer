import { defineStore } from 'pinia'
import { ref } from 'vue'
import EmptyContent from '@/types/content'
import { sortAndFormatDates } from '@/helper/dateformatter'
import { useAppStateStore } from './appState'

const appState = useAppStateStore()

export const useContentStore = defineStore('content', () => {
    const doneInit = ref(false)
    const selectedContent = ref({})
    let contents = ref([])

    const createEmptyContent = () => {return { ...EmptyContent }}

    const contentByParts = (raw, content, key) => {
        const match = raw.match(/^([^\n]+)\n(\d{8})([\s\S]*)/m)
        content.key = key
        content.title = match[1]. trim()
        content.published = match[2].trim()
        content.body = match[3].trim()
        return content
    }

    const init = async () => {
        contents.value.push(
            contentByParts(
                (await import('@/assets/content/fall-of-the-great-wall.md?raw')).default, 
                createEmptyContent(),
                'fall-of-the-great-wall.md'
            )
        )
        contents.value.push(
            contentByParts(
                (await import('@/assets/content/fear-the-mirrors.md?raw')).default, 
                createEmptyContent(),
                'fear-the-mirrors.md'
            )
        )
        contents.value.push(
            contentByParts(
                (await import('@/assets/content/reduced-to-ashes.md?raw')).default, 
                createEmptyContent(),
                'reduced-to-ashes.md'
            )
        )
        contents.value.push(
            contentByParts(
                (await import('@/assets/content/losing-dipper.md?raw')).default, 
                createEmptyContent(),
                'losing-dipper.md'
            )
        )

        contents.value = sortAndFormatDates(contents.value)
    }

    const getSelectedContent = (key) => {
        for(const content of contents.value) {
            if (content.key === key) {
                appState.isLoading = false
                selectedContent.value = content
                return
            }
        }
    }

    return {
        doneInit,
        selectedContent,
        contents,
        init,
        getSelectedContent
    }
})