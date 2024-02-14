export type Status = 'device' | 'monitor';

export type PanelItem = {
  id: string;
  content: string;
  status: Status;
  video: string;
};

export type BoardSections = {
    [name: string]: PanelItem[];
};
