declare namespace Express {
  interface User {
    userId: number
    name: string
  }
  interface Request {
    user?: User
  }
}
