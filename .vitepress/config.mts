import { defineConfig } from 'vitepress'

export default defineConfig({
  // 基本配置
  title: 'SealChat 使用手册',
  description: '自托管的轻量即时通讯与角色协作平台',
  lang: 'zh-CN',

  // 构建输出目录
  outDir: 'docs',


  // 基础路径（如果部署到子路径需要修改）
  base: '/',

  // 主题配置
  themeConfig: {
    // Logo
    logo: '/logo.svg',
    siteTitle: 'SealChat',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速入门', link: '/guide/quick-start' },
      {
        text: '功能指南',
        items: [
          { text: '功能总览', link: '/guide/features' },
          { text: '新手引导', link: '/guide/features/onboarding' },
          { text: '消息与聊天', link: '/guide/features/messaging' },
          { text: '骰子与跑团工具', link: '/guide/features/dice' },
          { text: '身份卡与角色', link: '/guide/features/identities' },
          { text: '附件、图库与音频', link: '/guide/features/assets' },
          { text: '搜索与导出', link: '/guide/features/search-export' },
          { text: '社交与世界', link: '/guide/features/social' },
          { text: '协作工具', link: '/guide/features/tools' },
          { text: '显示与通知设置', link: '/guide/features/settings' },
          { text: '集成与扩展', link: '/guide/features/integrations' }
        ]
      },
      {
        text: '管理员',
        items: [
          { text: '管理员入门', link: '/admin/' },
          { text: '用户与 Bot', link: '/admin/user-bot' },
          { text: '世界与频道', link: '/admin/world-channel' },
          { text: '系统与存储', link: '/admin/system-storage' },
          { text: '监控与维护', link: '/admin/maintenance' }
        ]
      },
      {
        text: '开发集成',
        items: [
          { text: 'Webhook 集成', link: '/developer/webhook' },
          { text: 'SealDice 对接', link: '/developer/sealdice' },
          { text: 'API 参考', link: '/developer/api' }
        ]
      },
      {
        text: '更多',
        items: [
          { text: '配置参考', link: '/reference/configuration' },
          { text: '常见问题', link: '/reference/faq' },
          { text: 'GitHub', link: 'https://github.com/kagangtuya-star/sealchat' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '快速入门', link: '/guide/quick-start' },
            { text: '核心概念', link: '/guide/concepts' }
          ]
        },
        {
          text: '功能详解',
          items: [
            { text: '功能总览', link: '/guide/features' },
            { text: '新手引导', link: '/guide/features/onboarding' },
            { text: '消息与聊天', link: '/guide/features/messaging' },
            { text: '骰子与跑团工具', link: '/guide/features/dice' },
            { text: '身份卡与角色', link: '/guide/features/identities' },
            { text: '附件、图库与音频', link: '/guide/features/assets' },
            { text: '搜索与导出', link: '/guide/features/search-export' },
            { text: '社交与世界', link: '/guide/features/social' },
            { text: '协作工具', link: '/guide/features/tools' },
            { text: '显示与通知设置', link: '/guide/features/settings' },
            { text: '集成与扩展', link: '/guide/features/integrations' }
          ]
        }
      ],
      '/admin/': [
        {
          text: '管理员指南',
          items: [
            { text: '管理员入门', link: '/admin/' },
            { text: '用户与 Bot', link: '/admin/user-bot' },
            { text: '世界与频道', link: '/admin/world-channel' },
            { text: '系统与存储', link: '/admin/system-storage' },
            { text: '监控与维护', link: '/admin/maintenance' }
          ]
        }
      ],
      '/developer/': [
        {
          text: '开发与集成',
          items: [
            { text: 'Webhook 集成', link: '/developer/webhook' },
            { text: 'SealDice 对接', link: '/developer/sealdice' },
            { text: 'API 参考', link: '/developer/api' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考文档',
          items: [
            { text: '配置参考', link: '/reference/configuration' },
            { text: '常见问题', link: '/reference/faq' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kagangtuya-star/sealchat' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024 SealChat Team'
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲
    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/kagangtuya-star/sealchat-manual/edit/main/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 切换外观
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  ignoreDeadLinks: [
    /http:\/\/localhost:3212\/.*/,
    /docs\/product-introduction/
  ],

  // 最后更新时间
  lastUpdated: true,

  // 清理 URL
  cleanUrls: true,

  // Head 标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'SealChat 使用手册' }],
    ['meta', { name: 'og:description', content: '自托管的轻量即时通讯与角色协作平台' }]
  ]
})
