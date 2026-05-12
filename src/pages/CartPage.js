import Sidebar from "../components/Sidebar";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./CartPage.css";

function CartPage() {

  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchCart();

  }, []);

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "https://scrambled-vagabond-payer.ngrok-free.dev/api/cart",
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      setCart(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const checkout = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        "https://scrambled-vagabond-payer.ngrok-free.dev/api/orders",
        {
          items: cart,
        },
        {
          headers: {
            Authorization:
              token,
          },
        }
      );

      alert(
        "Order placed successfully 🚀"
      );

      setCart([]);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Checkout failed ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  return (

    <div className="cart-page">

      <Sidebar />

      <div className="cart-container">

        <div className="cart-header">

          <h1>
            My Cart 🛒
          </h1>

          <p>
            Review your products
            before checkout.
          </p>

        </div>

        <div className="cart-layout">

          <div className="cart-items">

            {cart.length === 0 && (

              <div className="empty-cart">

                <h2>
                  Your cart is empty 😢
                </h2>

                <p>
                  Add products from
                  marketplace.
                </p>

              </div>

            )}

            {cart.map((item) => (

              <div
                key={item.id}
                className="cart-card"
              >

                <div className="cart-image">

                  {item.image_url ? (

                    <img
                      src={
                        item.image_url
                      }
                      alt={
                        item.name
                      }
                    />

                  ) : (

                    <div className="no-cart-image">
                      📦
                    </div>

                  )}

                </div>

                <div className="cart-info">

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    Premium supplier
                    product for your
                    business.
                  </p>

                  <div className="cart-details">

                    <span>
                      📦 Qty:
                      {" "}
                      {
                        item.quantity
                      }
                    </span>

                    <span>
                      💰 $
                      {item.price}
                    </span>

                  </div>

                </div>

                <div className="cart-total">

                  <h2>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </h2>

                </div>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Products
              </span>

              <strong>
                {cart.length}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                Free
              </strong>

            </div>

            <div className="summary-row total-row">

              <span>
                Grand Total
              </span>

              <strong>
                $
                {total.toFixed(
                  2
                )}
              </strong>

            </div>

            {cart.length > 0 && (

              <button
                className="checkout-btn"
                onClick={checkout}
                disabled={loading}
              >

                {
                  loading
                    ? "Processing..."
                    : "Checkout 🚀"
                }

              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default CartPage;