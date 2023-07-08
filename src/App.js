import logo from "./logo.svg";
import "./App.css";
import Article from "./routes/article";
import { useState } from "react";
import appContext from "./context/app";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import NotFound from "./components/404/notFound";
import Home from "./routes/home";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import PostArticle from "./components/panel/postArticle/postArticle";
import PArticle from "./components/panel/article/articles";

function App() {
  const [mode, setmode] = useState("dark");
  return (
    <appContext.Provider
      value={{
        mode: mode,
        setmode: setmode,
        changeMode: changeMode,
        convertNumbersToPersian:convertNumbersToPersian
      }}
    >
      <div className={`app-container scroll-${mode} theme-bg-${mode}`}>
        <Navbar />
        <Routes>
          <Route path="/articles" Component={Article} />
          <Route path="/panel/articles" Component={PArticle} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" Component={Home} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
  function changeMode() {
    if (mode === "light") {
      setmode("dark");
    }
    if (mode === "dark") {
      setmode("light");
    }
  }
  function convertNumbersToPersian(content){
    const regex = /\d+/g; // Regular expression to match any sequence of digits
    const matches = content.match(regex); // Find all matches of numbers in the content
  
    if (matches) {
      matches.forEach((match) => {
        const persianNumber = digitsEnToFa(match);
        content = content.replace(match, persianNumber); // Replace the English number with the Persian number
      });
    }
  
    return content;
  };
}

export default App;
