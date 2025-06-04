"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  FiSearch,
  FiMoreVertical,
  FiChevronDown,
  FiChevronRight,
  FiFolder,
} from "react-icons/fi";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import AdminRoute from "@/components/auth/AdminRoute";

/* ── DUMMY DATA ──────────────────────────────────────── */
const dummyData = [
  {
    loanId: "LC12",
    loanName: "Personal Loan",
    name:"John Doe",
    files: [
      {
        id: "f1",
        name: "Agreement.pdf",
        url: "https://file-examples.com/storage/fe8fe82fa513afb655e04b6/2017/10/file-sample_150kB.pdf",
        size: 150,
        createdAt: "2025-02-01",
      },
      {
        id: "f2",
        name: "Statement.pdf",
        url: "https://file-examples.com/storage/fe8fe82fa513afb655e04b6/2017/10/file-example_PDF_1MB.pdf",
        size: 1024,
        createdAt: "2025-01-10",
      },
    ],
  },
  {
    loanId: "LC34",
    loanName: "Home Loan",
    name:"James Maroon",
    files: [
      {
        id: "f3",
        name: "Contract.pdf",
        url: "https://file-examples.com/storage/fe8fe82fa513afb655e04b6/2017/10/file-example_PDF_500_kB.pdf",
        size: 512,
        createdAt: "2024-12-12",
      },
    ],
  },
];

/* ── HELPERS ─────────────────────────────────────────── */
const filterOptions = [
  { value: 0, label: "Show all" },
  { value: 3, label: "Last 3 months" },
  { value: 6, label: "Last 6 months" },
  { value: 12, label: "Last 12 months" },
];

