declare namespace Announcement {
  interface Info {
    annId: number
    title: string
    content: string
    pinned: boolean
    createTime: string
    lastUpdateTime: string
  }

  export interface ListItem {
    annId: number
    title: string
    pinned: boolean
    createTime: string
    lastUpdateTime: string
  }

  interface CreateBody {
    title: string
    content: string
    pinned: boolean
  }
}
