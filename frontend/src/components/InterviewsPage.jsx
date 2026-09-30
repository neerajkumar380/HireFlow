import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const InterviewsPage = () => {
    const { user } = useSelector(store => store.auth);
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Format date and time from the combined interviewDate
    const formatInterviewDateTime = (dateTime) => {
        if (!dateTime) return { date: '', time: '' };
        
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        const formattedTime = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        
        return {
            date: formattedDate,
            time: formattedTime
        };
    };

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/interviews`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    setInterviews(res.data.interviews);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch interviews');
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Your Scheduled Interviews</h1>
            </div>

            {interviews.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">You don't have any scheduled interviews yet.</p>
                    <Link to="/jobs">
                        <Button variant="outline">Browse Jobs</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {interviews.map((interview) => {
                        const { date, time } = formatInterviewDateTime(interview.interviewDate);
                        
                        return (
                            <div key={interview._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {interview.job?.title}
                                        </h2>
                                        <p className="text-gray-600">{interview.job?.company?.name}</p>
                                    </div>
                                    <Badge className={`${
                                        interview.status === 'scheduled' 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {interview.status.toUpperCase()}
                                    </Badge>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <span className="text-gray-700">
                                            {date}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-gray-500" />
                                        <span className="text-gray-700">
                                            {time}
                                        </span>
                                    </div>
                                </div>

                                {interview.meetingLink && (
                                    <div className="mt-4">
                                        <a
                                            href={interview.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            <LinkIcon className="h-4 w-4 mr-2" />
                                            Join Meeting Link
                                        </a>
                                    </div>
                                )}

                                {interview.interviewNotes && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium text-gray-500">Interview Notes:</h3>
                                        <p className="text-gray-700 mt-1">{interview.interviewNotes}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default InterviewsPage;