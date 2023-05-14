import { SetStateAction, useState, useCallback } from "react";

const useClick = () => {

    const [open, setOpen] = useState(false);
    
    const handleClick = useCallback(() => {
        setOpen((prev) => !prev);
    }, [])

    return [handleClick, open, setOpen] as [() => void, boolean, (value: SetStateAction<boolean>) => void];
};

export default useClick;