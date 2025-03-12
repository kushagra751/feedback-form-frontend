import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { useParams } from "react-router-dom";
import { doc, collection, getDocs } from "firebase/firestore";

const ViewResponses = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const responsesRef = collection(db, `feedbackForms/${formId}/responses`);
        const snapshot = await getDocs(responsesRef);
        const responseData = snapshot.docs.map((doc) => doc.data());
        setResponses(responseData);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    fetchResponses();
  }, [formId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feedback Responses</h1>
      {responses.length > 0 ? (
        responses.map((response, index) => (
          <div key={index} className="border p-4 mb-2">
            {response.answers.map((answer, idx) => (
              <p key={idx}><strong>Q{idx + 1}:</strong> {answer}</p>
            ))}
          </div>
        ))
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default ViewResponses;
