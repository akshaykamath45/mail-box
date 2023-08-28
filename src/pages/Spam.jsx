import { useContext } from "react";
import { MailContext } from "../context/MailContext";
export const Spam = () => {
  const { state } = useContext(MailContext);
  const spamEmails = state.data.filter((email) => email.spam);
  return (
    <div>
      <h1>Spam</h1>
      <div className="inbox">
        {spamEmails.length === 0 && <h2>No spam emails</h2>}
        {spamEmails.map((mail) => (
          <div className="mail-card" style={{ backgroundColor: "white" }}>
            <h2>Subject: {mail.subject}</h2>
            <p>{mail.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
