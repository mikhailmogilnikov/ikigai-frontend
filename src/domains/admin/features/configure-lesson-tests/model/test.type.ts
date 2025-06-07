import { ApiComponents } from '~/shared/api';

export type BackendTest = ApiComponents['AdminLesson']['tests'][number];
export type BackendTestVariant = BackendTest['variants'][number];

interface TemporalTestVariant {
  title: string;
  is_correct: boolean;
  description: string | null;
  order: number;
  created_at: string;
}

export interface TemporalTest {
  lesson_id: number;
  title: string;
  order: number;
  variants: TemporalTestVariant[];
  created_at: string;
}

export type TestVariant = BackendTestVariant | TemporalTestVariant;

export type Test = TemporalTest | BackendTest;
