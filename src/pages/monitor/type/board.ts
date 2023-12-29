export type Status = 'device' | 'monitor';

export type Task = {
  id: string;
  title: string;
  status: Status;
};

export type BoardSections = {
  [name: string]: Task[];
};
