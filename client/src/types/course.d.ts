declare namespace Course {
  interface CreateBody {
    courseName: string
    deptName: string
    category: string
    description: string
  }

  interface Info extends CreateBody {
    courseId: number
  }
}
