import "./App.css";
import Article from "./routes/article";
import { useState } from "react";
import appContext from "./context/app";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import NotFound from "./components/404/notFound";
import Home from "./routes/home";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import PostArticle from "./components/panel/postArticle/postArticle";
import PArticle from "./components/panel/article/articles";
import EachArticle from "./routes/eachArticle";
import Panel from "./components/panel/panel";
import PanelNav from "./components/panel/panelNav";
import PCategory from "./components/panel/article/category";

function App() {
  const [mode, setmode] = useState("light");
  const [panelNav, setPanelNav] = useState("open");
  const location = useLocation();
  function setClasses() {
    if (panelNav === "open" && location.pathname.startsWith("/panel")) {
      return "panel-mode-nav-open";
    } else if (
      panelNav === "closed" &&
      location.pathname.startsWith("/panel")
    ) {
      return "panel-mode-nav-close";
    }
  }
  return (
    <appContext.Provider
      value={{
        mode: mode,
        setmode: setmode,
        changeMode: changeMode,
        convertNumbersToPersian: convertNumbersToPersian,
        isOpen: panelNav,
        openClose: openClose,
        setPanelNav: setPanelNav,
      }}
    >
      <div
        className={`app-container scroll-${mode} theme-bg-${mode} ${setClasses()}`}
      >
        <Routes>
          <Route path="/panel/*" element={<PanelNav />} />
          <Route path="/*" element={<Navbar />} />
        </Routes>

        <Routes>
          <Route path="/articles" element={<Article />} />
          <Route path="/articles/:id" element={<EachArticle />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/panel/articles" element={<PArticle />} />
          <Route path="/panel/articles/post" element={<PostArticle />} />
          <Route path="/panel/articles/category" element={<PCategory />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
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
  function openClose() {
    if (panelNav === "closed") {
      setPanelNav("open");
    } else if (panelNav === "open") {
      setPanelNav("closed");
    }
  }

  function convertNumbersToPersian(content) {
    const regex = /\d+/g; // Regular expression to match any sequence of digits
    const matches = content.match(regex); // Find all matches of numbers in the content

    if (matches) {
      matches.forEach((match) => {
        const persianNumber = digitsEnToFa(match);
        content = content.replace(match, persianNumber); // Replace the English number with the Persian number
      });
    }

    return content;
  }
}

export default App;
