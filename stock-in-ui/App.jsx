import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StockInPage from "./components/StockInPage";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />
        <StockInPage />
      </div>
    </div>
  );
}

export default App;
