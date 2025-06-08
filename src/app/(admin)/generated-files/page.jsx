"use client";

import { RequestContext } from "@/context/requestContext";
import {
  Download,
  Eye,
  RefreshCcw,
  Search,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useContext, useState, useEffect, useMemo, useRef } from "react";

const GeneratedFilesPage = () => {
  const { generatedDocument } = useContext(RequestContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [renaming, setRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const renameInputRef = useRef(null);

  // Fetch all Excel documents from the backend path
  const fetchExcelDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/excel`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Excel documents");
      }

      const data = await response.json();

      const files =
        data.files?.map((file, index) => ({
          id: index + 1,
          url:
            file.url ||
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/temp/excel/${file.name}`,
          name: file.name,
          size: file.size || 0,
          createdAt:
            file.createdAt || file.modifiedAt || new Date().toISOString(),
          fullPath:
            file.fullPath ||
            `F:\\NextJS Workspace\\DocBot\\docbotai_backend\\temp\\excel\\${file.name}`,
        })) || [];

      setAllFiles(files);
    } catch (err) {
      console.error("Error fetching Excel documents:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load files on component mount
  useEffect(() => {
    fetchExcelDocuments();
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Auto-focus rename input
  useEffect(() => {
    if (renaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renaming]);

  // Handle the context-based generated document
  const getContextGeneratedFiles = () => {
    if (!generatedDocument) return [];

    if (generatedDocument.message && generatedDocument.uploadedUrls) {
      const urls = Array.isArray(generatedDocument.uploadedUrls)
        ? generatedDocument.uploadedUrls
        : [generatedDocument.uploadedUrls];

      return urls.map((url, index) => ({
        id: `context-${index + 1}`,
        url: url,
        name: extractFileName(url),
        size: 0,
        createdAt: new Date().toISOString(),
        isNew: true,
      }));
    }

    if (generatedDocument.uploadedUrl) {
      return [
        {
          id: "context-1",
          url: generatedDocument.uploadedUrl,
          name: extractFileName(generatedDocument.uploadedUrl),
          size: 0,
          createdAt: new Date().toISOString(),
          isNew: true,
        },
      ];
    }

    return [];
  };

  // Combine context files with fetched files
  const combinedFiles = useMemo(() => {
    const contextFiles = getContextGeneratedFiles();
    const existingUrls = new Set(allFiles.map((f) => f.url));
    const newContextFiles = contextFiles.filter(
      (f) => !existingUrls.has(f.url)
    );
    return [...newContextFiles, ...allFiles];
  }, [generatedDocument, allFiles]);

  // Filter files based on search term
  const filteredFiles = useMemo(() => {
    if (!searchTerm.trim()) return combinedFiles;

    const term = searchTerm.toLowerCase();
    return combinedFiles.filter(
      (file) =>
        file.name.toLowerCase().includes(term) ||
        file.fullPath?.toLowerCase().includes(term)
    );
  }, [combinedFiles, searchTerm]);

  // Sort files by creation date (newest first)
  const sortedFiles = useMemo(() => {
    return [...filteredFiles].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredFiles]);

  // Extract filename from URL
  const extractFileName = (url) => {
    if (!url) return "Unknown File";
    try {
      const urlParts = url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      return fileName || "Generated Document";
    } catch {
      return "Generated Document";
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "Unknown size";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Just now";
    }
  };

  // Handle file actions
  const handleView = (file) => {
    window.open(file.url, "_blank", "noopener,noreferrer");
    setActiveMenu(null);
  };

  const handleDownload = (file) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setActiveMenu(null);
  };

  const startRename = (file) => {
    setRenaming(file.id);
    setRenameValue(file.name);
    setActiveMenu(null);
  };

  const handleRename = async (file) => {
    if (!renameValue.trim() || renameValue === file.name) {
      cancelRename();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/rename`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldName: file.name,
            newName: renameValue.trim(),
            filePath: file.fullPath,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to rename file");
      }

      // Update local state
      setAllFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                name: renameValue.trim(),
                url: f.url.replace(file.name, renameValue.trim()),
              }
            : f
        )
      );

      cancelRename();
    } catch (err) {
      console.error("Error renaming file:", err);
      setError("Failed to rename file: " + err.message);
      cancelRename();
    }
  };

  const cancelRename = () => {
    setRenaming(null);
    setRenameValue("");
  };

  const handleDelete = async (file) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            filePath: file.fullPath,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      // Remove from local state
      setAllFiles((prev) => prev.filter((f) => f.id !== file.id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Failed to delete file: " + err.message);
      setDeleteConfirm(null);
    }
  };

  const confirmDelete = (file) => {
    setDeleteConfirm(file);
    setActiveMenu(null);
  };

  return (
    <div className="flex flex-col items-center mt-8 px-6 min-h-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Generated Excel Documents
        </h1>

        {/* Search Bar and Refresh Button Row */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none gap-2">
              <span className="text-gray-400 text-lg">
                <Search />
              </span>
              {/* Horizontal separator */}
              <div className="w-px h-5 bg-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Excel documents..."
              className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
            />
          </div>

          <button
            onClick={fetchExcelDocuments}
            disabled={loading}
            className="inline-flex items-center px-3 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {loading ? (
              <span className="text-lg animate-spin">
                <RefreshCcw size={18} className="mr-2 animate-spin" />
              </span>
            ) : (
              <RefreshCcw size={18} />
            )}

            {/* {loading ? <RefreshCcw size={18} className="animate-spin" /> : <RefreshCcw size={18}/>} */}
          </button>
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <p className="text-sm text-gray-600 mb-4">
            Found {sortedFiles.length} document
            {sortedFiles.length !== 1 ? "s" : ""} matching "{searchTerm}"
          </p>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-500 text-xl mr-3">❌</span>
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* New Document Message */}
        {generatedDocument?.message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-500 text-xl mr-3">✅</span>
              <p className="text-sm font-medium text-green-800">
                {generatedDocument.message}
              </p>
            </div>
          </div>
        )}

        {/* Files List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading Excel documents...</p>
          </div>
        ) : sortedFiles.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-visible">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">
                Excel Documents ({sortedFiles.length})
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Stored in: F:\NextJS
                Workspace\DocBot\docbotai_backend\temp\excel
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {sortedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors relative ${
                    file.isNew ? "bg-blue-50 border-l-4 border-blue-400" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      <span className="text-3xl">
                        <img
                          src={`https://img.icons8.com/?size=100&id=117561&format=png&color=000000`}
                          alt="image"
                          width={42}
                          height={20}
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        {renaming === file.id ? (
                          <input
                            ref={renameInputRef}
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={() => handleRename(file)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRename(file);
                              if (e.key === "Escape") cancelRename();
                            }}
                            className="font-medium text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent"
                          />
                        ) : (
                          <h3 className="font-medium text-gray-900 truncate">
                            {file.name}
                          </h3>
                        )}
                        {file.isNew && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>Created: {formatDate(file.createdAt)}</span>
                        <span>•</span>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                      {file.fullPath && (
                        <p
                          className="text-xs text-gray-400 mt-1 truncate"
                          title={file.fullPath}
                        >
                          {file.fullPath}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Three Dots Menu */}
                  <div className="relative ml-4 cursor-pointer">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === file.id ? null : file.id);
                      }}
                      className="menu-button p-2 rounded-full hover:bg-gray-200 focus:outline-none transition-colors"
                    >
                      <span className="text-gray-500 text-lg cursor-pointer">
                        ⋯
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === file.id && (
                      <div className="dropdown-menu absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999]">
                        <button
                          onClick={() => handleView(file)}
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg cursor-pointer"
                        >
                          <span className="mr-2">
                            <Eye size={18} />
                          </span>
                          View
                        </button>
                        <button
                          onClick={() => startRename(file)}
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <span className="mr-2">
                            <SquarePen size={18} />
                          </span>
                          Rename
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <span className="mr-2">
                            <Download size={18} />
                          </span>
                          Download
                        </button>
                        <button
                          onClick={() => confirmDelete(file)}
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg cursor-pointer"
                        >
                          <span className="mr-2">
                            <Trash2 size={18} />
                          </span>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <span className="text-6xl">📂</span>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {searchTerm
                ? "No matching files found"
                : "No Excel documents found"}
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm
                ? `No documents match your search "${searchTerm}"`
                : "No Excel documents have been generated yet."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/80">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete File
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <strong>"{deleteConfirm.name}"</strong>? <br /> This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedFilesPage;
