import { FC } from "react";
import { useBoardData } from "../context/ClientProvider";
import PanelItem from "./PanelItem";

interface IPanelItemOverlay {
    id: string;
}

const PanelItemOverlay: FC<IPanelItemOverlay> = ({id}) => {

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
                <PanelItem
                    cardIndex={cardIndex}
                    card={card}
                />
            </>
        )

    }
    return (
        <>
        </>
    )
};

export default PanelItemOverlay;