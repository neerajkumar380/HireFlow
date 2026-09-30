import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Interview</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    You haven't applied any job yet.
                                </TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell>
                                    {appliedJob.interviewDate ? (
                                        <div className="space-y-1">
                                            <div>{new Date(appliedJob.interviewDate).toLocaleDateString()}</div>
                                            {appliedJob.meetingLink && (
                                                <a 
                                                    href={appliedJob.meetingLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline text-xs"
                                                >
                                                    Join Meeting
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">Not scheduled</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${
                                        appliedJob?.status === "rejected" 
                                            ? 'bg-red-400' 
                                            : appliedJob.status === 'pending' 
                                                ? 'bg-gray-400' 
                                                : appliedJob.status === 'scheduled'
                                                    ? 'bg-blue-400'
                                                    : 'bg-green-400'
                                    }`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable