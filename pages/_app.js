import "@/styles/globals.css";
import { UserProvider } from "@/context/authContext";
import { ChatContextProvider } from "@/context/chatContext";
import { ScreenSizeProvider } from "@/context/screenSizeContext";
export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <ScreenSizeProvider>
                <ChatContextProvider>
                    <Component {...pageProps} />
                </ChatContextProvider>
            </ScreenSizeProvider>
        </UserProvider>
    );
}
