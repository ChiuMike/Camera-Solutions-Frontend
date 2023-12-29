import { useEffect, useState, FC } from "react";
import { RequestMethod } from "../../../../apis/Api";
import { ChannelDevice } from "../../../../apis/channel/type";
import { ApiUrl, ReadUserDetailResponse } from "../../../../apis/users";
import { useAxios } from "../../../../hooks/useAxios";
import useClick from "../../../../hooks/useClick";
import useLocalStorage, { LocalStorage } from "../../../../hooks/useLocalStorage";
import { useAsyncChannelDevice } from "../../context/AsyncChannelStateProvider";
import FooterControl from "./FooterControl";
import RoomList from "./RoomList";
import RoomName from "./RoomName";

export interface PttDevice extends ChannelDevice {
    mute: boolean;
}

const PttRoom: FC = () => {

    const { value: uuid } = useLocalStorage(LocalStorage.UUID, "");

    const { channelDevices } = useAsyncChannelDevice();

    const [pttDevice, setPttDevice] = useState<PttDevice[]>([]);

    const [handleJoin, isJoin] = useClick();

    const [handleUserMute, userMute] = useClick();

    const {makeRequest: readUserDetail, data: readUserResponse } = useAxios<ReadUserDetailResponse>();
    
    useEffect(() => {
        readUserDetail({
            url: ApiUrl.readUserDetail(uuid),
            method: RequestMethod.GET
        });
    }, []);

    useEffect(() => {

        setPttDevice((prev) => {

            let pttDevices: PttDevice[] = [];

            channelDevices.forEach((device, index) => {
                if(channelDevices.length === 1) {
                    let targert: PttDevice = {
                        ...device,
                        mute: true,
                    }
                    pttDevices.push(targert);
                    return;
                };

                if(index % 2 === 0) {
                    let targert: PttDevice = {
                        ...device,
                        mute: true,
                    }
                    pttDevices.push(targert);
                } else {
                    let targert: PttDevice = {
                        ...device,
                        mute: false,
                    }
                    pttDevices.push(targert);
                }

            })

            return [...pttDevices];
        })

    }, [channelDevices.length]);

    useEffect(() => {
        if(readUserResponse === undefined) return;
        if(readUserResponse.data.username === "") return;

        if(!isJoin) {
            setPttDevice((prev) => {

                prev = prev.filter((item) => item.name !== readUserResponse.data.username);
                
                return [...prev];
            });

            return;
        }

        setPttDevice((prev) => {

            prev = prev.filter((item) => item.name !== readUserResponse.data.username);

            let user = {
                uuid: "",
                name: readUserResponse.data.username,
                updated_at: "",
                created_at: "",
                lat: "",
                lng: "",
                update_time: "",
                mute: userMute,
            }

            return [...prev, user];
        })

    }, [isJoin, readUserResponse?.data.username, userMute]);
    
    useEffect(() => {

        setPttDevice((prev) => {

            let user = prev.findIndex((item) => item.name === readUserResponse?.data.username);

            if(user !== -1) {
                prev[user].mute = userMute
            }

            return [...prev];
        });

    }, [userMute]);

    return (
        <>
        <RoomName />
        <RoomList 
            pttDevice={pttDevice} 
            username={readUserResponse ? readUserResponse.data.username : ""}
        />
        <FooterControl 
            username = {readUserResponse ? readUserResponse.data.username : ""}
            isJoin={isJoin}
            handleJoin={handleJoin}
            userMute={userMute}
            handleUserMute={handleUserMute}
        />
        </>
    )
};

export default PttRoom;