export default {
    lang: "en-US",
    title: "html-scraper",
    description: "A simple HTML scraper",

    themeConfig: {
        lastUpdated: true,
        logo: "/assets/logo.svg",
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
                text: "Usage", collapsed: true, items: [
                    { text: "Basic usage", link: "/usage" },
                    { text: "Types", link: "/types" },

                    { text: "Functions", link: "/functions", collapsed: true, items: [
                        { text: "find", link: "/functions/find" },
                    ]}
                ]
            }
        ]
    },
}