import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { isCartOpen, toggleCart, cart, cartLength, deleteItem, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate("/checkout");
  };

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleCart}></div>}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-100 z-50 transform text-gray-800 transition-transform duration-500 flex flex-col ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between bg-[#8B0000] p-4">
          <h2 className="text-white">סל קניות</h2>
          <button className="primary px-3" onClick={toggleCart}>
            סגור
          </button>
        </div>
        {cartLength > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-2">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b border-gray-300 p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-400"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <p className="text-sm font-bold text-[#8B0000]">₪{item.price}</p>
                    <button className="secondary text-sm px-2" onClick={() => deleteItem(item._id)}>
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 py-2 px-4 border-t border-gray-400 bg-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">סה"כ:</span>
                <span className="text-lg font-bold text-[#8B0000]">₪{totalPrice}</span>
              </div>
              <button className="secondary w-full py-2" onClick={handleCheckout}>
                לעבור לתשלום
              </button>
              <button className="primary w-full py-2" onClick={clearCart}>
                מחק הכל
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">העגלה ריקה</p>
        )}
      </div>
    </>
  );
}

export default Cart;
