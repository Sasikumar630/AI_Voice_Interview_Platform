import "./Home.scss";
import categories from "../../data/categories";
import steps from "../../data/steps";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate ();
  console.log (categories);
  return (
    <section className="home">

      <div className="hero">

        <div className="hero-content">

          <span>🚀 Welcome to AI Voice Interview Preparation</span>

          <h1>
            Ace Your
            <span> Technical Interviews</span>
          </h1>

          <p>
            Practice AI-powered mock interviews, improve your confidence,
            and get ready for your dream job.
          </p>

          <div className="hero-buttons">
            <button className="start-btn" onClick={()=> navigate("/categories")}>Start Interview</button>
            <button className="explore-btn" onClick={()=> navigate("/tips")}>Interview Tips</button>
          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://illustrations.popsy.co/amber/digital-nomad.svg"
            alt="hero"
          />

        </div>

      </div>

      <section className="features">

  <h2>Why Choose AI Interview Prep?</h2>

  <div className="feature-container">

    <div className="feature-card">
      <div className="icon">🎯</div>
      <h3>Mock Interviews</h3>
      <p>
        Practice AI-generated interview questions with different difficulty levels.
      </p>
    </div>

    <div className="feature-card">
      <div className="icon">📊</div>
      <h3>Performance Analytics</h3>
      <p>
        Track your interview scores and monitor your improvement.
      </p>
    </div>

    <div className="feature-card">
      <div className="icon">💡</div>
      <h3>AI Feedback</h3>
      <p>
        Receive smart suggestions to improve every answer.
      </p>
    </div>

    <div className="feature-card">
      <div className="icon">🏆</div>
      <h3>Job Ready</h3>
      <p>
        Build confidence and crack your dream company's interview.
      </p>
    </div>

  </div>

</section>

<section className="stats">

  <div className="stat-card">
    <h2>10K+</h2>
    <p>Students</p>
  </div>

  <div className="stat-card">
    <h2>500+</h2>
    <p>Interview Questions</p>
  </div>

  <div className="stat-card">
    <h2>95%</h2>
    <p>Success Rate</p>
  </div>

  <div className="stat-card">
    <h2>24/7</h2>
    <p>AI Support</p>
  </div>

</section>

<div className="categories-container">
  {categories.map((category) => (
    <div className="category-card" key={category.id}>
      <div className="category-icon">{category.icon}</div>
      <h3>{category.title}</h3>
      <p>{category.questions}</p>
      <span>Easy • Medium • Hard</span>
     <button
    onClick={() =>
        navigate(`/interview/${category.title.toLowerCase()}`)
    }
>
    Start Interview
</button>
    </div>
  ))}
</div>

<section className="how-it-works">

    <h2>How It Works</h2>

    <div className="steps">

        {steps.map((step) => (

            <div className="step-card" key={step.id}>

                <div className="step-number">
                    {step.number}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

            </div>

        ))}

    </div>

</section>

</section>
      
  );
}

export default Home;