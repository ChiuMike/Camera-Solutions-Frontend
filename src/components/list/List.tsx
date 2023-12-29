import { ReactNode } from "react";
import * as MUI from "@mui/material";
import { TransitionGroup } from "react-transition-group";

interface ListBaseProps<T> {
    data: T[];
    renderItem: (data: T, index: number) => ReactNode;
}

const List = <T extends unknown>({data, renderItem}: ListBaseProps<T>) => {
    
    return (
        <TransitionGroup>
            {
                data.map((item, index) => 
                    <MUI.Collapse key={index}>
                        {renderItem(item, index)}
                    </MUI.Collapse>
                )
            }
        </TransitionGroup>
    )
};

export default List;