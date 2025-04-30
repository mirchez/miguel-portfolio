export type Technology = {
  id: string;
  name: string;
  color: { bg: string; text: string };
};

// export type Project = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   technologies: Technology[];
//   category: string;
//   link: string;
// };

export interface Project {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  technologies?: {
    id?: string;
    name?: string;
    color?: {
      bg?: string;
      text?: string;
    };
  }[];
  category?: string;
  link?: string;
}
