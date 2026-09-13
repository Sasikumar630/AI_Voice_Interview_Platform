import "./Result.scss";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const evaluations = state?.evaluations || [];

    const totalScore = evaluations.reduce(
        (sum, item) => sum + item.score,
        0
    );

    const averageScore =
        evaluations.length > 0
            ? (totalScore / evaluations.length).toFixed(1)
            : 0;

    return (

        <section className="result">

            <h1>🎉 AI Interview Report</h1>

            <div className="summary">

                <p><strong>Category :</strong> {state.category}</p>

                <p><strong>Difficulty :</strong> {state.difficulty}</p>

                <p><strong>Interview Type :</strong> {state.type}</p>

                <p><strong>Total Questions :</strong> {evaluations.length}</p>

                <h2>
                    ⭐ Overall Score : {averageScore}/10
                </h2>

            </div>

            <div className="evaluation-list">

                {evaluations.map((item, index) => (

                    <div
                        className="evaluation-card"
                        key={index}
                    >

                        <h2>
                            Question {index + 1}
                        </h2>

                        <h3>{item.question}</h3>

                        <p>

                            <strong>Your Answer :</strong>

                            <br />

                            {item.answer}

                        </p>

                        <h3>
                            ⭐ Score : {item.score}/10
                        </h3>

                        <div>

                            <h4 className="strength">✅ Strengths</h4>

                            <ul>

                                {item.strengths.map((point, i) => (

                                    <li key={i}>{point}</li>

                                ))}

                            </ul>

                        </div>

                        <div>

                            <h4 className="weak">❌ Weaknesses</h4>

                            <ul>

                                {item.weaknesses.map((point, i) => (

                                    <li key={i}>{point}</li>

                                ))}

                            </ul>

                        </div>

                        <div>

                            <h4 className="sugg">💡 Suggestions</h4>

                            <ul>

                                {item.suggestions.map((point, i) => (

                                    <li key={i}>{point}</li>

                                ))}

                            </ul>

                        </div>

                        <div>

                            <h4 className="ideal">📘 Ideal Answer</h4>

                            <p>{item.idealAnswer}</p>

                        </div>

                    </div>

                ))}

            </div>

            <div className="buttons">

                <button
                    onClick={() => navigate("/")}
                >
                    Home
                </button>

                <button
                    onClick={() => navigate("/categories")}
                >
                    Start New Interview
                </button>

            </div>

        </section>

    );

}

export default Result;