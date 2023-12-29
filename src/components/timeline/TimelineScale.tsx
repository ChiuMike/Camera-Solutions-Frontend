import * as MUI from "@mui/material";

const TimelineScale = (props: {scale: number}) => {

    const { scale } = props;

    const hours = Math.floor(scale  / 3600);
    const minutes = Math.floor((scale  % 3600) / 60);

    const formattedHours = String(hours);
    const formattedMinutes = String(minutes).padStart(2, '0');

    return (
      <MUI.Box className="scale-number">
          <MUI.Typography sx={{fontSize: 14, color: "#424242", fontWeight: 'bold'}}>
          {`${formattedHours}:${formattedMinutes}`}
          </MUI.Typography>
      </MUI.Box>
    )
};

export default TimelineScale;