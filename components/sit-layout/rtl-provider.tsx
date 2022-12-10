import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import type { FC, ReactNode } from "react";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface RTLProps {
  children: ReactNode;
}

const RtlProvider: FC<RTLProps> = (props) => {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};

export default RtlProvider;
