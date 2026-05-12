import socket from "../socket";
import Sidebar from "../components/Sidebar";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./NotificationsPage.css";

function NotificationsPage() {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {

    fetchNotifications();

    socket.on(
      "orderUpdated",
      () => {

        fetchNotifications();

      }
    );

    return () => {

      socket.off(
        "orderUpdated"
      );

    };

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://scrambled-vagabond-payer.ngrok-free.dev/api/notifications",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        const sortedNotifications =
          res.data.sort(
            (a, b) =>
              new Date(
                b.created_at
              ) -
              new Date(
                a.created_at
              )
          );

        setNotifications(
          sortedNotifications
        );

      } catch (error) {

        console.log(error);

      }

    };

  const getIcon = (
    message
  ) => {

    if (
      message.includes(
        "accepted"
      )
    ) {

      return "✅";

    }

    if (
      message.includes(
        "rejected"
      )
    ) {

      return "❌";

    }

    return "🛒";

  };

  const getBadge = (
    message
  ) => {

    if (
      message.includes(
        "accepted"
      )
    ) {

      return "Accepted";

    }

    if (
      message.includes(
        "rejected"
      )
    ) {

      return "Rejected";

    }

    return "New";

  };

  return (

    <div className="notifications-page">

      <Sidebar />

      <div className="notifications-container">

        <div className="notifications-header">

          <h1>
            Notifications 🔔
          </h1>

          <p>
            Stay updated with your
            latest platform activity.
          </p>

        </div>

        <div className="notifications-stats">

          <div className="notifications-stat-card">

            <h3>
              Total Notifications
            </h3>

            <h1>
              {
                notifications.length
              }
            </h1>

          </div>

          <div className="notifications-stat-card active-stat">

            <h3>
              Active Updates
            </h3>

            <h1>
              {
                notifications.length >
                0
                  ? "Live"
                  : "0"
              }
            </h1>

          </div>

        </div>

        {notifications.length ===
        0 ? (

          <div className="empty-notifications">

            <div className="empty-icon">
              🔔
            </div>

            <h2>
              No notifications yet
            </h2>

            <p>
              New updates will appear
              here in real-time.
            </p>

          </div>

        ) : (

          <div className="notifications-list">

            {notifications.map(
              (
                notification
              ) => (

                <div
                  key={
                    notification.id
                  }
                  className="notification-card"
                >

                  <div className="notification-left">

                    <div className="notification-icon">

                      {
                        getIcon(
                          notification.message
                        )
                      }

                    </div>

                  </div>

                  <div className="notification-content">

                    <h2>
                      {
                        notification.message
                      }
                    </h2>

                    <p>
                      {
                        new Date(
                          notification.created_at
                        ).toLocaleString()
                      }
                    </p>

                  </div>

                  <div className="notification-badge">

                    {
                      getBadge(
                        notification.message
                      )
                    }

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default NotificationsPage;