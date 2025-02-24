<script setup>
import colors from '@/assets/styles/colors'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { computed } from 'vue';

const router = useRouter()
const { mobile } = useDisplay()

const toHome = () => {
    router.push('/content')
}

const titleClass = computed(() => {
    return mobile.value ? 'app-header-title-mobile' : 'app-header-title'
})

const onOpenGmail = () => {
    window.location = "mailto:casenasjovihanni@gmail.com"
}

const onOpenLink = (link) => {
    window.open(link)
}
</script>

<template>
    <v-app-bar height="70" :color="colors.secondary" :elevation="2">
        <template v-slot:prepend>
            <img class="wxw-logo" src="@/assets/astronaut-no-bg.png" alt="wxw logo" @click="toHome">
        </template>

        <v-app-bar-title :class="titleClass">wondererxwanderer</v-app-bar-title>

        <template v-slot:append>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-menu" v-bind="props"></v-btn>

                </template>
                <v-list :bg-color="colors.secondary">
                    <v-list-item v-on:click="onOpenGmail" class="cursor-pointer">
                        <template #prepend>
                            <img class="logo" src="@/assets/socials/Gmail_white.png" alt="Email">
                        </template>
                        <v-list-item-title>Gmail</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-on:click="onOpenLink(`https://www.linkedin.com/in/jovihanni-casenas-189438286/`)" class="cursor-pointer">
                        <template #prepend>
                            <img class="logo" src="@/assets/socials/LinkedIN_white.png" alt="LinkedIn">
                        </template>
                        <v-list-item-title>LinkedIn</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-on:click="onOpenLink(`https://github.com/JovihanniCasenas`)" class="cursor-pointer">
                        <template #prepend>
                            <img class="logo" src="@/assets/socials/Github_white.png" alt="Github">
                        </template>
                        <v-list-item-title>Github</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>