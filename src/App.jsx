import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import SSS from "./components/SSS";
import Team from "./components/Team";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer";
import Divider from "./components/Divider"; // Import Divider
import Events from "./components/Events"; // Import Events

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />

      {/* Replaced with Divider component, passing original classes */}
      <Divider className="relative bottom-4 lg:bottom-15" />

      <Leaderboard />

      {/* Added Divider before Events, similar to SSS divider */}
      <Divider className="relative -bottom-10" />
      <Events />

      {/* Replaced with Divider component, passing original classes */}
      <Divider className="relative -bottom-10" />

      <SSS />

      {/* Replaced with Divider component, passing original classes */}
      <Divider className="relative bottom-10" />

      <Team />
      <GallerySection />

      <Footer />
    </div>
  );
}

export default App;
