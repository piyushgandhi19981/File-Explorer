import "./styles.css";

import Folder from "./components/Folder";
import { useState } from "react";
import { useExplorerOperations } from "./hooks/useExplorerOperations";

const FILE_EXPLORER_JSON = {
  name: "Folder1",
  id: 1,
  isFolder: true,
  files: [
    {
      name: "Folder2",
      id: 2,
      isFolder: true,
      files: [],
    },
    {
      id: 3,
      name: "Folder3",
      isFolder: true,
      files: [
        {
          id: 4,
          name: "File1",
          isFolder: false,
          files: [],
        },
      ],
    },
    {
      id: 5,
      name: "File2",
      isFolder: false,
      files: [],
    },
  ],
};

// File Explorer
// Bread Crumbs
// useEffect
// useThrottle

export default function App() {
  const [explorer, setExplorer] = useState(FILE_EXPLORER_JSON);

  const { handleAddFolder, handleDelete, handleUpdate } =
    useExplorerOperations();

  const handleAdd = (parentId, value, isFolder) => {
    const updatedExplorer = handleAddFolder(
      explorer,
      parentId,
      value,
      isFolder
    );
    setExplorer(updatedExplorer);
  };

  const handleDeleteExplorer = (id) => {
    const deletedExplorer = handleDelete(explorer, id);
    setExplorer(deletedExplorer);
  };

  const handleUpdateExplorer = (id, value) => {
    const updatedExplorer = handleUpdate(explorer, id, value);
    setExplorer(updatedExplorer);
  };

  if (!explorer.id) return "No resource Found";

  return (
    <div className="container">
      <div>File Explorer</div>
      <Folder
        handleDelete={handleDeleteExplorer}
        handleAddFolder={handleAdd}
        handleUpdate={handleUpdateExplorer}
        explorer={explorer}
      />
    </div>
  );
}
