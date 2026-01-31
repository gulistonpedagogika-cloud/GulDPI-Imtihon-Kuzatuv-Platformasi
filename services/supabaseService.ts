
import { createClient } from '@supabase/supabase-js';
import { Exam } from '../types';

const supabaseUrl = 'https://qtyfkpcdynvxpcvatyxp.supabase.co';
const supabaseKey = 'sb_publishable_r6gRaKRHhSSeFXxl_z92KQ_TdHey3JT';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchExams = async (): Promise<Exam[]> => {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching exams:', error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    link: item.link,
    createdAt: new Date(item.created_at).getTime(),
    status: item.status as 'active' | 'ended'
  }));
};

export const addExam = async (exam: Omit<Exam, 'id' | 'createdAt'>): Promise<Exam | null> => {
  const { data, error } = await supabase
    .from('exams')
    .insert([{
      name: exam.name,
      link: exam.link,
      status: exam.status
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding exam:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    link: data.link,
    createdAt: new Date(data.created_at).getTime(),
    status: data.status as 'active' | 'ended'
  };
};

export const deleteExam = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('exams')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting exam:', error);
    return false;
  }
  return true;
};
