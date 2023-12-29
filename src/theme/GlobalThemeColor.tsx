import * as MUI from "@mui/material";

const GlobalThemeColor = (mode: MUI.PaletteMode) => ({
    components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
                fontWeight: 900,
                fontSize: '14px',
                padding: '8px 20px 8px 20px',
                borderRadius: '20px',
                backgroundColor: '#00bcd4',
                color:'#FFF'
            }
          }
        }
    },
    breakpoints: {
        values: {
          xs: 0,
          extraSmallMobile: 330,
          smallMobile: 380,
          sm: 576,
          md: 770,
          lg: 992,
          xl: 1200,
          mediumDesktop: 1600,
        },
    },
    palette: {
      mode,
      ...(mode === 'light' ? 
        {
            primary: {
                main: '#02759F' ,
            },
            info: {
                main: '#02759F',  //for textField
            },
            background: {
                default: '#fcfcff',
                primary: '#02759F',
                secondary: '#00bcd4',
                third: '#FFF',
                red_1: '#c24242',
                red_2: '#ff5252',
                red_3: '#d20000',
                paper: '#FFF',
                appBar: '#02759F',
                drawerBtn: '#02759F',
                sidebarOpen: '#FFF',
                sidebarClose: '#fcfcff',
                formButton: '#02759F',
                formButtonText: '#FFF',
                confirmButton: '#00bcd4',
                cancelButton: "#c24242",
                tableBackground: '#f5f5f5',
                tableHeader: '#fafafa',
                tableRow: '#f5f5f5',
                navigation: '#02759F',
                search: '#f5f5f5',
                avatar_2: '#00bcd4',
                route: '#243B70',
                patrolSelectedBorder: "#02759F"
            },
            divider: MUI.colors.grey[300],
            text: {
                primary: MUI.colors.grey[900],
                secondary: MUI.colors.grey[800],
                main: '#02759F',
                common: '#FFF',
                tabletText: 'rgb(13, 165, 171)',
                popupTitle: '#02759F',
                form: '#02759F',
                formInputLabel: '#02759F',
                video: '#00B4CC',
                dashboardUserDetail: MUI.colors.grey[900],
                navigation: '#FFF',
                title: '#02759F',
                pttText: '#FFF',
            },
            action: {
                selected: '#02759F',
                tabSelected: '#FFF',
                selectedOpacity: 0.75,
                hover: '#00bcd4',
                confirmButtonHover: '#0090a2',
                hoverOpacity: 0.04,
                gpsSearchHover: "#f5f5f5",
            },
        }
        :
        // theme for dark mode
        {
            primary: {
                main: MUI.colors.green[200]
            },
            secondary: {
                main: MUI.colors.blue[300]
            },
            info: {
                main: '#FFF'  //for dark mode textField
            },
            background: {
                default: '#121212',
                primary: 'rgba(165, 214, 167)',
                secondary: '#d7ffd9',
                third: '#121212',
                red_1: '#c24242',
                red_2: '#ff5252',
                red_3: '#d20000',
                paper: '#121212',
                appBar: 'rgba(0,0,0,0.87)',
                drawerBtn: 'rgba(0,0,0,0.9)',
                sidebarOpen: 'rgba(0,0,0,0.9)',
                sidebarClose: '#121212',
                formButton: '#a5d6a7',
                formButtonText:'#FFF',
                confirmButton: MUI.colors.green[200],
                cancelButton: '#c24242',
                tableBackground: '#212121',
                tableHeader: '#424242',
                tableRow: '#212121',
                navigation: '#FFF',
                search: '#4fd4ca',
                avatar_2: '#4fd4ca',
                route: '#FFF',
                patrolSelectedBorder: "rgba(165, 214, 167)",
            },
            divider: 'rgba(255, 255, 255, 0.12)',
            text: {
                // #f9f1f5
                primary: '#FFF',
                secondary: MUI.colors.grey[200],
                main: '#FFF',
                common: '#FFF',
                tabletText: '#a5d6a7',
                popupTitle: '#fff',
                formInputLabel: '#fff',
                dashboardUserDetail: 'rgba(165, 214, 167)',
                navigation: '#121212',
                title: 'rgba(165, 214, 167)',
                pttText: 'rgba(165, 214, 167)',
            },
            action: {
                selected: '#FFF',
                selectedOpacity: 0.75,
                hover: '#a5d6a7',
                hoverOpacity: 0.04,
                confirmButtonHover: '#69f0ae',
                gpsSearchHover: "#a5d6a7"
            }
        }
      ),
    },
  });

export default GlobalThemeColor;