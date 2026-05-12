import Sidebar from "../components/Sidebar";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./ProductsPage.css";

function ProductsPage() {

  const [products, setProducts] =
    useState([]);

  const [favorites, setFavorites] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    fetchProducts();

    if (
      role === "restaurant"
    ) {

      fetchFavorites();

    }

  }, [role]);

  const fetchProducts =
    async () => {

      try {

        const res =
          await axios.get(
            "https://scrambled-vagabond-payer.ngrok-free.dev/api/products"
          );

        setProducts(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchFavorites =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://scrambled-vagabond-payer.ngrok-free.dev/api/favorites",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setFavorites(
          res.data.map(
            (fav) =>
              fav.product_id
          )
        );

      } catch (error) {

        console.log(error);

      }

    };

  const toggleFavorite =
    async (productId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.post(
            `https://scrambled-vagabond-payer.ngrok-free.dev/api/favorites/${productId}`,
            {},
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        if (
          res.data.favorited
        ) {

          setFavorites([
            ...favorites,
            productId,
          ]);

        } else {

          setFavorites(
            favorites.filter(
              (id) =>
                id !== productId
            )
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  const addToCart =
    async (productId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "https://scrambled-vagabond-payer.ngrok-free.dev/api/cart",
          {
            product_id:
              productId,
            quantity,
          },
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        alert(
          "Added to cart 🚀"
        );

      } catch (error) {

        console.log(error);

        alert("Failed ❌");

      }

    };

  let filteredProducts =
    products.filter(
      (product) => {

        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          selectedCategory ===
            "" ||
          product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  if (
    sortBy === "cheapest"
  ) {

    filteredProducts.sort(
      (a, b) =>
        a.price - b.price
    );

  }

  if (
    sortBy ===
    "highest-price"
  ) {

    filteredProducts.sort(
      (a, b) =>
        b.price - a.price
    );

  }

  if (
    sortBy ===
    "highest-stock"
  ) {

    filteredProducts.sort(
      (a, b) =>
        b.stock - a.stock
    );

  }

  const groupedProducts =
    {};

  filteredProducts.forEach(
    (product) => {

      if (
        !groupedProducts[
          product
            .supplier_name
        ]
      ) {

        groupedProducts[
          product
            .supplier_name
        ] = [];

      }

      groupedProducts[
        product
          .supplier_name
      ].push(product);

    }
  );

  return (

    <div className="products-page">

      <Sidebar />

      <div className="products-container">

        <div className="products-header">

          <div>

            <h1>
              Supplier Marketplace 🚀
            </h1>

            <p>
              Discover premium
              suppliers and
              products in
              real-time.
            </p>

          </div>

          <div className="products-counter">

            <h2>
              {
                filteredProducts.length
              }
            </h2>

            <span>
              Products
            </span>

          </div>

        </div>

        <div className="products-filters">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={
              selectedCategory
            }
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
          >

            <option value="">
              All Categories
            </option>

            <option value="Meat">
              Meat
            </option>

            <option value="Drinks">
              Drinks
            </option>

            <option value="Bakery">
              Bakery
            </option>

            <option value="Vegetables">
              Vegetables
            </option>

            <option value="Frozen Food">
              Frozen Food
            </option>

            <option value="Dairy">
              Dairy
            </option>

          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >

            <option value="newest">
              Newest
            </option>

            <option value="cheapest">
              Cheapest
            </option>

            <option value="highest-price">
              Highest Price
            </option>

            <option value="highest-stock">
              Highest Stock
            </option>

          </select>

        </div>

        {filteredProducts.length ===
          0 && (

          <div className="empty-products">

            <h2>
              No products found 😢
            </h2>

            <p>
              Try different
              filters.
            </p>

          </div>

        )}

        {Object.keys(
          groupedProducts
        ).map((supplier) => (

          <div
            key={supplier}
            className="supplier-section"
          >

            <div className="supplier-header">

              <h2>
                🏪 {supplier}
              </h2>

            </div>

            <div className="products-grid">

              {groupedProducts[
                supplier
              ].map((product) => (

                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => {

                    setSelectedProduct(
                      product
                    );

                    setQuantity(1);

                  }}
                >

                  <div className="product-image-wrapper">

                    {product.image_url ? (

                      <img
                        src={
                          product.image_url.startsWith(
                            "http"
                          )
                            ? product.image_url
                            : `https://scrambled-vagabond-payer.ngrok-free.dev${product.image_url}`
                        }
                        alt={
                          product.name
                        }
                        className="product-image"
                      />

                    ) : (

                      <div className="no-image">
                        📦
                      </div>

                    )}

                  </div>

                  <div className="product-content">

                    <div className="product-top">

                      <span className="category-badge">
                        {
                          product.category
                        }
                      </span>

                      <span className="stock-badge">
                        📦 {
                          product.stock
                        }
                      </span>

                    </div>

                    <h2>
                      {
                        product.name
                      }
                    </h2>

                    <p className="description">
                      {
                        product.description
                      }
                    </p>

                    <div className="product-bottom">

                      <div className="price">
                        €
                        {
                          product.price
                        }
                      </div>

                      {role ===
                        "restaurant" && (

                        <div className="product-actions">

                          <button
                            className="cart-btn"
                            onClick={(e) => {

                              e.stopPropagation();

                              addToCart(
                                product.id
                              );

                            }}
                          >

                            Add

                          </button>

                          <button
                            className={
                              favorites.includes(
                                product.id
                              )
                                ? "favorite-btn active-favorite"
                                : "favorite-btn"
                            }
                            onClick={(e) => {

                              e.stopPropagation();

                              toggleFavorite(
                                product.id
                              );

                            }}
                          >

                            {favorites.includes(
                              product.id
                            )
                              ? "❤️"
                              : "🤍"}

                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default ProductsPage;