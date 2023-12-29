import { createContext, ReactNode, FC, useMemo, useContext } from 'react';
import useClick from '../../../hooks/useClick';

type LayoutState = {
    handleDatePickerOpen: () => void;
    datePickerOpen: boolean;
    expand: boolean;
    handleExpand: () => void;
};

type VideoLayoutState = {
    layoutState: LayoutState;
}

type IProviderProps = {children: ReactNode;}

const VideoLayoutContext = createContext<VideoLayoutState | null>(null);

const LayoutProvider: FC<IProviderProps> = ({children}) => {

    const [handleDatePickerOpen, datePickerOpen] = useClick();
    const [handleExpand, expand] = useClick();

    const layoutState = useMemo(() => {
        return {
            handleDatePickerOpen, datePickerOpen, expand ,handleExpand
        } as LayoutState;

    }, [handleDatePickerOpen, handleExpand]);

    return (
        <VideoLayoutContext.Provider
            value={{
                layoutState
            }}
        >
            {children}
        </VideoLayoutContext.Provider>
    )
};

export const useLayoutState = () => {
    const { layoutState  } = useContext(VideoLayoutContext) as VideoLayoutState;
    return {...layoutState}
};

export default LayoutProvider

