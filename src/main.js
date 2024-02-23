/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import '@/assets/styles/main.css'

// md Content
import { mdInit } from '@/helper/paths.js'

mdInit()

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
