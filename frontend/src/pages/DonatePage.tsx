
import WelcomeBand from "../components/WelcomBand";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import type { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";



function DonatePage() {
  const navigate = useNavigate();
  const { projectId, projectName } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const safeProjectId = Number(projectId);
  const safeProjectName = decodeURIComponent(projectName ?? "Unknown Project");

  const handleAddToCart = () => {
    if (!Number.isFinite(safeProjectId) || safeProjectId <= 0) return;
    if (donationAmount <= 0) return;

    const newItem: CartItem = {
      projectId: safeProjectId,
      projectName: safeProjectName,
      amount: donationAmount,
    };

    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <WelcomeBand />
      <h2 className="text-center mb-3">Donate</h2>

      <div className="d-flex flex-column align-items-center gap-3 mt-3">
        <h4 className="text-center mb-0">{safeProjectName}</h4>
        <input
          type="number"
          className="form-control"
          style={{ maxWidth: "320px" }}
          placeholder="Enter donation amount"
          min={0}
          step="0.01"
          value={donationAmount || ""}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
        />
        <button onClick={handleAddToCart} className="btn btn-success">
          Add to Cart
        </button>
        <button onClick={() => navigate("/")} className="btn btn-outline-primary">
          Back to Projects
        </button>
      </div>
    </>
  );
}

export default DonatePage;