import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "" }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "" }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "feedbackForms"), {
        title,
        questions,
        createdAt: new Date()
      });
      console.log("Form Created with ID:", docRef.id);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Feedback Form</h1>
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, index) => (
        <input
          key={index}
          className="border p-2 w-full mb-2"
          type="text"
          placeholder={`Question ${index + 1}`}
          value={q.text}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
        />
      ))}
      <button className="bg-green-500 text-white p-2 rounded mt-2" onClick={handleAddQuestion}>Add Question</button>
      <button className="bg-blue-500 text-white p-2 rounded mt-2 ml-2" onClick={handleSubmit}>Create Form</button>
    </div>
  );
};

export default CreateForm;
