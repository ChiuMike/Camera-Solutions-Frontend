export type PanelItemsType = {
    content: string,
    id: string,
    status: string;
    viewing: boolean;
};

export type BoardPanelsType = {
    id: string;
    title: string;
    position: number;
    panelItems: PanelItemsType[];
};

export interface IDefaultBoards {
    boardPanels: BoardPanelsType[];
};

export type MonitorPanelItems = {
    content: string,
    id: string,
};

export type MonitorBoardPanels = {
    id: string;
    title: string;
    position: number;
    panelItems: MonitorPanelItems[];
};

export interface IMonitorBoards {
    boardPanels: MonitorBoardPanels[];
};