import { FC } from "react";
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import { useLayoutState } from "../context/LayoutProvider";

const VideoHeader: FC = () => {

    const { handleExpand } = useLayoutState();

    return (
        <>
            <MUI.Box>
                <MUI.Typography>
                    VIDEO UPLOAD
                </MUI.Typography>
            </MUI.Box>
            <MUI.Box className="video-header-control">
                <MUI.Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<MuiIcons.FitScreen />}
                    onClick={handleExpand}
                >
                    Expand timeline
                </MUI.Button>
            </MUI.Box>
        </>
    )
};

export default VideoHeader;