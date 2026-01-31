
export interface Exam {
  id: string;
  name: string;
  link: string;
  createdAt: number;
  status: 'active' | 'ended';
}

export type ViewType = 'home' | 'admin';
