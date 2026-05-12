import Sidebar from "../components/Sidebar";


import "./ProfilePage.css";

function ProfilePage() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {

    return (

      <div className="no-user-page">

        <h1>
          No user logged in 😢
        </h1>

      </div>

    );

  }

  return (

    <div className="profile-page">

      <Sidebar />

      <div className="profile-container">

        <div className="profile-header">

          <div className="profile-avatar">

            {
              user.name
                ?.charAt(0)
                ?.toUpperCase()
            }

          </div>

          <div>

            <h1>
              {user.name}
            </h1>

            <p>
              {
                user.role ===
                "supplier"
                  ? "Supplier Account"
                  : "Restaurant Account"
              }
            </p>

          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-card">

            <h2>
              Account Information
            </h2>

            <div className="info-row">

              <span>
                Full Name
              </span>

              <strong>
                {user.name}
              </strong>

            </div>

            <div className="info-row">

              <span>
                Email
              </span>

              <strong>
                {user.email}
              </strong>

            </div>

            <div className="info-row">

              <span>
                Role
              </span>

              <strong className="role-badge">
                {user.role}
              </strong>

            </div>

          </div>

          <div className="profile-card">

            <h2>
              Business Overview
            </h2>

            <div className="business-stats">

              <div className="business-box">

                <h3>
                  🚀 Activity
                </h3>

                <p>
                  Highly Active
                </p>

              </div>

              <div className="business-box">

                <h3>
                  📦 Orders
                </h3>

                <p>
                  Growing Fast
                </p>

              </div>

              <div className="business-box">

                <h3>
                  ⭐ Reputation
                </h3>

                <p>
                  Trusted Partner
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="profile-bottom">

          <div className="settings-card">

            <h2>
              Account Settings
            </h2>

            <button>
              Edit Profile
            </button>

            <button>
              Change Password
            </button>

            <button className="danger-btn">
              Delete Account
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProfilePage;