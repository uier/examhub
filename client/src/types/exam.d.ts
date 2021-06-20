declare namespace Exam {
  interface CreateBody {
    courseId: number
    year: number
    semester: number
    title: string
    description: string
  }

  interface Info extends CreateBody {
    userId: number
    createTime: string
    lastUpdateTime: string
    score: number
    folderPath: string
  }

  interface ListItem extends Info {
    docId: number
  }
}
