import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Home from "./pages/Home";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1.2, smoothWheel: true }}>
      <Home />
    </ReactLenis>
  );
}

export default App;