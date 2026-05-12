import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import SupplierOrdersPage from "./pages/SupplierOrdersPage";
import RestaurantOrdersPage from "./pages/RestaurantOrdersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SupplierPage from "./pages/SupplierPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <NotificationsPage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/supplier/:id"
  element={
    <ProtectedRoute>
      <SupplierPage />
    </ProtectedRoute>
  }
/>

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier-orders"
          element={
            <ProtectedRoute>
              <SupplierOrdersPage />
            </ProtectedRoute>
          }
        
          />

          <Route
  path="/restaurant-orders"
  element={
    <ProtectedRoute>
      <RestaurantOrdersPage />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;