'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  Pencil,
  Trash2,
} from 'lucide-react';
import AdminRoute from "@/components/auth/AdminRoute";

const MS_IN_DAY = 86_400_000;


// Demo data that spans the last 2 years.
// (no non-breaking spaces, and dates make sense relative to 2025-05-30)
const DUMMY_FILES = [
  {
    id: 'HL001',
    title: 'Home Loan',
    requester: 'Alice Sharma',
    requestedAt: '2025-05-20T10:00:00',
    approvedAt:  '2025-05-27T14:30:00',
  },
  {
    id: 'PL002',
    title: 'Personal Loan',
    requester: 'Bimal Gurung',
    requestedAt: '2025-03-30T09:15:00',
    approvedAt:  '2025-04-06T09:20:00',
  },
  {
    id: 'EL003',
    title: 'Education Loan',
    requester: 'Chitra Tamang',
    requestedAt: '2025-01-05T11:45:00',
    approvedAt:  '2025-02-15T13:10:00',
  },
  {
    id: 'CL004',
    title: 'Car Loan',
    requester: 'Deepak Shrestha',
    requestedAt: '2024-11-18T16:10:00',
    approvedAt:  '2024-12-01T11:00:00',
  },
  {
    id: 'BL005',
    title: 'Business Loan',
    requester: 'Ekta Thapa',
    requestedAt: '2024-07-12T08:00:00',
    approvedAt:  '2024-08-05T10:45:00',
  },
];


export default function GeneratedFilesSection() {
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [filterMonths, setFilterMonths] = useState('all'); // all | 3 | 6 | 12

const filteredFiles = useMemo(() => {
  const term = search.toLowerCase().trim();
  const now = Date.now();
  const monthsInMs =
    filterMonths === 'all' ? Infinity : Number(filterMonths) * 30 * MS_IN_DAY;

  return DUMMY_FILES.filter((f) => {
    // use requestedAt (or approvedAt) for the date filter
    const ts = new Date(f.requestedAt).getTime();
    if (Number.isNaN(ts)) return false;

    const withinTime = now - ts <= monthsInMs;
    const matchesSearch =
      f.title.toLowerCase().includes(term) ||
      f.id.toLowerCase().includes(term) ||
      f.requester.toLowerCase().includes(term);

    return matchesSearch && withinTime;
  });
}, [search, filterMonths]);



  return (
    <AdminRoute>
    <div className="px-6 py-10 space-y-8">
      <h1 className="text-3xl font-semibold text-blue-700">Generated Documents</h1>

      {/* Summary */}
      <Card className="shadow-lg ring-1 ring-blue-100 bg-blue-50">
  <CardHeader className="pb-1">
    <h2 className="text-xl font-semibold text-blue-800">Document Statistics</h2>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <p className="text-base text-gray-700">
        <span className="text-gray-600">Total approved documents:</span>{' '}
        <span className="font-bold text-blue-700 text-lg">{DUMMY_FILES.length}</span>
      </p>
      {/* <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
        <Download className="h-4 w-4 mr-2" /> Download All
      </Button> */}
    </div>
  </CardContent>
</Card>


      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <span className="absolute left-11 top-1/2 -translate-y-1/2 h-6 border-l border-gray-300" />
          <Input
            placeholder="Search by title, ID, or loanee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-11 bg-white shadow-sm ring-1 ring-gray-200 focus:ring-blue-600/70"
          />
        </div>

        {/* Filter */}
       <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="flex items-center gap-2 h-11 w-44 justify-center">
      <Filter size={16} />
      {filterMonths === 'all' ? 'All time' : `Last ${filterMonths} mo`}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-44">
    {[
      { val: 'all', label: 'All time' },
      { val: '3', label: 'Last 3 months' },
      { val: '6', label: 'Last 6 months' },
      { val: '12', label: 'Last 12 months' },
    ].map((opt) => (
      <DropdownMenuItem
        key={opt.val}
        onSelect={(e) => {
          e.preventDefault(); // Prevent default menu behavior
          setFilterMonths(opt.val);
          setIsFilterOpen(false); // Close dropdown after selection
        }}
        className={filterMonths === opt.val ? 'font-semibold text-blue-700' : ''}
      >
        {opt.label}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full">No documents match your criteria.</p>
        )}
        {filteredFiles.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
    </AdminRoute>
  );
}

function FileCard({ file }) {
  return (
    <Card className="shadow-md ring-1 ring-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              {file.title}
              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                #{file.id}
              </span>
            </h3>
            <p className="text-sm text-gray-500">Requested by <span className='font-semibold'>{file.requester}</span></p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-gray-600 hover:text-blue-700">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 ">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-green-100">
                <Download className="h-4 w-4 text-blue-600 " /> Download Report
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-blue-100">
                <Pencil className="h-4 w-4 text-yellow-600" /> Rename
              </DropdownMenuItem> */}
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-red-100 text-red-600 focus:text-red-600">
                <Trash2 className="h-4 w-4 text-red-500" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
  <div className="text-sm text-gray-600 space-y-1">
    <p>
      <span className="font-medium">Requested on:</span>{' '}
      {format(new Date(file.requestedAt), 'PPP')}
    </p>
    <p>
      <span className="font-medium">Approved on:</span>{' '}
      {format(new Date(file.approvedAt), 'PPP')}
    </p>
  </div>
</CardContent>

    </Card>
  );
}
