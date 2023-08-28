import { createContext, useState, useEffect, useReducer } from "react";
import { mails } from "../data/data";
export const MailContext = createContext();

export const MailProvider = ({ children }) => {
  const getMailFromLocalStorage = () => {
    try {
      const localStorageData = localStorage.getItem("data");
      return localStorageData ? JSON.parse(localStorageData) : mails;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return mails;
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "MARK_AS_READ":
        const updateEmail = state.data.map((selectedEmail) =>
          selectedEmail.mId === action.emailId
            ? { ...selectedEmail, unread: !selectedEmail.unread }
            : selectedEmail
        );
        return { ...state, data: updateEmail };

      case "REPORT_SPAM":
        const spamEmail = state.data.map((selectedEmail) =>
          selectedEmail.mId === action.emailId
            ? { ...selectedEmail, spam: !selectedEmail.spam }
            : selectedEmail
        );
        return { ...state, data: spamEmail };

      case "DELETE":
        const deletedEmail = state.data.find((selectedEmail) =>
          selectedEmail.mId === action.emailId
            ? { ...selectedEmail, unread: true }
            : selectedEmail
        );

        const updatedData = state.data.filter(
          (selectedEmail) => selectedEmail.mId !== action.emailId
        );

        return {
          ...state,
          data: updatedData,
          trash: [...state.trash, deletedEmail]
        };

      case "STAR":
        const starEmail = state.data.map((selectedEmail) =>
          selectedEmail.mId === action.emailId
            ? { ...selectedEmail, isStarred: !selectedEmail.isStarred }
            : selectedEmail
        );
        return { ...state, data: starEmail };

      case "FILTER_UNREAD":
        const filterUnreadEmails = state.data.filter((email) => email.unread);
        if (!state.showUnread) {
          return {
            ...state,
            data: filterUnreadEmails,
            showUnread: !state.showUnread
          };
        } else {
          return { ...state, data: mails, showUnread: !state.showUnread };
        }

      case "FILTER_STARRED":
        const filterStarred = state.data.filter((email) => email.isStarred);
        if (!state.starred) {
          return { ...state, data: filterStarred, starred: !state.starred };
        } else {
          return { ...state, data: mails, starred: !state.starred };
        }

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    data: mails,
    trash: [],
    showUnread: false,
    starred: false
  });
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.data));
  }, [state.data]);

  const value = {
    state,
    dispatch
  };

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
};
