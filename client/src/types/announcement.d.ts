declare namespace Announcement {
  interface Info {
    userId: number
    title: string
    content: string
    pinned: boolean
    createTime: Date
    lastUpdateTime: Date
  }

  export type List = Omit<Info, 'content'> & {
    annId: number
  }[]

  interface CreateBody {
    title: string
    content: string
    pinned: boolean
  }
}
