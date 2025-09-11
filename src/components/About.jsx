import React, { useState } from "react";
import "../styles.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Gurpreet Pannu</h1>
        <p>Welcome to my blog! Let me tell you a bit about myself.</p>
      </div>

      <div className="about-tabs">
        <button
          className={`tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`tab ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
      </div>

      <div className="about-content">
        {activeTab === "about" ? (
          <div className="about-section">
            <h2>Who I Am</h2>
            <p>
              I am a passionate data scientist and technology enthusiast with a
              strong background in machine learning and data analysis. My journey
              in the tech world has been driven by a curiosity to understand and
              solve complex problems using data-driven approaches.
            </p>

            <h2>What I Do</h2>
            <p>
              Currently, I work on developing and implementing machine learning
              solutions, focusing on natural language processing and predictive
              analytics. I&apos;m particularly interested in the intersection of
              artificial intelligence and business applications.
            </p>

            <h2>My Mission</h2>
            <p>
              Through this blog, I aim to share my knowledge and experiences in
              data science and technology. I believe in making complex concepts
              accessible and helping others navigate the exciting world of data
              science.
            </p>
          </div>
        ) : (
          <div className="education-section">
            <h2>Education</h2>
            <div className="education-item">
              <h3>M.Science in Artificial Intelligence</h3>
              <p className="institution">Tilburg University, Netherlands</p>
              <p className="year">2019 - 2020</p>
              <p className="thesis">Thesis: &quot;Crack Detection in Concrete using advanced segmentation in images&quot;</p>
            </div>

            <div className="education-item">
              <h3>Master of Science in Economics</h3>
              <p className="institution">Gokhale Institute of Politics and Economics, India</p>
              <p className="year">2015 - 2017</p>
            </div>

            <h2>Research Papers</h2>
            <ul className="papers-list">
              <li>
                <strong>&quot;Deep Learning Approaches for Sentiment Analysis&quot;</strong>
                <p>Published in IEEE Transactions on Natural Language Processing, 2021</p>
              </li>
              <li>
                <strong>&quot;Transformer Models for Text Classification&quot;</strong>
                <p>Presented at ACL 2020</p>
              </li>
              <li>
                <strong>&quot;Neural Networks in Natural Language Understanding&quot;</strong>
                <p>Published in Journal of Machine Learning Research, 2019</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default About; 