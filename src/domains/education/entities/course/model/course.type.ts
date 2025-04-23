export interface Course {
  id: string;
  title: string;
  imageUrl: string;
  lessonsCount: number;
}

export interface CourseCollection extends Course {
  completedLessonsCount: number;
  currentLessonId: string;
}

export interface CourseShop extends Course {
  price: number;
  lessonsCount: number;
  modulesCount: number;
}
