// Lightweight analytics wrapper. Set VITE_GA_MEASUREMENT_ID in env to enable GA4.
// Also emits window events so any tag manager can subscribe.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let injected = false;
export function initAnalytics() {
  if (injected || typeof window === "undefined" || !GA_ID) return;
  injected = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageview(path: string, title?: string) {
  if (typeof window === "undefined") return;
  const g = (window as any).gtag;
  if (GA_ID && g) {
    g("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
  window.dispatchEvent(new CustomEvent("app:pageview", { detail: { path, title } }));
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  const g = (window as any).gtag;
  if (GA_ID && g) g("event", name, params);
  window.dispatchEvent(new CustomEvent("app:event", { detail: { name, params } }));
}
