import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800">Hello, World!</h1>
        <p className="text-gray-700 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
          voluptate, quia, voluptates, quidem, iusto quas tempora quod aperiam
          doloremque voluptatum quos officia. Quasi, quod, quibusdam, doloremque
          voluptas dolorum voluptatem quidem.
        </p>
      </main>
    </div>
  );
}

export default App;
