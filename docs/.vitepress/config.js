export default {
    lang: "en-US",
    title: "html-scraper",
    description: "A simple HTML scraper",
    outDir: "../public",

    themeConfig: {
        logo: "/assets/logo.svg",
        siteTitle: "html-scraper",

        socialLinks: [ { icon: "github", link: "https://github.com/theworldcloud" } ],
        sidebar: [
            { 
                text: "Getting started", 
                collapsed: true,
                items: [ 
                    { text: "Introduction", link: "/" },
                    { text: "Installation", link: "/" } 
                ] 
            }
        ]
    },
}