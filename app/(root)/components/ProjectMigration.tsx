'use client';

import { useState } from 'react';
import { runAgent } from '../api/apiMethod';
import { AgentRequest } from '@/lib/models/request';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon

const models = ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"]; // Add more models as needed
const languages = ["", "NodeJs","Python", "JavaScript", "TypeScript", "Java", "C#"];
const frameworks = ["", "Express.js", "FastApi", "Django", "React", "Angular", "Spring", "ASP.NET"];



const setNestedProperty = (obj: any, path: string[], value: any) => {
  const lastKeyIndex = path.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = path[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[path[lastKeyIndex]] = value;
};


const ProjectMigration: React.FC<{ project: AgentRequest, onHandleIsRunAgent: (show: boolean) => void }> = ({ project, onHandleIsRunAgent }) => {
  const [formState, setFormState] = useState<AgentRequest>(project);
  const [logs, setLogs] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const keys = name.split('.');

    setFormState(prevState => {
      const updatedState = { ...prevState };
      setNestedProperty(updatedState, keys, value);
      return updatedState;
    });
  };

  const handleRunAgent = async () => {
    try {
      onHandleIsRunAgent(true);
      await runAgent(formState); 
    } catch (error: any) {
      setLogs((prevLogs) => [...prevLogs, `Error running agent: ${error.message}`]);
    }
  };

    const formFields = [
    {
      label: 'Select Document Model',
      name: 'document.model.name',
      options: models,
      value: formState.document.model.name,
    },
    {
      label: 'Select Planner Model',
      name: 'planner.model.name',
      options: models,
      value: formState.planner.model.name,
    },
    {
      label: 'Select Migrate Model',
      name: 'migrate.model.name',
      options: models,
      value: formState.migrate.model.name,
    },
    {
      label: 'Select Directory Structure Model',
      name: 'dir_struct.model.name',
      options: models,
      value: formState.dir_struct.model.name,
    },
    {
      label: 'Legacy Language',
      name: 'legacy_language',
      options: languages,
      value: formState.legacy_language,
    },
    {
      label: 'Legacy Framework',
      name: 'legacy_framework',
      options: frameworks,
      value: formState.legacy_framework,
    },
    {
      label: 'New Language',
      name: 'new_language',
      options: languages,
      value: formState.new_language,
    },
    {
      label: 'New Framework',
      name: 'new_framework',
      options: frameworks,
      value: formState.new_framework,
    },
  ];


  return (
      <div className="max-h-[760px] overflow-auto rounded-lg bg-gray-800 p-6 shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-6">Code Migration AI Agent</h1>
        
        {formFields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-medium text-white">{field.label}</label>
            <select
              name={field.name}
              value={field.value}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black p-2"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Submit Button */}
        <button onClick={handleRunAgent} className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition">
          Run Agent
        </button>
      </div>
  );
};

export default ProjectMigration;