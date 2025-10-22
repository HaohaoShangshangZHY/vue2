// src/services/StudentService.ts
import axios from 'axios'

// 定义学生数据类型（与接口返回字段匹配）
export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string
  penAmount: number
  description: string
}

// 获取所有学生信息的函数
export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await axios.get<Student[]>(
      'https://dv-student-backend-2019.appspot.com/students',
    )
    return response.data // 返回解析后的学生数组
  } catch (error) {
    console.error('获取学生数据失败：', error)
    throw new Error('无法加载学生信息，请稍后重试') // 统一错误提示
  }
}
