import * as MUI from "@mui/material";
import { FC } from "react";

export const Thermometer = MUI.styled("span", { shouldForwardProp:  (prop) => prop !== 'temp' })<{ temp :  string,}>(({ theme, temp }) => ({
	margin: "50px auto",
    width: "22px",
    height: "150px",
    display: "block",
    font: "bold 14px/152px helvetica, arial, sans-serif",
    textIndent: "36px",
    background: "-webkit-linear-gradient(top, #fff 0%, #fff 50%, #db3f02 50%, #db3f02 100%)",
    borderRadius: "22px 22px 0 0",
    border: "5px solid #4a1c03",
    borderBottom: "none",
    position: "relative",
    boxShadow: "inset 0 0 0 4px #fff",
    color: "#4a1c03",

    "&:before": {
        content: `""`,
        width: "44px",
        height: "44px",
        display: "block",
        position: "absolute",
        top: "142px",
        left: "-16px",
        zIndex: -1, /* Place the bulb under the column */
        background: "#db3f02",
        borderRadius: "44px",
        border: "5px solid #4a1c03",
        boxShadow: "inset 0 0 0 4px #fff",
    },

    "&:after": {
        content: `""`,
        width: "14px",
        height: "7px",
        display: "block",
        position: "absolute",
        top: "147px",
        left: "0px",
        zIndex: -1,
        background: "#db3f02",
    }
}));

const config = {
	minTemp: 20,
	maxTemp: 50,
	unit: "Celcius"
};

export const Temp = MUI.styled(MUI.Box, { shouldForwardProp: (prop) => prop !== 'temp' && prop !== "temperature" })<{ temp:string; temperature: string}>(({ theme, temp, temperature }) => ({
    "p": {
        userSelect: "none",
    },
    margin: "0 auto",
    cursor: "pointer",
    "& #termometer": {
        width: "14px",
        backgroundColor: "#38383f",
        height: "40px",
        position: "relative",
        border: "3px solid #2a2a2e",
        borderRadius: "20px",
        zIndex: 1,
        "&:after": {
            content: `""`,
            position: "absolute",
		    borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            backgroundColor: "#3dcadf",
            bottom: "-25px",
            border: "3px solid #2a2a2e",
            zIndex: -3,
            left: "50%",
        },
        "& #graduations": {
            height: "59%",
            top: "20%",
            width: "50%",
            "&, &:before": {
                position: "absolute",
                borderTop: "2px solid rgba(0, 0, 0, 0.5)",
                borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
            },
            "&:before": {
                content: `""`,
                height: "34%",
                width: "100%",
                top: "32%",
            }
        },
        "& #temperature": {
            bottom: 0,
            background: "linear-gradient(#f17a65, #3dcadf) no-repeat bottom",
            width: "100%",
            height: `${temp}`,
            borderRadius: "20px",
            backgroundSize: "100% 40px",
            transition: "all 0.2s ease-in-out",

            "&, &:before, &:after": {
                position: "absolute",
            },
        },
        "&:hover": {
            "& #temperature": {
                "&:before": {
                    content: `"${temperature}°C"`,
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#FFF",
                    zIndex: 2,
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "1em",
                    lineHeight: 1,
                    transform: "translateY(50%)",
                    left: "calc(100% + 1em / 1.5)",
                    top: "calc(-1em + 5px - 5px * 2)",
                },
                "&:after": {
                    content: `""`,
                    borderTop: "0.4545454545em solid transparent",
                    borderBottom: "0.4545454545em solid transparent",
                    borderRight: "0.6666666667em solid rgba(0, 0, 0, 0.7)",
                    left: "100%",
                    top: "calc(-1em / 2.2 + 5px)",
                }
            }
        }
    }
}));

interface TemperatureBaseProps {
    temp: string
}

export const Temperature: FC<TemperatureBaseProps> = ({temp}) => {

    return (
        <Temp className="temperature" temp={(Number(temp) - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%"} temperature={temp}>
            <MUI.Box id="termometer">
                <MUI.Box id="temperature" sx={{height: 0}} data-value="0°C"></MUI.Box>
                <MUI.Box id="graduations"></MUI.Box>
	        </MUI.Box>
        </Temp>
    )
};
