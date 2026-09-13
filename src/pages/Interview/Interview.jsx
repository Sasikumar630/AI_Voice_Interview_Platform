import "./Interview.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions } from "../../api/gemini";

function Interview() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState(5);
  const [type, setType] = useState("Technical");
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {

    try {

        setLoading(true);

        const response = await generateQuestions(
            category,
            difficulty,
            type,
            questions
        );

        const aiQuestions = JSON.parse(
            response.replace(/```json|```/g, "").trim()
        );

        navigate("/InterviewSession", {
            state: {
                category,
                difficulty,
                type,
                questions: aiQuestions
            }
        });

    } catch (error) {

        console.error(error);
        alert("Failed to generate interview questions.",error);
        alert(error.message);
    } finally {

        setLoading(false);

    }

};

  return (
    <section className="interview-setup">
      <h1>{category.toUpperCase()} Interview</h1>

      <p>Configure your interview before starting.</p>

      {/* Difficulty */}
      <div className="difficulty">
        <h3>Select Difficulty</h3>

        <div className="levels">
          <button
            className={difficulty === "Easy" ? "active" : ""}
            onClick={() => setDifficulty("Easy")}
          >
            Easy
          </button>

          <button
            className={difficulty === "Medium" ? "active" : ""}
            onClick={() => setDifficulty("Medium")}
          >
            Medium
          </button>

          <button
            className={difficulty === "Hard" ? "active" : ""}
            onClick={() => setDifficulty("Hard")}
          >
            Hard
          </button>
        </div>
      </div>

      {/* Question Count */}
      <div className="question-count">
        <h3>Number of Questions</h3>

        <select
          value={questions}
          onChange={(e) => setQuestions(Number(e.target.value))}
        >
          <option value={2}> 2 Questions</option>        
          <option value={5}>5 Questions</option>
          <option value={10}>10 Questions</option>
          <option value={15}>15 Questions</option>
          <option value={20}>20 Questions</option>
        </select>
      </div>

      {/* Interview Type */}
      <div className="interview-type">
        <h3>Interview Type</h3>

        <label>
          <input
            type="radio"
            value="Technical"
            checked={type === "Technical"}
            onChange={(e) => setType(e.target.value)}
          />
          Technical
        </label>

        <label>
          <input
            type="radio"
            value="HR"
            checked={type === "HR"}
            onChange={(e) => setType(e.target.value)}
          />
          HR
        </label>

        <label>
          <input
            type="radio"
            value="Mixed"
            checked={type === "Mixed"}
            onChange={(e) => setType(e.target.value)}
          />
          Mixed
        </label>
      </div>

      {/* Start Button */}
      <button
    className="start-interview-btn"
    disabled={!difficulty || loading}
    onClick={handleStartInterview}
>
    {loading ? "Generating AI Questions..." : "Start Interview"}
</button>

    </section>
  );
}

export default Interview;