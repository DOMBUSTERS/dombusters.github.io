import type { Site, Ui, Features } from './types'

export const SITE: Site = {
  website: 'https://astro-antfustyle-theme.vercel.app/',
  base: '/',
  title: 'DOMBUSTERS Official',
  description:
    'The official DOMBUSTERS blog site. We do ctfs, and ctfs. And then ctfs.',
  author: 'DOMBUSTERS',
  lang: 'en',
  ogLocale: 'en_US',
}

export const UI: Ui = {
  internalNavs: [
    {
      path: '/blog',
      title: 'Blog',
      displayMode: 'textToIconOnMobile',
      text: 'Blog',
      icon: 'i-ri-article-line',
    },
  ],
  socialLinks: [
    {
      link: 'https://github.com/DOMBUSTERS',
      title: 'DOMBUSTERS on Github',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
  ],
  navBarLayout: {
    left: [],
    right: [
      'internalNavs',
      'socialLinks',
      'searchButton',
      'themeButton',
      'rssLink',
    ],
  },
  tabbedLayoutTabs: [
    { title: 'Changelog', path: '/changelog' },
    { title: 'AstroBlog', path: '/feeds' },
    { title: 'AstroStreams', path: '/streams' },
  ],
  maxGroupColumns: 3,
  showGroupItemColorOnHover: true,
}

/**
 * Configures whether to enable special features:
 *  - Set to `false` or `[false, {...}]` to disable the feature.
 *  - Set to `[true, {...}]` to enable and configure the feature.
 */
export const FEATURES: Features = {
  share: [
    false,
    {
      twitter: [true, '@ste7lin'],
      mastodon: [true, '@ste7lin@fairy.id'],
      facebook: false,
      pinterest: false,
      reddit: false,
      telegram: false,
      whatsapp: false,
      email: false,
    },
  ],
  toc: [
    true,
    {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'left',
      displayMode: 'hover',
    },
  ],
  ogImage: [
    true,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
    },
  ],
}
