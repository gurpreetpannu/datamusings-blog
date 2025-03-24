import React from 'react';
import '../styles.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Me</h1>
        <p className="about-subtitle">Enterprise Data Scientist at Philip Morris International</p>
      </div>

      <section className="about-section">
        <h2>Professional Summary</h2>
        <p>I have been working in the field of data science for the past 7 years and counting. I have a strong foundation in 
          machine learning and deep learning. Having used these technologies to build models that have helped the business to 
          make data driven decisions. I have a strong foundation in AWS and have used it to build scalable solutions. Recently
          I have been working with LLM models through Amazon Bedrock to build solutions that help the business to automate tasks
          and improve efficiency.
        </p>
      </section>

      <section className="about-section">
        <h2>Professional Experience</h2>
        
        <div className="experience-item">
          <h3>Enterprise Data Scientist</h3>
          <p className="company">Philip Morris International</p>
          <p className="date">2022 - Present</p>
          <ul>
            <li>Developing and maintaining cloud scalable data products and solutions</li>
            <li>Working with Amazon Bedrock and other AWS services to build scalable solutions</li>
            <li>Building LLM models to automate tasks and improve efficiency</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>Data Scientist</h3>
          <p className="company">Dephion</p>
          <p className="date">2020 - 2022</p>
          <ul>
            <li>Developed customised machine learning models for the business to improve user experience</li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Cloud Technologies</h3>
            <ul>
              <li>Amazon Web Services, Amazon Bedrock, Amazon SageMaker</li>
              <li>Azure</li>
              <li>DataBricks</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Programming Languages</h3>
            <ul>
              <li>Python</li>
              <li>SQL</li>
              <li>PySpark</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Web Technologies</h3>
            <ul>
              <li>React</li>
              <li>Node.js</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Tools & Technologies</h3>
            <ul>
              <li>Git</li>
              <li>Docker</li>
              <li>CI/CD</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 