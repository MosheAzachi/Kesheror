import { useProducts } from "../context/ProductContext";
import { useNotification } from "../context/NotificationContext";
import { useEffect, useState } from "react";

function ProductManagement() {
  const { products, deleteProduct, addProduct, updateProduct, fetchProducts } = useProducts();
  const { showNotification } = useNotification();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = parseFloat(e.target.price.value);
    const discount = parseFloat(e.target.discount.value);
    const image = e.target.image.value;
    const productData = { name, description, price, discount: discount || 0, image };
    handleSaveProduct(productData);
  };

  const handleDelete = async (id) => {
    try {
      const message = await deleteProduct(id);
      showNotification(message, "success");
    } catch (error) {
      showNotification(error.message || "שגיאה בשרת", "error");
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      const message = editProduct
        ? await updateProduct(editProduct._id, productData) // Update existing product
        : await addProduct(productData); // Add new product
      showNotification(message, "success");
      setModalOpen(false);
      setEditProduct(null); // Clear edit state
    } catch (error) {
      showNotification(error.message || "שגיאה בשרת", "error");
    }
  };

  const openEditModal = (product) => {
    setEditProduct(product); // Set the product to be edited
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditProduct(null); // Clear edit state
  };

  const getDiscountedPrice = (price, discount) => {
    const discountedPrice = discount > 0 ? price - price * (discount / 100) : price;
    return Math.round(discountedPrice);
  };

  return (
    <div className="shadow-md rounded">
      <h2 className="text-center bg-[#8B0000] py-3 text-white">ניהול מוצרים</h2>
      <div className="flex flex-col gap-4 p-4 bg-gray-50">
        <div>
          <button className="px-4 py-2 bg-green-500 text-white hover:bg-green-600" onClick={() => setModalOpen(true)}>
            ➕ הוסף מוצר חדש
          </button>
        </div>
        <div className="overflow-x-auto shadow-md max-h-96 overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">תמונה</th>
                <th className="border border-gray-300 p-2">שם מוצר</th>
                <th className="border border-gray-300 p-2">מחיר</th>
                <th className="border border-gray-300 p-2">הנחה</th>
                <th className="border border-gray-300 p-2">מחיר אחרי הנחה</th>
                <th className="border border-gray-300 p-2">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="hover:bg-gray-100" key={product._id}>
                  <td className="border border-gray-300 p-2 text-center">
                    <img src={product.image} alt={product.name} className="w-12 h-12 mx-auto rounded" />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{product.name}</td>
                  <td className="border border-gray-300 p-2 text-center">₪{product.price}</td>
                  <td className="border border-gray-300 p-2 text-center">{product.discount}%</td>
                  <td className="border border-gray-300 p-2 text-center">
                    ₪{getDiscountedPrice(product.price, product.discount)}
                  </td>
                  <td className="border border-gray-300 text-center">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded m-1 hover:bg-blue-600"
                      onClick={() => openEditModal(product)}
                    >
                      ערוך
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded m-1 hover:bg-red-600"
                      onClick={() => handleDelete(product._id)}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          onClick={closeModal}
        >
          <div className="bg-white w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between bg-[#8B0000] p-3 items-center">
              <h2 className="text-white font-bold">{editProduct ? "ערוך מוצר" : "הוסף מוצר חדש"}</h2>
              <button className="text-white" onClick={closeModal}>
                ✖
              </button>
            </div>
            <form className="p-2" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                defaultValue={editProduct?.name || ""}
                placeholder="שם המוצר"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                name="description"
                type="text"
                defaultValue={editProduct?.description || ""}
                placeholder="תיאור המוצר"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                name="price"
                type="number"
                defaultValue={editProduct?.price || ""}
                placeholder="מחיר המוצר"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                name="discount"
                type="number"
                defaultValue={editProduct?.discount || ""}
                placeholder="הנחה"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                name="image"
                type="text"
                defaultValue={editProduct?.image || ""}
                placeholder="כתובת התמונה"
                className="w-full mb-2 p-2 border rounded"
              />
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                {editProduct ? "עדכן מוצר" : "הוסף מוצר"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
