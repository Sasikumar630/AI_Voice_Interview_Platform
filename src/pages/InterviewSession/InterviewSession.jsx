import "./InterviewSession.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { evaluateInterview } from "../../api/gemini";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";


function InterviewSession() { 
  
    const { state } = useLocation();
    const navigate = useNavigate();
    const interviewQuestions = state.questions;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    // Timer
    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft((prevTime) => {

                if (prevTime <= 1) {

                    clearInterval(timer);

                    navigate("/result", {
                        state: {
                            category: state.category,
                            difficulty: state.difficulty,
                            type: state.type,
                            answers,
                            totalQuestions: interviewQuestions.length
                        }
                    });

                    return 0;
                }

                return prevTime - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [navigate, state, answers, interviewQuestions.length]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    useEffect(() => {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in this browser.");
        return;
    }

    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {

        let transcript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {
            transcript += event.results[i][0].transcript;
        }

        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: transcript
        }));

    };

    recognitionInstance.onstart = () => {
        setListening(true);
    };

    recognitionInstance.onend = () => {
        setListening(false);
    };

    setRecognition(recognitionInstance);

}, [currentQuestion]);

useEffect(() => {

    if (!interviewQuestions[currentQuestion]) return;

    const speech = new SpeechSynthesisUtterance();

    speech.text =
        `Question ${currentQuestion + 1}. ${interviewQuestions[currentQuestion].question}`;

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

}, [currentQuestion, interviewQuestions]);

 const handleSubmit = async () => {

    try {

        console.log("1. Submit button clicked");

        setLoading(true);

        const interviewData = interviewQuestions.map((item, index) => ({
            question: item.question,
            answer: answers[index] || ""
        }));

        console.log("2. Interview Data:", interviewData);

        const response = await evaluateInterview(interviewData);

        console.log("3. AI Response:", response);

        const aiEvaluation = JSON.parse(
            response.replace(/```json|```/g, "").trim()
        );

        console.log("4. Parsed AI:", aiEvaluation);

        const evaluations = aiEvaluation.map((item, index) => ({
            ...item,
            answer: answers[index] || ""
        }));

        console.log("5. Final Evaluations:", evaluations);


// Save interview to Firestore
await addDoc(
    collection(db, "users", auth.currentUser.uid, "history"),
    {
        category: state.category,
        difficulty: state.difficulty,
        type: state.type,
        evaluations,
        createdAt: serverTimestamp()
    }
);

console.log("6. Interview saved successfully!");

        navigate("/result", {
            state: {
                category: state.category,
                difficulty: state.difficulty,
                type: state.type,
                evaluations
            }
        });

    } catch (error) {

        console.error("ERROR:", error);
       // alert("🚀 AI is busy right now. Please try again in a few seconds.");
       alert(error.message);
        console.log(error);

    } finally {
        

        setLoading(false);

    }
};
    

    return (

       <section className="session">

    <h1>{state.category.toUpperCase()} Interview</h1>

    <h2>
        Question {currentQuestion + 1} of {interviewQuestions.length}
    </h2>

        {/* Timer */}

            <div className="timer">

                <h3>⏰ Time Left in</h3>

                <h2>
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                </h2>

            </div>


    <div className="progress-container">

    <div
        className="progress-bar"
        style={{ width: `${((currentQuestion + 1) / interviewQuestions.length) * 100}%`}}  > 
           </div>

</div>

    <div className="question-card">

        <h3>
            {interviewQuestions[currentQuestion]?.question}
        </h3>

        <div className="answer-box">

    <h3>Your Answer</h3>

<textarea
    placeholder="Type your answer..."
    value={answers[currentQuestion] || ""}
    onChange={(e) =>
        setAnswers({
            ...answers,
            [currentQuestion]: e.target.value
        })
    }
/>    

<div className="voice-controls">

    <button
        type="button"
        className="voice-btn"
        onClick={() => recognition?.start()}
        disabled={listening}
    >
        🎤 Start Recording
    </button>

    <button
        type="button"
        className="voice-btn stop"
        onClick={() => recognition?.stop()}
        disabled={!listening}
    >
        ⏹ Stop Recording
    </button>

</div>

{listening && (
    <p className="listening">
        🎙 Listening...
    </p>
)}

</div>

        <div className="navigation">

    <button
        onClick={() => setCurrentQuestion(currentQuestion - 1)}
        disabled={currentQuestion === 0}
    >
        Previous
    </button>

    <button
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
        disabled={currentQuestion === interviewQuestions.length - 1}
    >
        Next
    </button>

</div>

<button
    className="submit-btn"
    onClick={handleSubmit}
    disabled={loading}
>
    {loading ? "AI Evaluating..." : "Submit Interview"}
</button>

     
    </div>

</section>

    );

}

export default InterviewSession;