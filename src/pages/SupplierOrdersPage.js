import Sidebar from "../components/Sidebar";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import socket from "../socket";

import "./SupplierOrdersPage.css";

function SupplierOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

    socket.on(
      "orderUpdated",
      () => {

        fetchOrders();

      }
    );

    return () => {

      socket.off(
        "orderUpdated"
      );

    };

  }, []);

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "https://scrambled-vagabond-payer.ngrok-free.dev/api/orders/supplier",
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

  const acceptOrder =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `https://scrambled-vagabond-payer.ngrok-free.dev/api/orders/accept/${id}`,
          {},
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  const rejectOrder =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `https://scrambled-vagabond-payer.ngrok-free.dev/api/orders/reject/${id}`,
          {},
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  const pending =
    orders.filter(
      (o) =>
        o.status ===
        "pending"
    ).length;

  const accepted =
    orders.filter(
      (o) =>
        o.status ===
        "accepted"
    ).length;

  return (

    <div className="supplier-orders-page">

      <Sidebar />

      <div className="supplier-orders-container">

        <div className="supplier-orders-header">

          <h1>
            Incoming Orders 📦
          </h1>

          <p>
            Manage supplier
            orders in real-time.
          </p>

        </div>

        <div className="supplier-stats">

          <div className="supplier-stat-card">

            <h3>
              Total Orders
            </h3>

            <h1>
              {orders.length}
            </h1>

          </div>

          <div className="supplier-stat-card">

            <h3>
              Pending
            </h3>

            <h1 className="pending-text">
              {pending}
            </h1>

          </div>

          <div className="supplier-stat-card">

            <h3>
              Accepted
            </h3>

            <h1 className="accepted-text">
              {accepted}
            </h1>

          </div>

        </div>

        <div className="orders-list">

          {orders.length ===
            0 && (

            <div className="empty-orders">

              No incoming
              orders yet.

            </div>

          )}

          {orders.map(
            (order) => (

              <div
                key={order.id}
                className="order-card"
              >

                <div>

                  <h2>
                    {
                      order.product_name
                    }
                  </h2>

                  <p>
                    Restaurant:
                    {" "}
                    {
                      order.restaurant_name
                    }
                  </p>

                  <p>
                    Quantity:
                    {" "}
                    {
                      order.quantity
                    }
                  </p>

                  <p>
                    Status:
                    {" "}

                    <strong>
                      {
                        order.status
                      }
                    </strong>

                  </p>

                </div>

                {order.status ===
                  "pending" && (

                  <div className="order-buttons">

                    <button
                      className="accept-btn"
                      onClick={() =>
                        acceptOrder(
                          order.id
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        rejectOrder(
                          order.id
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default SupplierOrdersPage;