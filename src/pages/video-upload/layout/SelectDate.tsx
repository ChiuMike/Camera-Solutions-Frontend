import { useState, useEffect } from "react";
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import { useBoardData, useClientState } from "../context/ClientProvider";
import { TimeRange } from "../../../types/web";
import { SelectChangeEvent } from "@mui/material";
import useClick from "../../../hooks/useClick";
import { PanelItemsType } from "../type/type";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateInputWrapper } from "../../../components/form";
import { Dialog } from "../../../components/popup";
import CustomRangeForm from "./CustomRangeForm";

export const checkIsViewing = (panelItems: PanelItemsType[]) => {
    const target = panelItems.find((device)=> device.viewing === true);
    if(target) {
        return true
    }
    return false
};

const SelectDate = () => {

    const mediaMatch = MUI.useMediaQuery('(max-width:770px)');

    const { boardData, setBoardData, handleToArchive } = useBoardData();
    const {deviceState, handleDateInput, handleCustomRange, handleClearDeviceState, handleTimelineClear } = useClientState();
    const { selectedDevice, selectedDate, timePeriod, customRange } = deviceState;

    const [handleOpen, open] = useClick();
    const [range, setRange] = useState<TimeRange>({
        start: -1,
        end: -1,
    });

    const handleRange = (event: SelectChangeEvent, type: string) => {

        if(type === "start") {
            setRange({
                start: Number(event.target.value),
                end: -1
            });
            return;
        };

        setRange((prev) => {
            return {
                ...prev,
                end: Number(event.target.value)
            }
        });
        
    };

    const handleApply = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if(range.start === -1 || range.end === -1) return;
        if (reason !== 'backdropClick') {
            handleCustomRange(range.start, range.end)
            handleOpen();
        }
    }

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            handleOpen();
        }
    };

    const handleHideProgress = () => {
        const targetIndex = boardData.boardPanels[1].panelItems.findIndex((device)=> device.viewing === true);

        if(targetIndex !== -1) {
            handleClearDeviceState();
            handleTimelineClear();
            setBoardData((prev) => {
                prev.boardPanels[1].panelItems[targetIndex].viewing = false;
                return {...prev}
            });
        }
    };

    useEffect(() => {
        setRange({
            start: -1,
            end: -1
        })
    }, [selectedDevice]);

    return (
        <>
        <Dialog
            disableEscapeKeyDown={true}
            open={open}
            handleOpen={handleOpen}
            maxWidth="smallMobile"
            renderChildren={() =>
                <CustomRangeForm 
                    range={range}
                    handleRange={handleRange}
                    handleClose={handleClose}
                    handleApply={handleApply}
                />
            }
        />
        <MUI.Box className="selectDate-header">
            <MUI.Box className="selected-device">
               <MUI.Box className="device">
                   {selectedDevice === "" ?
                    <MUI.Typography className="wait-for-text">
                        device for uploading
                    </MUI.Typography> 
                    :
                    <MUI.Grow in={selectedDevice !== ""} {...(selectedDevice !== "" ? { timeout: 500 } : {})}>  
                        <MUI.Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={1} sx={{width: "100%",}}>
                            <MUI.Avatar 
                                variant="rounded" 
                                src="/images/panther_bg.png"
                                sx={{
                                    "img": {
                                        transform: 'scale(0.75)'
                                    }
                                }}
                            />
                            <MUI.Typography sx={{fontSize: 12, color: "#212121", fontWeight: "bold"}}>
                                {selectedDevice}
                            </MUI.Typography> 
                        </MUI.Stack>
                    </MUI.Grow>
                   }
               </MUI.Box>
            </MUI.Box>
            <MUI.Box className="date-picker">
                <MUI.IconButton disabled>
                    <MuiIcons.DateRange />
                </MUI.IconButton>
                <DateInputWrapper>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={(date) => handleDateInput(date)}
                        maxDate={new Date()}
                        wrapperClassName="datePicker" 
                        dateFormat="dd/MM/yyyy"
                        placeholderText="select date"
                        required
                    />
                </DateInputWrapper>
            </MUI.Box>
            <MUI.Box className="custom-range">
                <MUI.Button 
                    size="small" 
                    startIcon={<MuiIcons.Tune />}
                    onClick={handleOpen}
                    disabled={selectedDevice === ""}
                >
                    {(customRange.start !== -1 && customRange.end !== -1) ?
                        `${customRange.start}:00 → ${customRange.end}:00`
                        :
                        <>
                        {
                            mediaMatch ? "range" : "custom range"
                        }
                        </>
                    }
                </MUI.Button>
            </MUI.Box>
            <MUI.Box className="confirm-upload">
                {(!checkIsViewing(boardData.boardPanels[1].panelItems)) ? 
                    <MUI.Button 
                        startIcon={<MuiIcons.UploadFile />} 
                        disabled={(timePeriod.actionStart === "") || selectedDevice === "" || selectedDate === null}
                        size="small"
                        onClick={handleToArchive}
                    >
                        upload
                    </MUI.Button>
                    :
                    <MUI.Button 
                        startIcon={<MuiIcons.VisibilityOff />} 
                        size="small"
                        onClick={handleHideProgress}
                    >
                        Hide
                    </MUI.Button>
                }
            </MUI.Box>
        </MUI.Box>
        </>
    )
};

export default SelectDate;