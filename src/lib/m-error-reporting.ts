type mohitErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type mohitEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: mohitErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __mohitEvents?: mohitEvents;
  }
}

export function reportmohitError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__mohitEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
