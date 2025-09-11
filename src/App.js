import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import PostDetail from "./components/PostDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import Unsubscribe from "./components/Unsubscribe";
import "./styles.css";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
