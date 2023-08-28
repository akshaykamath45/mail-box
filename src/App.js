import "./styles.css";
import { Inbox } from "./pages/Inbox";
import { Spam } from "./pages/Spam";
import { Trash } from "./pages/Trash";
import { SingleEmail } from "./pages/SingleEmail";
import { Routes, Route, NavLink } from "react-router-dom";

export default function App() {
  const getActiveStyle = ({ isActive }) => {
    return {
      color: isActive ? "red" : "rgb(111 111 110)",
      textDecoration: "none",
      borderRight: isActive ? "2px solid black" : "none",
      fontWeight: isActive ? "bold" : "lighter",
      paddingRight: "4px",
      fontFamily: "'Times New Roman', Times, serif"
    };
  };
  return (
    <div className="App">
      <h2 className="header">Mail Box</h2>
      <div className="layout">
        <div className="side-bar">
          <NavLink to="/" style={getActiveStyle}>
            Inbox
          </NavLink>
          <NavLink to="/spam" style={getActiveStyle}>
            Spam
          </NavLink>
          <NavLink to="/trash" style={getActiveStyle}>
            Trash
          </NavLink>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inbox />} />
            <Route path="/spam" element={<Spam />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/mail/:mailId" element={<SingleEmail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
