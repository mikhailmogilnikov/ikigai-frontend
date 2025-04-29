export interface Course {
  id: string;
  title: string;
  image_url: string;
  lessons_amount: number;
}

export interface CourseCollection extends Course {
  completed_lessons_amount: number;
}

export interface CourseShop extends Course {
  price: number;
  modules_amount: number;
}
