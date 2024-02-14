import { FC } from "react";
import { findBoardSectionContainer, useBoardData } from "../context/ClientProvider";
import PanelDeviceItem from "./PanelDeviceItem";
import PanelViewItem from "./PanelViewItem";

interface IPanelItemOverlay {
    id: string;
}

const PanelDeviceOverlay: FC<IPanelItemOverlay> = ({id}) => {
    
    const { boardData } = useBoardData();

    const activeContainer = findBoardSectionContainer(boardData, id);

    if(activeContainer === undefined) return null;

    const activeIndex = boardData[activeContainer].findIndex(
        (task) => task.id === id
    );
    
    return (
        <>
        {
            activeContainer === "device" 
            ? 
            <PanelDeviceItem itemIndex={activeIndex} panelItem={boardData["device"][activeIndex]} />
            :
            <PanelViewItem 
                itemIndex={activeIndex} panelItem={boardData["monitor"][activeIndex]}
            />
        }
        </>
    )
};

export default PanelDeviceOverlay;