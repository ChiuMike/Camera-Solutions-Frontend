import * as MUI from "@mui/material";
import * as React from "react";
import { Column } from "@material-table/core";
import { IRowData } from "./types";
import { TableSkeleton, StyledTableHeadRow, StyledTableRow } from "./style/SkeletonTable.styles";

export interface ISkeletonTableProps {
    tableHeadCell: Column<IRowData>[];
}

const skeletonArray = Array(5).fill('');

const SkeletonTable: React.FC<ISkeletonTableProps> = (props: ISkeletonTableProps) => {

    const {tableHeadCell} = props;
    const tableCellArray = Array(tableHeadCell.length).fill('');

    return (
        <>
        <MUI.Toolbar>
        </MUI.Toolbar>
        <TableSkeleton>
            <MUI.TableHead>
                <StyledTableHeadRow>
                    {tableHeadCell.map((item: Column<IRowData>, index) => 
                        <MUI.TableCell key={index}>{item.title}</MUI.TableCell>
                    )}
                </StyledTableHeadRow>
            </MUI.TableHead>
            <MUI.TableBody >
                {skeletonArray.map((item, index) => 
                    <StyledTableRow key={index}>
                        {tableCellArray.map((item, index) =>
                            <MUI.TableCell align="right" key={index}>
                                <MUI.Skeleton />
                            </MUI.TableCell>
                        )}
                    </StyledTableRow>
                )}
            </MUI.TableBody>
        </TableSkeleton>
        </>
    )
}

export default SkeletonTable;