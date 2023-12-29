import { FC } from "react";
import * as MUI from "@mui/material";
import { TimeRange } from "../../../types/web";
import { SelectChangeEvent } from "@mui/material";
import { RangeFormContainer } from "../style/Layout.styles";

interface CustomRangeFormBaseProps {
    range: TimeRange;
    handleRange: (event: SelectChangeEvent, type: string) => void;
    handleClose: (event: React.SyntheticEvent<unknown>, reason?: string | undefined) => void;
    handleApply: (event: React.SyntheticEvent<unknown>, reason?: string | undefined) => void
}

const CustomRangeForm: FC<CustomRangeFormBaseProps> = ({range, handleRange, handleClose, handleApply}) => {

    return (
        <RangeFormContainer> 
            <MUI.DialogTitle>Fill the form</MUI.DialogTitle>
            <MUI.DialogContent>
                <MUI.Box component="form">
                    <MUI.FormControl>
                        <MUI.InputLabel htmlFor="demo-dialog-native">Start</MUI.InputLabel>
                        <MUI.Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={range.start.toString()}
                            onChange={(event: SelectChangeEvent)=> handleRange(event, "start")}
                            input={<MUI.OutlinedInput label="Age" />}
                            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                            <MUI.MenuItem value="-1">
                            <em>None</em>
                            </MUI.MenuItem>
                            {
                                Array.from(Array(24).keys()).map((item, index) => 
                                    <MUI.MenuItem value={item} key={index}>{item}:00</MUI.MenuItem>
                                )
                            }
                        </MUI.Select>
                    </MUI.FormControl>
                    <MUI.FormControl>
                        <MUI.InputLabel id="demo-dialog-select-label">End</MUI.InputLabel>
                        <MUI.Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={range.end.toString()}
                            onChange={(event: SelectChangeEvent)=> handleRange(event, "end")}
                            input={<MUI.OutlinedInput label="Age" />}
                        >
                            <MUI.MenuItem value="-1">
                                <em>None</em>
                            </MUI.MenuItem>
                            {
                                Array.from({ length: 24 - range.start }, (_, index) => index + range.start).map((item, index) => 
                                <MUI.MenuItem value={item + 1} key={index}>{item + 1}:00</MUI.MenuItem>
                            )
                            }
                        </MUI.Select>
                    </MUI.FormControl>
                </MUI.Box>
            </MUI.DialogContent>
            <MUI.DialogActions>
                <MUI.Button onClick={handleClose}>Cancel</MUI.Button>
                <MUI.Button 
                    onClick={handleApply}
                    disabled={range.start === -1 || range.end === -1}
                >
                    Ok
                </MUI.Button>
            </MUI.DialogActions>
        </RangeFormContainer>
    )
};

export default CustomRangeForm;