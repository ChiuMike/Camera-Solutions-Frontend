import * as MUI from "@mui/material";

export const SideBarRoot = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) => ({
    width: '100%',
    height: '100%',
    overflowY: "auto",
    "& .filter-list": {
        width: '100%', 
        marginTop: '12px',
        "& .MuiListItemIcon-root": {
            color: "#4b6700",
        },
        "& .list-header": {
            color: "#4b6700",
            fontWeight: 900
        },
        "& .collapse-list": {
            "& .checked": {
                color: theme.palette.background.primary
            },
            "& .all": {
                "span": {
                    color: theme.palette.mode === "light" ? '#00344a': '#a5d6a7', 
                    fontWeight: 900
                }
            }
        }
    }
}));