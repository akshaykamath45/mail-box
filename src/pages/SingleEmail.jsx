import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MailContext } from "../context/MailContext";
export const SingleEmail = () => {
  const { mailId } = useParams();
  const { state } = useContext(MailContext);
  const selectedMail = state.data.find((email) => email.mId === mailId);
  return (
    <div className="mail-card" style={{ backgroundColor: "beige" }}>
      <h2>Subject: {selectedMail.subject}</h2>
      <p>{selectedMail.content}</p>
    </div>
  );
};
