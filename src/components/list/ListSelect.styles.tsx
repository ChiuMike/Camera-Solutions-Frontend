import * as MUI from "@mui/material";

export const ListSelect = MUI.styled(MUI.List)<MUI.ListProps>(({ theme }) => ({
    width: '100%',
    bgcolor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    padding: '0px 10px',
    "& .MuiTypography-root": {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'wrap',
        width: '100%',
    },
})); 