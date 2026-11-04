import "./App.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import {Routes, Route} from 'react-router'

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/projects" element = {<Projects/>}/>
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
    </>
  );
}
