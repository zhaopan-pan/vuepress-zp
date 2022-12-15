import type { Article } from 'vuepress-plugin-blog2/client'

export interface IArticleInfo extends Record<string, unknown> {
  author: string
  date: string
  tag: string[]
  category: string[]
  readme?: boolean
  excerpt?: string
}

export type IArticleItem = Article<IArticleInfo>