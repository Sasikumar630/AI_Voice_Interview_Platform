import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateQuestions(
    category,
    difficulty,
    type,
    count
) {

    const prompt = `
You are an expert technical interviewer.

Generate ${count} ${difficulty} level ${category} interview questions.

Interview Type: ${type}

Rules:
1. Return ONLY a JSON array.
2. Do not add markdown.
3. Do not add explanations.
4. Format:

[
   {
      "question":"Question 1"
   },
   {
      "question":"Question 2"
   }
]
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    console.log("Gemini Response:");
console.log(response.text);

return response.text;
}

   // answers

export async function evaluateInterview(interviewData) {

    const prompt = `
You are a senior technical interviewer.

Evaluate the following interview.

${JSON.stringify(interviewData, null, 2)}

Return ONLY valid JSON.

Do not use markdown.
Do not explain anything.

Format:

[
  {
    "question":"Question",
    "score":8,
    "strengths":[
      "Point 1",
      "Point 2"
    ],
    "weaknesses":[
      "Point 1",
      "Point 2"
    ],
    "suggestions":[
      "Suggestion 1",
      "Suggestion 2"
    ],
    "idealAnswer":"Ideal answer"
  }
]
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

   console.log("Evaluation Response:");
console.log(response.text);

return response.text;
}

export default ai;