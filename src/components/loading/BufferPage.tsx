import * as MUI from "@mui/material";

const BufferPage = MUI.styled(MUI.Box)<MUI.BoxProps>(({theme}) =>({ 
    height: 'auto',
    width: '200px',
    'img' : {
        width: '100%',
        animation: 'buffer 2.0s alternate infinite ease-in',
    },
    '@keyframes buffer': {
        '0%': {
            transform: "scale(1)"
        },
        '100%': {
            transform: "scale(1.5)"
        }
    }
}));

export default BufferPage;