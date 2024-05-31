export interface Course {
  _id: string;
  code: string;
  title: string;
  description: string;
  isPublished: boolean;
  publisher: string;
  tier: string;
  price?: number;
  enrolled: string[];
  createdAt: string;
  updatedAt: string;
}
