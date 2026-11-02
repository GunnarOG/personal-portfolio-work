import "./App.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <>
      <Navigation />
      <Home />
      <Projects />
    </>
  );
}