const formatSize = (kb) => (kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(2)} MB`);

/* ── COMPONENT ───────────────────────────────────────── */
export default function MyFilesSection() {
  /* ─ state ─ */
  const [folders, setFolders] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [filterMonths, setFilterMonths] = useState(0);

  const [expanded, setExpanded] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);         
  const [renaming, setRenaming] = useState(null);          
  const [renameVal, setRenameVal] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);  

  const renameInputRef = useRef(null);

  /* ─ filtering ─ */
  const now = new Date();
  const filtered = useMemo(() => {
    return folders
      .filter((fo) => {
        const hits =
          fo.loanName.toLowerCase().includes(search.toLowerCase()) ||
          fo.loanId.toLowerCase().includes(search.toLowerCase()) ||
          fo.files.some((f) => f.name.toLowerCase().includes(search.toLowerCase()));
        if (!hits) return false;

        if (filterMonths === 0) return true;
        const cutoff = new Date(
          now.getFullYear(),
          now.getMonth() - filterMonths,
          now.getDate()
        );
        return fo.files.some((f) => new Date(f.createdAt) >= cutoff);
      })
      .map((fo) => ({
        ...fo,
        files: fo.files.filter((f) => {
          if (filterMonths === 0) return true;
          const cutoff = new Date(
            now.getFullYear(),
            now.getMonth() - filterMonths,
            now.getDate()
          );
          return new Date(f.createdAt) >= cutoff;
        }),
      }));
  }, [folders, search, filterMonths]);

  const totalFolders = filtered.length;
  const totalFiles = filtered.reduce((a, fo) => a + fo.files.length, 0);

  /* ─ file actions ─ */
  const openPdf = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const downloadFile = (file) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setMenuOpen(null);
  };

  const startRename = (foId, fId, currentName) => {
    setRenaming({ foId, fId });
    setRenameVal(currentName);
    setMenuOpen(null);
  };

  const finishRename = () => {
    if (!renameVal.trim()) return cancelRename();
    setFolders((prev) =>
      prev.map((fo) =>
        fo.loanId !== renaming.foId
          ? fo
          : {
              ...fo,
              files: fo.files.map((f) =>
                f.id === renaming.fId ? { ...f, name: renameVal.trim() } : f
              ),
            }
      )
    );
    cancelRename();
  };

  const cancelRename = () => {
    setRenaming(null);
    setRenameVal("");
  };

  const deleteFile = () => {
    if (!deleteTarget) return;
    setFolders((prev) =>
      prev.map((fo) =>
        fo.loanId !== deleteTarget.foId
          ? fo
          : { ...fo, files: fo.files.filter((f) => f.id !== deleteTarget.fId) }
      )
    );
    setDeleteTarget(null);
  };

  /* ─ auto-focus rename ⌨️ ─ */
  useEffect(() => {
    if (renaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renaming]);

  /* ─ UI ─ */
  return (
    <AdminRoute>
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Files</h1>

      {/* counts */}
      <div className="flex justify-start font-medium text-gray-700 mb-4 space-x-2">
  <span>
    Total Folders: <span className="text-blue-600">{totalFolders}</span>
  </span>
  <span>|</span>
  <span>
    Total Files: <span className="text-blue-600">{totalFiles}</span>
  </span>
</div>


      {/* search+filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-grow min-w-[250px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file, folder, or loan ID…"
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <select
          value={filterMonths}
          onChange={(e) => setFilterMonths(Number(e.target.value))}
          className="rounded-lg border bg-blue-50 px-4 py-2 focus:ring-2 focus:ring-blue-400"
        >
          {filterOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* folders */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No matching folders or files.</p>
      ) : (
        filtered.map((fo) => (
          <div key={fo.loanId} className="border rounded-lg shadow-sm">
            {/* folder header */}
          <button
  onClick={() =>
    setExpanded((p) => ({ ...p, [fo.loanId]: !p[fo.loanId] }))
  }
  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
>
  <span className="flex items-center gap-3 text-lg font-semibold text-blue-700">
    <FiFolder className="text-yellow-500" />
    {`${fo.loanName}_${fo.name}_LoanCode (#${fo.loanId})`}
  </span>
  {expanded[fo.loanId] ? (
    <FiChevronDown className="text-gray-600 cursor-pointer" />
  ) : (
    <FiChevronRight className="text-gray-600 cursor-pointer" />
  )}
</button>


            {/* files */}
            {expanded[fo.loanId] && (
              <ul className="space-y-2 px-6 py-4">
                {fo.files.map((f) => {
                  const isRenaming =
                    renaming &&
                    renaming.foId === fo.loanId &&
                    renaming.fId === f.id;
                  const isMenuOpen =
                    menuOpen &&
                    menuOpen.foId === fo.loanId &&
                    menuOpen.fId === f.id;

                  return (
                    <li
                      key={f.id}
                      className="relative flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm"
                    >
                      {/* file left */}
                      <div className="flex items-center gap-3 min-w-0">
                        <FaFilePdf className="text-red-600 shrink-0" />
                        {isRenaming ? (
                          <input
                            ref={renameInputRef}
                            value={renameVal}
                            onChange={(e) => setRenameVal(e.target.value)}
                            onBlur={finishRename}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") finishRename();
                              if (e.key === "Escape") cancelRename();
                            }}
                            className="w-full border-b border-gray-400 outline-none focus:border-blue-500"
                          />
                        ) : (
                          <span
                            onClick={() => openPdf(f.url)}
                            className="truncate text-blue-700 hover:underline cursor-pointer"
                          >
                            {f.name}
                          </span>
                        )}
                      </div>

                      {/* file right */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {formatSize(f.size)}
                        </span>
                        <button
                          onClick={() =>
                            setMenuOpen(
                              isMenuOpen ? null : { foId: fo.loanId, fId: f.id }
                            )
                          }
                          className="rounded-full p-1 hover:bg-gray-200 focus:outline-none cursor-pointer"
                        >
                          <FiMoreVertical />
                        </button>

                        {/* dropdown */}
                        {isMenuOpen && (
                          <ul
                            role="menu"
                            className="absolute right-4 top-full z-50 mt-2 w-40 rounded border bg-white shadow-lg "
                          >
                               <li>
                              <button
                                onClick={() => downloadFile(f)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-green-100 cursor-pointer"
                              >
                                <HiDownload /> Download
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  startRename(fo.loanId, f.id, f.name)
                                }
                                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-blue-100 cursor-pointer"
                              >
                                <FaEdit /> Rename
                              </button>
                            </li>
                         
                            <li>
                              <button
                                onClick={() =>
                                  setDeleteTarget({ foId: fo.loanId, fId: f.id })
                                }
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-100 cursor-pointer"
                              >
                                <MdDelete /> Delete
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })}

                {fo.files.length === 0 && (
                  <li className="text-gray-500 italic">No files after filters.</li>
                )}
              </ul>
            )}
          </div>
        ))
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-lg bg-white p-6 shadow-2xl w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Delete file?
            </h2>
            <p className="text-sm text-gray-600">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded px-4 py-2 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteFile}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminRoute>
  );
}
