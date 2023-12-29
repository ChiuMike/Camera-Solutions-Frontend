import { createContext, ReactNode, FC, useMemo, useContext, useState, useCallback } from 'react';
import useClick from '../../../hooks/useClick';

type StateFilterCollapse = {
    device: boolean;
    status: boolean;
}

type LayoutState = {
    subDrawerOpen: boolean;
    handleSubDrawerOpen: () => void;
    popupOpen: boolean;
    handlePopupOpen: () => void;
    collapseOpen: StateFilterCollapse;
    handleCollapseOpen: (type: string) => void;
    swipeOpen: boolean;
    toggleSwipDrawer: () => void;
}

type RemoteLayoutState = {
    layoutState: LayoutState;
};

type IProviderProps = {children: ReactNode;}

const RemoteLayoutContext = createContext<RemoteLayoutState | null>(null);

const LayoutProvider: FC<IProviderProps> = ({children}) => {

    const [handleSubDrawerOpen, subDrawerOpen, setSubDrawerOpen] = useClick();
    const [handlePopupOpen, popupOpen, setPopupOpen] = useClick();
    const [toggleSwipDrawer, swipeOpen, setSwipeOpen] = useClick();;

    const [collapseOpen, setCollapseOpen] = useState<StateFilterCollapse>({
        device: true,
        status: true
    });

    const handleCollapseOpen = useCallback((type: string) => {
        if(type === "device") {
            setCollapseOpen((prev) => {
                return {
                    ...prev,
                    device: !prev.device,
                }
            })
        } else {
            setCollapseOpen((prev) => {
                return {
                    ...prev,
                    status: !prev.status,
                }
            })
        }
    }, [collapseOpen.device, collapseOpen.status])

    const layoutState = useMemo(() => {
        return {
            handleSubDrawerOpen, subDrawerOpen, handlePopupOpen, popupOpen, collapseOpen, handleCollapseOpen, toggleSwipDrawer, swipeOpen
        } as LayoutState;

    }, [handleCollapseOpen, handleSubDrawerOpen, handlePopupOpen, toggleSwipDrawer]);


    return (
        <RemoteLayoutContext.Provider
            value={{
                layoutState
            }}
        >
            {children}
        </RemoteLayoutContext.Provider>
    )
};

export default LayoutProvider;

export const useLayoutState = () => {
    const { layoutState  } = useContext(RemoteLayoutContext) as RemoteLayoutState;
    return {...layoutState}
};