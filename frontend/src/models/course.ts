export interface Course {
  _id: string;
  code: string;
  title: string;
  description: string;
  isPublished: boolean;
  publisher: string;
  tier: number;
  price?: number;
  enrolled: string[];
  createdAt: string;
  updatedAt: string;
}
