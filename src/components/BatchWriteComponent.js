import React from "react";
import { getFirestore, collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BatchWriteComponent = () => {
  const data = [
    { skill: "Linux (Proficient)", category: "programming" },
    { skill: "SQL (Proficient)", category: "programming" },
    { skill: "React", category: "programming" },
    { skill: "Java", category: "programming" },
    { skill: "HTML5", category: "programming" },
    { skill: "JavaScript (Intermediate)", category: "programming" },
    { skill: "Python", category: "programming" },
    { skill: "Node.js", category: "programming" },
    { skill: "CSS", category: "programming" },
    { skill: "React.js (Intermediate)", category: "programming" },
    { skill: "C#", category: "programming" },
    { skill: "Laravel", category: "programming" },
    { skill: "Bash Script (Proficient)", category: "programming" },
    { skill: "PowerShell", category: "programming" },
    { skill: "PHP (Proficient)", category: "programming" },
    { skill: "Microsoft 365", category: "software" },
    { skill: "Visual Studio Code", category: "software" },
    { skill: "Adobe Photoshop", category: "software" },
    { skill: "Adobe After Effects", category: "software" },
    { skill: "Adobe Illustrator", category: "software" },
    { skill: "GitHub", category: "software" },
    { skill: "Unity Engine", category: "software" },
    { skill: "Adobe Premiere Pro", category: "software" },
    { skill: "Azure DevOps Services", category: "software" },
    { skill: "Android Studio", category: "software" },
    { skill: "Sublime Text Editor", category: "software" },
    { skill: "Bahasa Malaysia (Native)", category: "language" },
    { skill: "English (Fluent)", category: "language" },
    { skill: "Video Editing", category: "others" },
    { skill: "Photography", category: "others" }
  ];

  const batchWrite = async () => {
    const batch = writeBatch(db);

    data.forEach((record) => {
      const docRef = doc(collection(db, "programming"));
      batch.set(docRef, record);
    });

    try {
      await batch.commit();
      console.log("Batch write completed successfully");
    } catch (error) {
      console.error("Error in batch write: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={batchWrite}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Batch Write Data
      </button>
    </div>
  );
};

export default BatchWriteComponent;
