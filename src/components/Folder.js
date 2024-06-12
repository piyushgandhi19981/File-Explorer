import React, { useState } from "react";

const Folder = ({ explorer, handleAddFolder, handleDelete, handleUpdate }) => {
  const { name, files = [], isFolder, id } = explorer;

  const [showFolderDetails, setShowFolderDetails] = useState(false);
  const [showAddEntity, setShowAddEntity] = useState({
    visible: false,
    isFolder: null,
  });

  const [isEdit, showIsEdit] = useState(false);

  const onAddFileOrFolder = (e, isFolderValue) => {
    e.stopPropagation();
    setShowAddEntity({ visible: true, isFolder: isFolderValue });
  };

  const handleAddFileOrFolder = (e) => {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      handleAddFolder(id, value, showAddEntity.isFolder);
      setShowAddEntity({ visible: false, isFolder: null });
    }
  };

  const getFolderOrFileIcon = (isFolder) => (
    <span style={{ marginRight: 4 }}>{isFolder ? "🗂️" : "📁"}</span>
  );

  const handleUpdateValue = (e) => {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      handleUpdate(id, value);
      showIsEdit(false);
    }
  };

  const handleEditAction = (e) => {
    e.stopPropagation();
    showIsEdit(true);
  };

  const renderFolderDetail = () => (
    <div
      className="folder-detail"
      onClick={() => setShowFolderDetails(!showFolderDetails)}
    >
      {getFolderOrFileIcon(isFolder)}
      <div>
        {isEdit ? (
          <div onClick={(e) => e.stopPropagation()}>
            <input
              onFocus={(e) => e.stopPropagation()}
              onKeyDown={handleUpdateValue}
            />
          </div>
        ) : (
          name
        )}
      </div>
      <div className="actions">
        <button onClick={() => handleDelete(id)}>🗑️</button>
        <button onClick={handleEditAction}>👛</button>
        {isFolder && (
          <div>
            <button onClick={(e) => onAddFileOrFolder(e, true)}>
              + Folder
            </button>
            <button onClick={(e) => onAddFileOrFolder(e, false)}>+ File</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="folder">
      {renderFolderDetail()}
      <div style={{ marginLeft: 8 }}>
        {showAddEntity.visible && (
          <div className="addEntity">
            {getFolderOrFileIcon(showAddEntity.isFolder)}
            <input onKeyDown={handleAddFileOrFolder} />
          </div>
        )}
        {showFolderDetails && files.length ? (
          <>
            {files.map((file) => (
              <Folder
                key={file.id}
                explorer={file}
                handleAddFolder={handleAddFolder}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Folder;
