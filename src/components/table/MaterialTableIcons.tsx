import React, { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons: any = {
  Add: forwardRef<any>((props, ref) => <AddBox /> ),
  Check: forwardRef<any>((props, ref) => <Check /> ),
  Clear: forwardRef<any>((props, ref) => <Clear /> ),
  Delete: forwardRef<any>((props, ref) => <DeleteOutline /> ),
  DetailPanel: forwardRef<any>((props, ref) => <ChevronRight /> ),
  Edit: forwardRef<any>((props, ref) => <Edit /> ),
  Export: forwardRef<any>((props, ref) => <SaveAlt /> ),
  Filter: forwardRef<any>((props, ref) => <FilterList /> ),
  FirstPage: forwardRef<any>((props, ref) => <FirstPage /> ),
  LastPage: forwardRef<any>((props, ref) => <LastPage /> ),
  NextPage: forwardRef<any>((props, ref) => <ChevronRight /> ),
  PreviousPage: forwardRef<any>((props, ref) => <ChevronLeft /> ),
  ResetSearch: forwardRef<any>((props, ref) => <Clear /> ),
  Search: forwardRef<any>((props, ref) => <Search /> ),
  SortArrow: forwardRef<any>((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef<any>((props, ref) => <Remove /> ),
  ViewColumn: forwardRef<any>((props, ref) => <ViewColumn /> ),
};

export default tableIcons;