import { useEffect, useState, FC } from "react";
import { AxiosResponse, RequestMethod } from "../../../../apis/Api";
import { ApiUrl } from "../../../../apis/channel";
import { ApiUrl as DeviceApi, ReadIotDevicesResponse } from "../../../../apis/device";
import ErrorBar from "../../../../components/helpers/ErrorBar";
import { useEventChange } from "../../../../hooks/FormHooks";
import { useAxios } from "../../../../hooks/useAxios";
import { useClientChannelsState } from "../../context/ClientStateProvider";
import { ChannelDeviceFormContainer, DeviceListItem } from "../../style/DialogContent.styles";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { Search, SearchIconWrapper, StyledForm, StyledInputBase } from "../../../../components/form";
import { List } from "../../../../components/list";
import { SubmitButton } from "../../../../components/button";
import { useAsyncChannelDevice } from "../../context/AsyncChannelStateProvider";

interface ChannelDeviceFormBaseProps {
    handleOpen: () => void;
}

const ChannelDeviceForm: FC<ChannelDeviceFormBaseProps> = ({handleOpen}) => {

    const { selectedChannel } = useClientChannelsState();
    const { channelDevices, handleListChannelDevice } = useAsyncChannelDevice();

	const [selectedUUID, setSelectedUUID] = useState<string[]>([]);
	const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const { makeRequest: addChannelDevice, error, setError } = useAxios<AxiosResponse>({
        onSuccess: () => {
			handleOpen();
            handleListChannelDevice(selectedChannel.channelId);
        }
    });

    const { data: iotDevice, makeRequest: listIotDevices } = useAxios<ReadIotDevicesResponse>();

    const filterDevices = iotDevice && iotDevice.data
    .filter((device) => {
		let flag = true;
		for (let i = 0; i < channelDevices.length; i++) {
            if (device.name === channelDevices[i].name) {
                flag = false;
                break;
            }
        }
		return flag;
	});

    const handleSelect = (value: string) => {

		const deviceUUID: string[] = [];

		if(value === 'all' && filterDevices) {
			setInputFields({ search: ''});
			filterDevices.forEach((device, index) => {
				deviceUUID.push(device.uuid);
		 	})
			setSelectedUUID(deviceUUID.length === selectedUUID.length ? [] : deviceUUID);
		} else {
			if(!selectedUUID.includes(value)) {
				setSelectedUUID([...selectedUUID, value])
			} else {
				setSelectedUUID((prev: string[]) => {
					return prev.filter((item: string) => item !== value);
				});
			}
		}
	};

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
		e.preventDefault();
        addChannelDevice({
            url: ApiUrl.addChannelDevice(selectedChannel.channelId),
            method: RequestMethod.POST,
            data: {
                device_uuids: selectedUUID
            }
        });
	};

    useEffect(() => {
		listIotDevices({
            url: DeviceApi.readDevices(),
            method: RequestMethod.GET,
        })
	}, []);

    return (
        <>
        <ErrorBar error={error} setError={setError}/>
        <ChannelDeviceFormContainer>
            <StyledForm 
                component="form"
				onSubmit={handleSubmit}
            >
                <MUI.Box className="dialog-title">
                    <MUI.Typography className="form-title">
                        Assign device to channel
                    </MUI.Typography>
                </MUI.Box>
                <MUI.Box className="search-box">
                    <Search>
                        <SearchIconWrapper>
                            <MuiIcons.Search />
                        </SearchIconWrapper>
                        <StyledInputBase
                            id="search"
                            type="text"
                            name='search'
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={inputFields.search}
                            onChange={handleInputChange}
                        />
                    </Search>
                </MUI.Box>
                <MUI.Box className="list-select">
                    <MUI.Box className="content">
                        <List 
                            data={
                                filterDevices ? 
                                filterDevices
                                .filter((device, index) => {
                                    return device.name.includes(inputFields.search);
                                })
                                .filter((device) => {
                                    return device.connection
                                })
                                .sort((a, b) => a.name.localeCompare(b.name))
                                :
                                []
                            }
                            renderItem={(device, index) => 
                                <DeviceListItem
                                    variant="outlined" 
                                    key={index} 
                                    selected={false}
                                    isSalute={index % 2 === 0}
                                    onClick={() => handleSelect(device.uuid)}
                                >
                                    <MUI.Box className="card-action">
                                        <MUI.CardHeader
                                            avatar={
                                                <>
                                                {device.name.includes("salute") ? 
                                                    <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                                                    :
                                                    <MUI.Avatar 
                                                        variant="rounded" 
                                                        src="/images/panther_bg.png"
                                                        sx={{
                                                            "img": {
                                                                transform: 'scale(0.75)'
                                                            }
                                                        }}
                                                    />
                                                }
                                                </>
                                            }
                                            action={
                                                <MUI.Stack direction="row" alignItems={"center"} gap={0.3}>
                                                    <MUI.Divider orientation="vertical" variant="middle" flexItem />
                                                    <MUI.Checkbox
                                                        edge="end"
                                                        icon={<MuiIcons.CheckBoxOutlineBlank />}
                                                        checkedIcon={<MuiIcons.CheckBox sx={{color: "#02759F", transform: 'scale(1.2)'}} />}
                                                        name={"selectedDevice"}
                                                        checked={selectedUUID.indexOf(device.uuid) > -1}
                                                    />
                                                </MUI.Stack>
                                            }
                                            title={device.name}
                                        />
                                    </MUI.Box>
                                </DeviceListItem>
                            }
                        />
                    </MUI.Box>
                </MUI.Box>
				<MUI.Box className="apply-box">
                    <SubmitButton
                        type="submit"
                        variant="outlined"
                        rounded
                        disabled={selectedUUID.length === 0}
                    >
                       SUBMIT
                    </SubmitButton>
                </MUI.Box>
			</StyledForm>
        </ChannelDeviceFormContainer>
        </>
    )
};

export default ChannelDeviceForm;