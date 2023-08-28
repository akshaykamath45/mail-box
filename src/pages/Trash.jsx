import { useContext } from "react";
import { MailContext } from "../context/MailContext";
export const Trash = () => {
  const { state } = useContext(MailContext);
  const trashEmails = state.trash;
  return (
    <div>
      <h1>Trash</h1>
      <div className="inbox">
        {trashEmails.length === 0 && <h2>No emails in Trash</h2>}
        {trashEmails.map((mail) => (
          <div className="mail-card" style={{ backgroundColor: "white" }}>
            <h2>Subject: {mail.subject}</h2>
            <p>{mail.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
