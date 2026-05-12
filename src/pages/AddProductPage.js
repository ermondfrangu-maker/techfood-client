import Sidebar from "../components/Sidebar";

import {
  useState,
} from "react";

import axios from "axios";

import "./AddProductPage.css";

function AddProductPage() {

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [
    image,
    setImage,
  ] = useState(null);

  const [
    preview,
    setPreview,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "price",
        price
      );

      formData.append(
        "stock",
        stock
      );

      formData.append(
        "category",
        category
      );

      if (image) {

        formData.append(
          "image",
          image
        );

      }

      await axios.post(
        "https://scrambled-vagabond-payer.ngrok-free.dev/api/products",
        formData,
        {
          headers: {
            Authorization:
              token,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Product added 🚀"
      );

      setName("");

      setDescription("");

      setPrice("");

      setStock("");

      setImage(null);

      setPreview("");

      setCategory("");

    } catch (error) {

      console.log(error);

      alert("Failed ❌");

    }

    setLoading(false);

  };

  return (

    <div className="add-product-page">

      <Sidebar />

      <div className="add-product-container">

        <div className="add-product-left">

          <h1>
            Add New Product 🚀
          </h1>

          <p>
            Publish products to the
            TechFood marketplace and
            reach restaurants in
            real-time.
          </p>

          <div className="tips-card">

            <h3>
              💡 Tips
            </h3>

            <ul>

              <li>
                Use high quality
                product images
              </li>

              <li>
                Write detailed
                descriptions
              </li>

              <li>
                Keep stock updated
              </li>

              <li>
                Use accurate pricing
              </li>

            </ul>

          </div>

        </div>

        <div className="add-product-right">

          <form
            className="product-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
            />

            <div className="double-inputs">

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files[0];

                setImage(file);

                if (file) {

                  setPreview(
                    URL.createObjectURL(
                      file
                    )
                  );

                }

              }}
            />

            {preview && (

              <img
                src={preview}
                alt="Preview"
                className="image-preview"
              />

            )}

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              required
            >

              <option value="">
                Select Category
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

            <button type="submit">

              {loading
                ? "Adding..."
                : "Add Product 🚀"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddProductPage;