"use client";
import "@/configs/dayjs.config";
import { AppLogicProvider } from "@/containers";

import { persistor, store } from "@/stores";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { ToastBar, Toaster } from "react-hot-toast";
import { Provider as ReduxProvide } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ThirdwebProvider } from "thirdweb/react";

type AppProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

/**
 * Set your global app-providers (i.e: redux, react-query,...) here
 */

const AppProviders: FC<AppProps> = (props) => {
  return (
    <ReduxProvide store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThirdwebProvider>
          <QueryClientProvider client={queryClient}>
            <AppLogicProvider>{props.children}</AppLogicProvider>
            <Toaster
              containerStyle={{
                top: "100px",
              }}
              position="top-right"
            >
              {(t) => (
                <ToastBar
                  toast={t}
                  style={{
                    ...t.style,
                  }}
                />
              )}
            </Toaster>
            {/* <Toaster
              containerStyle={{
                top: '100px',
              }}
              position='bottom-center'
            /> */}
          </QueryClientProvider>
        </ThirdwebProvider>
      </PersistGate>
    </ReduxProvide>
  );
};

export default AppProviders;
