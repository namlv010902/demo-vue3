import { QueryClient, type VueQueryPluginOptions } from "@tanstack/vue-query";
import type { App } from "vue";
import { defaultQueryFn, queryClientDefault } from "./vue-query";

function makeQueryClient() {
  return queryClientDefault;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { queryFn: defaultQueryFn } },
  },
}

