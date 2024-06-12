export const useExplorerOperations = (
  explorerData,
  parentId,
  value,
  isFolder
) => {
  const handleAddFolder = (explorerData, parentId, value, isFolder) => {
    const { id, files = [] } = explorerData;
    if (id === parentId) {
      return {
        ...explorerData,
        files: [...files, { id: new Date(), isFolder, name: value, files: [] }],
      };
    } else {
      return {
        ...explorerData,
        files: files.map((file) =>
          handleAddFolder(file, parentId, value, isFolder)
        ),
      };
    }
  };

  const handleDelete = (explorerData, deleteId) => {
    if (deleteId === 1) return {};
    const { files, ...rest } = explorerData;
    return {
      ...rest,
      files: (files || []).reduce((acc, file) => {
        if (file.id === deleteId) return acc;
        return [...acc, handleDelete(file, deleteId)];
      }, []),
    };
  };

  const handleUpdate = (explorerData, updateId, value) => {
    if (updateId === 1) return { ...explorerData, name: value };
    const { files, ...rest } = explorerData;
    return {
      ...rest,
      files: (files || []).reduce((acc, file) => {
        if (file.id === updateId) return [...acc, { ...file, name: value }];
        return [...acc, handleUpdate(file, updateId, value)];
      }, []),
    };
  };

  return {
    handleAddFolder,
    handleDelete,
    handleUpdate,
  };
};
