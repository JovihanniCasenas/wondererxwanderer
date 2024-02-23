export const mdPaths = [
    '/src/assets/content/fall-of-the-great-wall.md',
    '/src/assets/content/fear-the-mirrors.md',
    '/src/assets/content/reduced-to-ashes.md'
]

export let mdRaw = []

export let mdContentView = {
    '/src/assets/content/fall-of-the-great-wall.md': '',
    '/src/assets/content/fear-the-mirrors.md': '',
    '/src/assets/content/reduced-to-ashes.md': ''
}

export const mdInit = async () => {
    let text = await import('@/assets/content/fall-of-the-great-wall.md?raw')
    mdRaw.push(text.default)
    mdContentView['/src/assets/content/fall-of-the-great-wall.md'] = text.default

    text = await import('@/assets/content/fear-the-mirrors.md?raw')
    mdRaw.push(text.default)
    mdContentView['/src/assets/content/fear-the-mirrors.md'] = text.default

    text = await import('@/assets/content/reduced-to-ashes.md?raw')
    mdRaw.push(text.default)
    mdContentView['/src/assets/content/reduced-to-ashes.md'] = text.default
}
