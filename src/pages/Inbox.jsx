import "./Inbox.css";
import { useContext } from "react";
import { MailContext } from "../context/MailContext";
import { Link } from "react-router-dom";
export const Inbox = () => {
  const { state, dispatch } = useContext(MailContext);
  console.log(state.data);
  const unreadEmails = state.data.filter((email) => email.unread);

  return (
    <div>
      <h1>Inbox</h1>
      <div className="filter-div">
        <input
          type="checkbox"
          name="unread-emails"
          onChange={() => dispatch({ type: "FILTER_UNREAD" })}
          checked={state.showUnread}
        />
        Show unread mails
        <input
          type="checkbox"
          name="starred-emails"
          onChange={() => dispatch({ type: "FILTER_STARRED" })}
          checked={state.starred}
        />
        Show starred mails
      </div>
      <h3>Unread : {unreadEmails.length}</h3>
      <div className="inbox">
        {state.data.map((mail) => (
          <div
            className="mail-card"
            style={{
              backgroundColor: !mail.unread ? "white" : "rgb(242 246 252)"
            }}
          >
            <div className="mail-card-header">
              <h3>Subject: {mail.subject}</h3>
              <button
                onClick={() => dispatch({ type: "STAR", emailId: mail.mId })}
                style={{
                  height: "30px",
                  margin: "10px",
                  backgroundColor: "white",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {mail.isStarred ? "Unstar" : "Star"}
              </button>
            </div>

            <p>{mail.content}</p>
            <div className="card-footer">
              <div className="view-details">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/mail/${mail.mId}`}
                >
                  View Details
                </Link>
              </div>
              <div className="buttons">
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE", emailId: mail.mId })
                  }
                  style={{
                    backgroundColor: "white",
                    color: "red",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "MARK_AS_READ", emailId: mail.mId })
                  }
                  style={{
                    backgroundColor: "white",
                    color: "orange",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px"
                  }}
                >
                  {mail.unread ? "Mark as Read" : "Mark as Unread"}
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "REPORT_SPAM", emailId: mail.mId })
                  }
                  style={{
                    backgroundColor: mail.spam ? "green" : "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px"
                  }}
                >
                  {!mail.spam ? "Report Spam" : "Unreport Spam"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
