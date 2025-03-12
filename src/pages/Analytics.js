import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { useParams } from "react-router-dom";
import { doc, collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const { formId } = useParams();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const responsesRef = collection(db, `feedbackForms/${formId}/responses`);
        const snapshot = await getDocs(responsesRef);
        const responses = snapshot.docs.map((doc) => doc.data().answers);
        
        // Process data for chart (counting responses)
        const questionStats = {};
        responses.forEach((response) => {
          response.forEach((answer, idx) => {
            const questionKey = `Q${idx + 1}`;
            if (!questionStats[questionKey]) {
              questionStats[questionKey] = {};
            }
            questionStats[questionKey][answer] = (questionStats[questionKey][answer] || 0) + 1;
          });
        });

        // Convert to chart format
        const formattedData = Object.keys(questionStats).map((question) => ({
          name: question,
          ...questionStats[question],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    fetchResponses();
  }, [formId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feedback Analytics</h1>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Yes" fill="#82ca9d" />
            <Bar dataKey="No" fill="#FF6363" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default Analytics;
