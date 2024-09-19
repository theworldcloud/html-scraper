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

        socialLinks: [
            {
                link: "https://theworldcloud.dk",
                icon: {
                    svg: `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                        </svg>
                    `
                }
            },
            { link: "https://github.com/theworldcloud", icon: "github" },
        ],

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