import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Home from "./pages/Home";

function App() {
  return (
    <ReactLenis root>
      <Home />
    </ReactLenis>
  );
}

export default App;