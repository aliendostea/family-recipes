import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "@/header/Header.tsx";
import App from "./App.tsx";
import { BgGradient } from "@/bgGradient/BgGradient.tsx";
import "./index.css";

export function RenderApp() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>fallback</div>}>
        <Header />
        <App />
        <BgGradient />
      </Suspense>
    </BrowserRouter>
  );
}
