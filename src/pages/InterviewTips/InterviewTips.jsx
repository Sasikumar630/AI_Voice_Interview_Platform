import "./InterviewTips.scss";

function InterviewTips() {
  return (
    <section className="tips">

      <div className="tips-header">
        <h1>💡 Interview Tips</h1>
        <p>
          Improve your interview performance with these practical tips
          followed by recruiters and experienced professionals.
        </p>
      </div>

      <div className="tips-grid">

        <div className="tip-card">
          <h2>🎯 Before the Interview</h2>

          <ul>
            <li>Research the company.</li>
            <li>Review core technical concepts.</li>
            <li>Practice common interview questions.</li>
            <li>Prepare your resume thoroughly.</li>
            <li>Test your internet and microphone.</li>
          </ul>
        </div>

        <div className="tip-card">
          <h2>💬 During the Interview</h2>

          <ul>
            <li>Stay calm and confident.</li>
            <li>Listen carefully before answering.</li>
            <li>Explain your thought process.</li>
            <li>Maintain good eye contact.</li>
            <li>Be honest if you don't know an answer.</li>
          </ul>
        </div>

        <div className="tip-card">
          <h2>💼 HR Interview Tips</h2>

          <ul>
            <li>Introduce yourself confidently.</li>
            <li>Highlight your strengths.</li>
            <li>Share real experiences.</li>
            <li>Show enthusiasm to learn.</li>
            <li>Ask thoughtful questions.</li>
          </ul>
        </div>

        <div className="tip-card">
          <h2>💻 Technical Interview Tips</h2>

          <ul>
            <li>Revise  fundamentals.</li>
            <li>Practice DSA regularly.</li>
            <li>Understand OOP concepts.</li>
            <li>Know SQL basics.</li>
            <li>Explain your code clearly.</li>
          </ul>
        </div>

        <div className="tip-card">
          <h2>🚫 Common Mistakes</h2>

          <ul>
            <li>Speaking too fast.</li>
            <li>Giving incomplete answers.</li>
            <li>Ignoring communication skills.</li>
            <li>Not asking questions.</li>
            <li>Panicking after one mistake.</li>
          </ul>
        </div>

        <div className="tip-cardd success">
          <h2>⭐ Success Tips</h2>

          <ul>
            <li>Practice consistently.</li>
            <li>Build confidence every day.</li>
            <li>Learn from AI feedback.</li>
            <li>Improve weak areas.</li>
            <li>Stay positive and never give up.</li>
          </ul>
        </div>

      </div>

    </section>
  );
}

export default InterviewTips;