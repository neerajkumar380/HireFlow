// components/ApplicantsTable.jsx
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import InterviewScheduler from './InterviewScheduler';
import { FileText, Eye, Download } from 'lucide-react';

const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    // Update the shortlistingStatus array to use lowercase values
const shortlistingStatus = ["accepted", "rejected", "scheduled"];

    
// Update the statusHandler function to send lowercase status
const statusHandler = async (status, id) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(
            `${APPLICATION_API_END_POINT}/status/${id}/update`, 
            { status: status.toLowerCase() } // Convert to lowercase
        );
        if (res.data.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}


    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table className="min-w-full divide-y divide-gray-200">
                <TableCaption className="text-gray-500 bg-gray-50 py-2 font-medium">
                    A list of recent applicants
                </TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Full Name
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resume
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Interview
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </TableHead>
                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                    {applicants && applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-50">
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item?.applicant?.fullname}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {item?.applicant?.email}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {item?.applicant?.phoneNumber}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                        {item.applicant?.profile?.resume ? (
                                       <div className="flex flex-col">
                            <div className="font-medium text-gray-800 mb-1 flex items-center">
                               <FileText className="h-4 w-4 mr-2" />
                               {item?.applicant?.profile?.resumeOriginalName || 'Resume.pdf'}
                            </div>
                            <div className="flex space-x-4">
                                   {/* View PDF - Removed fl_attachment for viewing */}
                                 <a
                                 href={item.applicant?.profile?.resume.replace('/upload/', '/upload/')}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                    <Eye className="h-4 w-4 mr-1" /> View
                                 </a>
                            {/* Download PDF - Keeps fl_attachment */}
                              <a
                                  href={`https://res.cloudinary.com/dqgedj6q4/image/upload/fl_attachment/${item.applicant?.profile?.resume.split('/').pop()}`}
                                  download={item?.applicant?.profile?.resumeOriginalName || 'resume.pdf'}
                                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                  <Download className="h-4 w-4 mr-1" /> Download
                             </a>
                             </div>
                            </div>
                           ) : (
                          <span className="text-gray-400">NA</span>
                                )}
                           </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                            
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                   item.status === 'accepted' 
                                  ? 'bg-green-100 text-green-800' 
                                    : item.status === 'rejected' 
                                      ? 'bg-red-100 text-red-800' 
                                       : item.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                              }`}>
                                {item.status ? item.status.toUpperCase() : 'PENDING'}
                             </span>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.interviewDate ? (
                                    <div>
                                        <div>{new Date(item.interviewDate).toLocaleDateString()}</div>
                                        <div className="text-xs text-gray-400">
                                            {item.meetingLink && (
                                                <a href={item.meetingLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    Join Meeting
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <InterviewScheduler 
                                        applicationId={item._id} 
                                        applicantEmail={item.applicant?.email}
                                    />
                                )}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item?.applicant.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 bg-white rounded-md shadow-lg border border-gray-200">
                                        {shortlistingStatus.map((status, index) => {
                                            // Determine color based on status
                                            let colorClass = '';
                                            if (status === "accepted") {
                                                colorClass = "text-green-600 hover:bg-green-50";
                                            } else if (status === "rejected") {
                                                colorClass = "text-red-600 hover:bg-red-50";
                                            } else if (status === "scheduled") {
                                                colorClass = "text-blue-600 hover:bg-blue-50";
                                            }

                                            return (
                                                <div 
                                                    onClick={() => statusHandler(status, item?._id)} 
                                                    key={index} 
                                                    className={`flex w-full items-center px-3 py-2 text-sm rounded cursor-pointer transition-colors ${colorClass}`}
                                                >
                                                    <span>{status.toUpperCase()}</span>
                                                </div>
                                            );
                                        })}
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

export default ApplicantsTable;