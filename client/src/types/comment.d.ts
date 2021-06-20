declare namespace Comment {
  interface Info {
    comId: number
    replyId: number
    userId: number
    content: string
    createTime: string
    lastUpdateTime: string
    replies?: Comment.Info[]
  }

  interface CreateBody {
    replyId: number
    content: string
  }
}
