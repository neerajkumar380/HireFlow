import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table className="min-w-full divide-y divide-gray-200">
                <TableCaption className="text-gray-500 bg-gray-50 py-2 font-medium">
                    A list of your recently posted jobs
                </TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company Name
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Posted
                        </TableHead>
                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className="hover:bg-gray-50">
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {job?.company?.name}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {job?.title}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {job?.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 bg-white rounded-md shadow-lg border border-gray-200">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div 
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable