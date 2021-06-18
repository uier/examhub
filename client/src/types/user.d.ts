declare namespace User {
  interface Info {
    userId: number
    name: string
    role: number
  }

  interface Detail extends Info {
    contribution: number
    email: string
    createTime: string
  }
}
