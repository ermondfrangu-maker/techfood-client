import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ROLE
  const [role, setRole] = useState("restaurant");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://scrambled-vagabond-payer.ngrok-free.dev/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      console.log(res.data);

      alert("Register successful 🚀");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Register failed ❌"
      );

    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>Register 🚀</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >

          <option value="restaurant">
            Restaurant
          </option>

          <option value="supplier">
            Supplier
          </option>

        </select>

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );

}

export default RegisterPage;