import * as MUI from "@mui/material";

export const TableSkeleton = MUI.styled(MUI.Table)<MUI.TableProps>(({theme}) => ({
    backgroundColor: theme.palette.background.tableBackground,
    boxShadow: 'none',
    "& .MuiTableHead-root": {
        backgroundColor: theme.palette.background.tableHeader,
    }
}));

export const StyledTableHeadRow = MUI.styled(MUI.TableRow)<MUI.TableRowProps>(({theme}) => ({
    "& .MuiTableCell-root": {
        color: theme.palette.text.tabletText,
        fontWeight: 'bold',
        fontSize: '16px',
    }

}));

export const StyledTableRow = MUI.styled(MUI.TableRow)<MUI.TableRowProps>(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.tableRow,
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#fefeff',
    },
    borderBottom: theme.palette.mode === 'light' ? '2px solid #FFF' : '0.1px solid #FFF'
}));