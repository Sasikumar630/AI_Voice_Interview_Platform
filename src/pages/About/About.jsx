import "./About.scss";

function About() {
  return (
    <section className="about">

      <div className="about-header">
        <h1>About AI Interview Prep</h1>
        <p>
          An AI-powered interview preparation platform designed to help
          students and job seekers practice technical and HR interviews
          with real-time AI feedback.
        </p>
      </div>

      <div className="about-grid">

        <div className="card">
          <h2>🚀 Project Overview</h2>
          <p>
            AI Interview Prep simulates real interview experiences using
            Google Gemini AI. Users can practice interviews, answer
            questions by typing or speaking, and receive instant AI
            evaluation with scores and improvement suggestions.
          </p>
        </div>

        <div className="card">
          <h2>✨ Key Features</h2>

          <ul>
            <li>AI Generated Interview Questions</li>
            <li>Voice-Based Interview</li>
            <li>Speech-to-Text Answer Recording</li>
            <li>AI Text-to-Speech Questions</li>
            <li>AI Evaluation & Scoring</li>
            <li>Strengths & Weaknesses Analysis</li>
            <li>Ideal Answers & Suggestions</li>
            <li>Firebase Authentication</li>
            <li>Protected Routes</li>
          </ul>

        </div>

        <div className="card">
          <h2>🛠 Technologies</h2>

          <div className="tech-list">
            <span>React</span>
            <span>Vite</span>
            <span>JavaScript</span>
            <span>SCSS</span>
            <span>Firebase</span>
            <span>Gemini AI</span>
            <span>React Router</span>
            <span>HTML5</span>
            <span>CSS3</span>
          </div>

        </div>

        <div className="card">
          <h2>🎯 Goal</h2>

          <p>
            The goal of this project is to provide an interactive AI-based
            interview practice platform that helps users improve their
            technical knowledge, communication skills, and interview
            confidence.
          </p>

        </div>

        <div className="card developer">

          <h2>👨‍💻 Developer</h2>

          <h3>Sasikumar N</h3>

          <p>
            Java Full Stack Developer passionate about building modern,
            AI-powered web applications using React, Firebase, and Java.
          </p>

        </div>

      </div>

    </section>
  );
}

export default About;