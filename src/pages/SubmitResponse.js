import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";

const SubmitResponse = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formRef = doc(db, "feedbackForms", formId);
        const formSnap = await getDoc(formRef);
        if (formSnap.exists()) {
          setForm(formSnap.data());
          setAnswers(new Array(formSnap.data().questions.length).fill(""));
        } else {
          console.error("Form not found!");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [formId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `feedbackForms/${formId}/responses`), {
        answers,
        createdAt: new Date(),
      });
      alert("Response submitted successfully!");
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      {form.questions.map((q, index) => (
        <input
          key={index}
          className="border p-2 w-full mb-2"
          type="text"
          placeholder={q}
          value={answers[index]}
          onChange={(e) => {
            const newAnswers = [...answers];
            newAnswers[index] = e.target.value;
            setAnswers(newAnswers);
          }}
        />
      ))}
      <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={handleSubmit}>
        Submit Response
      </button>
    </div>
  );
};

export default SubmitResponse;
