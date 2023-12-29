import ClientProvider from "./context/ClientProvider";
import LayoutProvider from "./context/LayoutProvider";
import Layout from "./layout/Layout";

const VideoUpload = () => {

    return (
        <LayoutProvider>
            <ClientProvider>
                <Layout />
            </ClientProvider>
        </LayoutProvider>
    )
};

export default VideoUpload;