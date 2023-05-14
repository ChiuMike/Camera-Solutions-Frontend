import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    appBar: string;
    controllerContainer: string;
    formButton: string;
    formButtonText: string;
    confirmButton: string;
    sidebarOpen: string;
    sidebarClose: string;
    tableBackground: string;
    tableHeader: string;
    tableRow: string;
    video: string;
    dateRecord: string;
    datePicker: string;
    navigation: string;
    pttBg: string;
    loadingspinner: string;
    drawerBtn: string;
    borderColor: string;
    responsiveTabs: string;
    tabContent: string;
    primary: string;
    secondary: string;
    third: string;
    tableSearch: string;
  }

  interface TypeText {
      common: string;
      tabletText: string;
      popupTitle: string;
      formInputLabel: string;
      main: string;
      video: string;
      dashboardUserDetail: string;
      navigation: string;
      title: string;
      pttText: string;
      primary: string;
      secondary: string;
      third: string;
      primary: string;
      secondary: string;
      third: string;
  }

  interface TypeAction {
    confirmButtonHover: string;
    tabSelected: string;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    extraSmallMobile: true;
    smallMobile: true;
    mediumDesktop: true;
  }
}