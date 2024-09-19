export default {
    lang: "en-US",
    title: "html-scraper",
    description: "A simple HTML scraper",

    head: [
        [ "link", { rel: "icon", href: "/logo.svg" } ]
    ],

    themeConfig: {
        lastUpdated: true,
        logo: "/logo.svg",
        siteTitle: "html-scraper",

        socialLinks: [ { icon: "github", link: "https://github.com/theworldcloud" } ],
        sidebar: [
            { 
                text: "Getting started", collapsed: false, items: [
                    { text: "Introduction", link: "/" },
                    { text: "Installation", link: "/installation" }
                ] 
            },

            {
                text: "Usage", collapsed: false, items: [
                    { text: "Basic usage", link: "/usage" },
                    { text: "Types", link: "/types" },

                    { text: "Functions", link: "/functions", collapsed: false, items: [
                        { text: "find", link: "/functions/find" },
                        { text: "findAll", link: "/functions/findAll" },
                    ]}
                ]
            }
        ]
    },
}