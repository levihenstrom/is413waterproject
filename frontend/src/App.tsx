import "./App.css";
import ProjectsPage from "./pages/ProjectPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DonatePage from "./pages/DonatePage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import CartSummary from "./components/CartSummary";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <CartSummary />
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/donate/:projectId/:projectName"
              element={<DonatePage />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
