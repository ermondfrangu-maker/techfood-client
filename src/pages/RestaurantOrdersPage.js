import Sidebar from "../components/Sidebar";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./RestaurantOrdersPage.css";

function RestaurantOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "https://scrambled-vagabond-payer.ngrok-free.dev/api/orders/restaurant",
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const pendingOrders =
    orders.filter(
      (o) =>
        o.status ===
        "pending"
    ).length;

  const acceptedOrders =
    orders.filter(
      (o) =>
        o.status ===
        "accepted"
    ).length;

  const rejectedOrders =
    orders.filter(
      (o) =>
        o.status ===
        "rejected"
    ).length;

  return (

    <div className="restaurant-orders-page">

      <Sidebar />

      <div className="restaurant-orders-container">

        <div className="restaurant-orders-header">

          <h1>
            My Orders 📦
          </h1>

          <p>
            Track all your restaurant
            orders in real-time.
          </p>

        </div>

        <div className="restaurant-stats">

          <div className="restaurant-stat-card">

            <h3>
              Total Orders
            </h3>

            <h1>
              {orders.length}
            </h1>

          </div>

          <div className="restaurant-stat-card pending">

            <h3>
              Pending
            </h3>

            <h1>
              {pendingOrders}
            </h1>

          </div>

          <div className="restaurant-stat-card accepted">

            <h3>
              Accepted
            </h3>

            <h1>
              {acceptedOrders}
            </h1>

          </div>

          <div className="restaurant-stat-card rejected">

            <h3>
              Rejected
            </h3>

            <h1>
              {rejectedOrders}
            </h1>

          </div>

        </div>

        <div className="restaurant-orders-list">

          {orders.length === 0 && (

            <div className="empty-orders">

              <h2>
                No orders yet 😢
              </h2>

              <p>
                Start ordering from
                suppliers.
              </p>

            </div>

          )}

          {orders.map((order) => (

            <div
              key={order.id}
              className="restaurant-order-card"
            >

              <div className="restaurant-order-top">

                <div>

                  <h2>
                    Order #
                    {order.id}
                  </h2>

                  <p>
                    🏪
                    {" "}
                    {
                      order.supplier_name
                    }
                  </p>

                </div>

                <div
                  className={`restaurant-status ${order.status}`}
                >
                  {order.status}
                </div>

              </div>

              <div className="restaurant-order-bottom">

                <div className="timeline">

                  <div className="timeline-step active">
                    Ordered
                  </div>

                  <div
                    className={`timeline-step ${
                      order.status ===
                        "accepted"
                        ? "active"
                        : ""
                    }`}
                  >
                    Accepted
                  </div>

                  <div
                    className={`timeline-step ${
                      order.status ===
                        "rejected"
                        ? "rejected-step"
                        : ""
                    }`}
                  >
                    {
                      order.status ===
                      "rejected"
                        ? "Rejected"
                        : "Completed"
                    }
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default RestaurantOrdersPage;