import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./entry.css";

// زبان فارسی و جهت راست‌به‌چپ
document.documentElement.lang = "fa";
document.documentElement.dir = "rtl";
{
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap";
  const rtlStyle = document.createElement("style");
  rtlStyle.textContent = `
    pre, code, kbd, samp { direction: ltr; unicode-bidi: isolate; }
    pre { text-align: left; }
    [dir="rtl"] :not(pre, code, kbd, samp, pre *, code *) { letter-spacing: normal !important; }
    [dir="rtl"] .lucide-arrow-right, [dir="rtl"] .lucide-arrow-left,
    [dir="rtl"] .lucide-chevron-right, [dir="rtl"] .lucide-chevron-left,
    [dir="rtl"] .lucide-chevrons-right, [dir="rtl"] .lucide-chevrons-left,
    [dir="rtl"] .lucide-arrow-up-right, [dir="rtl"] .lucide-external-link { scale: -1 1; }
  `;
  document.head.append(fontLink, rtlStyle);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
