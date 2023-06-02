import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    appBar: string;
    formButton: string;
    formButtonText: string;
    confirmButton: string;
    cancelButton: string;
    sidebarOpen: string;
    sidebarClose: string;
    tableBackground: string;
    tableHeader: string;
    tableRow: string;
    avatar_2: string;
    dateRecord: string;
    navigation: string;
    drawerBtn: string;
    search: string;
    primary: string;
    secondary: string;
    third: string;
    red_1: string;
    red_2: string;
    red_3: string;
    route: string;
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
    gpsSearchHover: string;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    extraSmallMobile: true;
    smallMobile: true;
    mediumDesktop: true;
  }
}