// src/components/AdminTools.js
import React, { useEffect, useState } from 'react';
import { addDocument, updateDocument, deleteDocument, fetchDocuments } from '../utils/firestoreUtils';

const AdminTools = () => {
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState({ type: '', title: '', content: '' });

  useEffect(() => {
    const loadTools = async () => {
      const fetchedTools = await fetchDocuments('tools');
      setTools(fetchedTools);
    };
    loadTools();
  }, []);

  const handleAddTool = async () => {
    await addDocument('tools', newTool);
    setTools(await fetchDocuments('tools'));
    setNewTool({ type: '', title: '', content: '' });
  };

  const handleDeleteTool = async (id) => {
    await deleteDocument('tools', id);
    setTools(await fetchDocuments('tools'));
  };

  const handleEditTool = async (id) => {
    const updatedTool = prompt("Edit Tool:", JSON.stringify(tools.find(tool => tool.id === id)));
    if (updatedTool) {
      await updateDocument('tools', id, JSON.parse(updatedTool));
      setTools(await fetchDocuments('tools'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Admin Tools</h2>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Add New Tool</h3>
        <input
          type="text"
          placeholder="Type (SQL, Note, Snippet)"
          value={newTool.type}
          onChange={(e) => setNewTool({ ...newTool, type: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Title"
          value={newTool.title}
          onChange={(e) => setNewTool({ ...newTool, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Content"
          value={newTool.content}
          onChange={(e) => setNewTool({ ...newTool, content: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleAddTool} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Tool
        </button>
      </div>
      <h3 className="text-xl font-bold mb-2">Existing Tools</h3>
      {tools.map((tool) => (
        <div key={tool.id} className="border p-4 mb-4">
          <h4 className="text-lg font-bold">{tool.title}</h4>
          <p>{tool.content}</p>
          <p className="text-sm text-gray-500">{tool.type}</p>
          <p className="text-sm text-gray-500">Created: {new Date(tool.created_at).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Updated: {new Date(tool.updated_at).toLocaleString()}</p>
          <button onClick={() => handleEditTool(tool.id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
            Edit
          </button>
          <button onClick={() => handleDeleteTool(tool.id)} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminTools;
