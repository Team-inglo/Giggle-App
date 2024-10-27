import { WebViewLayout } from "@/layout/webview-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <WebViewLayout
      pathname="/"
      style={{
        backgroundColor: "#F2F4F8",
        paddingTop: insets.top,
      }}
    />
  );
}
