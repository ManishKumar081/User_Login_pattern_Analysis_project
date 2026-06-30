import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MaterialEntry from "./pages/MaterialEntry";
import "./App.css";

function App() {
  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <Header />

        <MaterialEntry />

      </div>

    </div>
  );
}

export default App;