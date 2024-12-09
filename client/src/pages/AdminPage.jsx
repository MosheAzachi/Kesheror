import ContactManagement from "../components/ContactManagement";
import OrdersManagement from "../components/OrdersManagement";
import ProductManagement from "../components/ProductsManagement";
import UsersManagement from "../components/UsersManagement";

function AdminPage() {
  return (
    <div className="page-container">
      <h1 className="text-center">אזור אישי - מנהל</h1>
      <UsersManagement />
      <ProductManagement />
      <OrdersManagement />
      <ContactManagement />
    </div>
  );
}

export default AdminPage;
