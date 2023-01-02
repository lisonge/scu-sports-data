export type Question = {
  index: number;
  info: string;
  options: string[];
  solutions: number[];
  type: 1 | 2 | 3;
};

type CourseAttr = {
  id: string;
  name: string;
};

export type Paper = {
  hash: string;
  topics: Question[];
} & CourseAttr;

export type CombineCourse = {
  papers: Paper[];
} & CourseAttr;
