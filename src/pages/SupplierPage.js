import Sidebar from "../components/Sidebar";
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";


function ProductsPage() {

  const [products, setProducts] =
    useState([]);

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    fetchProducts();

  }, []);

  // GET PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "https://scrambled-vagabond-payer.ngrok-free.dev/api/products"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ADD TO CART
  const addToCart = async (
    productId
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://scrambled-vagabond-payer.ngrok-free.dev/api/cart",
        {
          product_id: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Added to cart 🚀");

    } catch (error) {

      console.log(error);

      alert("Failed ❌");

    }

  };

  return (

    <div>

      <Sidebar />

      <div
        style={{
          padding: "40px",
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "40px",
            color: "#111827",
          }}
        >
          Products 📦
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >

          {products.map((product) => (

            <div
              key={product.id}
              style={{

                background: "white",

                borderRadius: "20px",

                padding: "25px",

                boxShadow:
                  "0 6px 18px rgba(0,0,0,0.1)",

                transition: "0.3s",

              }}
            >

              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "15px",
                  color: "#111827",
                }}
              >
                {product.name}
              </h2>

              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "20px",
                  lineHeight: "1.6",
                }}
              >
                {product.description}
              </p>

              <p>
                <strong>
                  Price:
                </strong>
                {" "}
                ${product.price}
              </p>

              <p>
                <strong>
                  Stock:
                </strong>
                {" "}
                {product.stock}
              </p>

              <p>

                <strong>
                  Supplier:
                </strong>

                {" "}

                <a
                  href={`/supplier/${product.supplier_id}`}
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {product.supplier_name}
                </a>

              </p>

              {/* RESTAURANT */}
              {role ===
                "restaurant" && (

                <button
                  onClick={() =>
                    addToCart(
                      product.id
                    )
                  }
                  style={{

                    marginTop: "20px",

                    width: "100%",

                    background:
                      "#10b981",

                    color: "white",

                    border: "none",

                    padding: "14px",

                    borderRadius: "12px",

                    cursor: "pointer",

                    fontWeight: "bold",

                    fontSize: "16px",

                  }}
                >
                  Add To Cart 🛒
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default ProductsPage;