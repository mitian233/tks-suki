// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    nitro: {
        storage: {
            vercelKV: { driver: 'vercelKV' }
        }
    },
    app: {
        head: {
            title: 'まいにちつーちゃん',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                {name: 'og:title', content: 'まいにちつーちゃん'},
                {name: 'og:site_name', content: 'まいにちつーちゃん'},
                {name: 'og:description', content: '毎日にひとりつくしちゃんをあげます'},
                // {name: 'og:image', content: process.env.BASE_URL + '/ogp.jpg'},
                {name: 'og:url', content: process.env.BASE_URL},
                {name: 'twitter:card', content: 'summary_large_image'},
                {name: 'twitter:title', content: 'まいにちつーちゃん'},
                {name: 'twitter:creator', content: '@mikan_chn'},
                {name: 'twitter:description', content: '毎日にひとりつくしちゃんをあげます'},
                // {name: 'twitter:image', content: process.env.BASE_URL + '/ogp.jpg'},
            ]
        },
        pageTransition: {name: 'page', mode: 'out-in'},
    },

    devtools: {enabled: true},
    css: ['~/style.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    plugins: [
        '~/plugins/analytics.client.ts',
    ],

    modules: ["@nuxt/image"]
})
