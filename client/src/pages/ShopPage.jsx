import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useProducts } from "../context/ProductContext";
import { useEffect } from "react";

function ShopPage() {
  const { addToCart, toggleCart, isInCart } = useCart();
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const getDiscountedPrice = (price, discount) => {
    const discountedPrice = discount > 0 ? price - price * (discount / 100) : price;
    return Math.round(discountedPrice);
  };

  const handleAddToCart = (product) => {
    if (!user) {
      showNotification("יש להתחבר כדי להוסיף מוצרים לעגלה", "error");
      return;
    }
    const discountedPrice = getDiscountedPrice(product.price, product.discount);
    const productToAdd = {
      ...product,
      price: discountedPrice,
    };
    addToCart(productToAdd);
    toggleCart();
    showNotification(`${product.name} נוסף לעגלה`, "success");
  };

  return (
    <div className="page-container">
      <h1>חנות המוצרים</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col gap-4 border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 rounded border border-gray-400 shadow"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}% הנחה
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 h-full justify-between">
              <div>
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                {product.discount > 0 ? (
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-bold text-[#8B0000]">
                      ₪{getDiscountedPrice(product.price, product.discount)}
                    </p>
                    <p className="text-sm line-through text-gray-500">₪{product.price}</p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-[#8B0000]">₪{product.price}</p>
                )}
              </div>
              <button
                className={`w-full py-2 rounded transition ${
                  isInCart(product._id)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#8B0000] hover:bg-[#A50000] text-white"
                }`}
                onClick={() => !isInCart(product._id) && handleAddToCart(product)}
              >
                {isInCart(product._id) ? "נמצא בעגלה" : "הוסף לעגלה"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
