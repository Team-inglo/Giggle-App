import { appBridge } from "@/bridge/native";
import { createWebView, postMessageSchema } from "@webview-bridge/react-native";
import { z } from "zod";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

const schema = postMessageSchema({
  getBackgroundColor: {
    validate: (value: unknown) => {
      const result = z.string().safeParse(value);
      if (!result.success) {
        throw new Error("Invalid type");
      }
      return result.data;
    },
  },
});

export interface BridgeEvent {
  body: Body;
  type: string;
  data?: string;
}

export interface Body {
  args: any[];
  eventId: string;
  method: string;
}

const { WebView } = createWebView({
  bridge: appBridge,
  debug: true,
  postMessageSchema: schema,
});

interface WebViewLayoutProps {
  pathname: string;
  style?: StyleProp<ViewStyle>;
}

export const WebViewLayout = ({ pathname, style }: WebViewLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const handleEndLoad = () => {
    setIsLoaded(false);
  };
  const customUserAgent = "customUserAgent";
  const url = new URL("https://giggle-web.vercel.app");
  url.pathname = pathname;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        cacheEnabled={false}
        userAgent={customUserAgent}
        originWhitelist={["*"]}
        style={[
          {
            flex: 1,
          },
        ]}
        onLoad={handleEndLoad}
        containerStyle={[style]}
        contentInsetAdjustmentBehavior="never"
        scrollEnabled
        allowsInlineMediaPlayback
        javaScriptEnabled
        domStorageEnabled
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        bounces={false}
        source={{
          uri: url.toString(),
        }}
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
        }}
      />
      {isLoaded && <Text>"Loading..." </Text>}
      <StatusBar style="light" backgroundColor="transparent" />
    </View>
  );
};
