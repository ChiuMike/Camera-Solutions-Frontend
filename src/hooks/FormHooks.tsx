import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export type eventType = SelectChangeEvent<unknown> | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type inputEventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const useEventChange = <T extends {}>(initialState: T) => {    
    const [fields, setFields] = useState<T>(initialState);

    const handleChange = (event: eventType) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })
    }
  
    return [ handleChange, fields, setFields ] as [(event: eventType) => void, T, Dispatch<SetStateAction<T>>]
}

export const useValidateInputChange = <T extends {errors: {}, input: {}}>(initialState: T, validate: (name: string ,value: string) => boolean | string) => {    
        const [fields, setFields] = useState<T>(initialState);

        const handleChange = (event: inputEventType) => {
            
            setFields({
                ...fields,
                errors: {
                    ...fields.errors,
                    [event.target.name]: validate(event.target.name, event.target.value),
                },
                input: {
                    ...fields.input,
                    [event.target.name]: event.target.value,
                },
            })
        }
  
    return [ handleChange, fields, setFields ] as [(event: inputEventType) => void, T , Dispatch<SetStateAction<T>>]
}