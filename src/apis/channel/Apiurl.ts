export class ApiUrl {
    public static listChannel(): string {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_CHANNEL_MANAGEMENT}/channels`;
	}

	public static addChannel(): string {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_CHANNEL_MANAGEMENT}/channel`;
	}

	public static deleteChannel(channelUuid: string): string {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_CHANNEL_MANAGEMENT}/channel/${channelUuid}`;
	}

	public static listChannelDevice(channelUuid: string): string {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_CHANNEL_MANAGEMENT}/iot/channel/${channelUuid}/devices`;
	}

	public static addChannelDevice(channelUuid: string): string {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_CHANNEL_MANAGEMENT}/iot/channel/${channelUuid}/device`;
	}

	public static deleteChannelDevice(channelUuid: string, deviceUuid: string): string {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_CHANNEL_MANAGEMENT}/iot/channel/${channelUuid}/device/${deviceUuid}`;
	}
}