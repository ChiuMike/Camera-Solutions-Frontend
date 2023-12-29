import { FC } from "react";
import { useBoardData } from "../context/ClientProvider";
import PanelDeviceItem from "./PanelDeviceItem";

interface IPanelItemOverlay {
    id: string;
}

const PanelDeviceOverlay: FC<IPanelItemOverlay> = ({id}) => {
    
    const { boardData } = useBoardData();

    const cardParent = boardData.boardPanels.find((panel) => {
        return panel.panelItems.find((item) => {
          return item.id === id;
        });
    });

    if (cardParent !== undefined) {
        const cardIndex = cardParent.panelItems.findIndex((item) => {
            return item.id === id;
        });
        const card = cardParent.panelItems[cardIndex];

        return (
            <>
                <PanelDeviceItem
                    itemIndex={cardIndex}
                    panelItem={card}
                />
            </>
        )

    }
    return (
        <>
        </>
    )
};

export default PanelDeviceOverlay;