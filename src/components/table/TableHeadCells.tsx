import { Column } from "@material-table/core";
import * as MUI from "@mui/material";
import { IUserDto } from "../../apis/users";
import { IRowData } from "./types";
import * as MuiIcons from "@mui/icons-material/";

export const UsersHeadCell: Column<IRowData>[] = [
    { title: "USERNAME", field: "username"},
    { title: "EMAIL", field: "email"},
    { title: "ROLE", field: "role", 
        render: (row) => {  
            return (
                <>
                {(row as IUserDto).role === "ADMIN" ?
                    <MUI.Tooltip title="ADMIN">
                        <MUI.Box>
                            <MuiIcons.AdminPanelSettings sx={{color: '#c24242'}}/>
                        </MUI.Box>
                    </MUI.Tooltip>
                    :
                    <MUI.Tooltip title="USER">
                        <MUI.Box>
                            <MuiIcons.Person sx={{color: '#02759F'}}/>
                        </MUI.Box>
                    </MUI.Tooltip>
                }
                </>
            )
        },
    },
    { title: "UPDATED TIME", field: "updated_at" },
    { title: "CREATED TIME", field: "created_at" },
  ]