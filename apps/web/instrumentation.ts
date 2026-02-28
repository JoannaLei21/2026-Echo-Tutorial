import * as Sentry from "@sentry/nextjs";

export async function register() {
  // NEXT 是 server side rendering 的框架，所以我们需要區分在 server 端和 edge 端的配置
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

//edge指的是用戶端（瀏覽器web/ 手機App）
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
