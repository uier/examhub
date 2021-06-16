declare namespace Express {
  interface User {
    userId: number
    name: string
    role: number
  }
  interface Request {
    user?: User
  }
}
