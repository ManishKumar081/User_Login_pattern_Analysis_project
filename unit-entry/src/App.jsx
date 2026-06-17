import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout";
import UnitEntryPage from "./pages/UnitEntryPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Navigate to="/unit-entry" />
          </Layout>
        }
      />

      <Route
        path="/unit-entry"
        element={
          <Layout>
            <UnitEntryPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;