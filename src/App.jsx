import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import SSS from "./components/SSS";
import Team from "./components/Team";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />

      <div className="w-full">
        <img
          src="/assets/section_divider.png"
          alt="Section Divider"
          className="relative bottom-4 lg:bottom-15 w-full h-auto object-contain"
        />
      </div>

      <Leaderboard />

      <div className="w-full">
        <img
          src="/assets/section_divider.png"
          alt="Section Divider"
          className="relative -bottom-10 w-full h-auto object-contain"
        />
      </div>

      <SSS />

      <div className="w-full">
        <img
          src="/assets/section_divider.png"
          alt="Section Divider"
          className="relative bottom-10 w-full h-auto object-contain"
        />
      </div>

      <Team />
      <GallerySection />

      <Footer />
    </div>
  );
}

export default App;
