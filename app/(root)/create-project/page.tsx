'use client';

import React, { useState } from 'react';
import CreateProject from '../components/CreateProject';
import FolderUpload from '../components/FolderUpload';
import GitUpload from '../components/GitUpload.tsx';

const NewProjectPage: React.FC = () => {
    const [inputPath, setInputPath] = useState<string>('');
    const [isGitHubSelected, setIsGitHubSelected] = useState<boolean>(true);
    const [showCreateProject, setShowCreateProject] = useState<boolean>(false);

    const handleInputPathChange = (path: string, show: boolean) => {
        setInputPath(path);
        setShowCreateProject(show);
    };

    const toggleSelection = (isGitHub: boolean) => {
        setIsGitHubSelected(isGitHub);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {!showCreateProject ? (
                <div className="w-full max-w-md p-4">
                    <div className="flex justify-center mb-4">
                        <button
                            className={`px-4 py-2 rounded-md ${isGitHubSelected ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => toggleSelection(true)}
                        >
                            Clone GitHub Repository
                        </button>
                        <button
                            className={`px-4 py-2 ml-2 rounded-md ${!isGitHubSelected ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => toggleSelection(false)}
                        >
                            Upload Folder
                        </button>
                    </div>

                    {/* Conditional Rendering */}
                    {isGitHubSelected ? (
                        <GitUpload onInputPathChange={handleInputPathChange} />
                    ) : (
                        <FolderUpload onUploadComplete={handleInputPathChange} />
                    )}
                </div>
            ) : (
                <div className="w-full max-w-lg p-4">
                    <CreateProject inputPath={inputPath} />
                </div>
            )}
        </div>
    );
};

export default NewProjectPage;