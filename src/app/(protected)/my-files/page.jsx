"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import {FaFilePdf } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { filesData } from "../../lib/dummyData";



const filterOptions = [
  { label: "All", value: 0 },
  { label: "Last 3 months", value: 3 },
  { label: "Last 6 months", value: 6 },
  { label: "Last 1 year", value: 12 },
];

const formatSize = (kb) => {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

const MyFilesSection = () => {
  const [search, setSearch] = useState("");
  const [filterMonths, setFilterMonths] = useState(0); // default to 'All'
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [selectFocused, setSelectFocused] = useState(false);

  const menuRef = useRef(null);

  const now = new Date();

  const filteredFiles = useMemo(() => {
    return filesData.filter((file) => {
      if (filterMonths > 0) {
        const fileDate = new Date(file.createdAt);
        const monthsAgo = new Date(
          now.getFullYear(),
          now.getMonth() - filterMonths,
          now.getDate()
        );
        if (fileDate < monthsAgo) return false;
      }

      if (!file.name.toLowerCase().includes(search.toLowerCase())) return false;

      return true;
    });
  }, [search, filterMonths]);

  const toggleMenu = (id) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  const handleRename = (id) => {
    alert(`Rename file id: ${id}`);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    alert(`Delete file id: ${id}`);
    setMenuOpenId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Files</h1>

      {/* Search and filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search files..."
            className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>

        <div className="relative w-48">
          <select
            className={`w-full appearance-none rounded-lg py-3 px-4 pr-10 
              focus:outline-none focus:ring-2 focus:ring-blue-400
              bg-blue-50 text-gray-800`}
            value={filterMonths}
            onChange={(e) => setFilterMonths(Number(e.target.value))}
            onFocus={() => setSelectFocused(true)}
            onBlur={() => setSelectFocused(false)}
            aria-label="Filter files by date"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <FiChevronDown
            size={20}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-blue-600
              transition-transform duration-300
              ${selectFocused ? "rotate-180" : "rotate-0"}`}
            pointerEvents="none"
          />
        </div>
      </div>

      {/* Total files collected */}
      <p className="mb-4 text-gray-700 font-medium">
        Total files collected: <span className="text-blue-500">{filteredFiles.length}</span>
      </p>

      {/* File cards */}
      <div className="space-y-4">
        {filteredFiles.length === 0 && (
          <p className="text-gray-500">No files match your criteria.</p>
        )}
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <FaFilePdf className="text-red-500" size={32} />
              <div>
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => toggleMenu(file.id)}
                className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                aria-label="Options"
              >
                <FiMoreVertical size={20} />
              </button>

              {menuOpenId === file.id && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg z-30">
                  <button
                    onClick={() => handleRename(file.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFilesSection;
