import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomBand";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container">
      <WelcomeBand />
      <h2 className="text-center mb-3">Cart</h2>

      <div className="mb-3 text-center">Cart items: {cart.length}</div>

      {cart.length === 0 ? (
        <p className="text-center">Cart is empty.</p>
      ) : (
        <ul className="list-group mb-3">
          {cart.map((item: CartItem) => (
            <li
              key={item.projectId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {item.projectName}: ${item.amount.toFixed(2)}
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromCart(item.projectId)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-center mb-3">Total: ${total.toFixed(2)}</h3>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-warning" onClick={clearCart}>
          Clear Cart
        </button>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default CartPage;