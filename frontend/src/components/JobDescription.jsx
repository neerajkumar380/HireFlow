import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between bg-white p-6 rounded-lg shadow-md'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold bg-blue-100'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold bg-orange-100'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold bg-purple-100'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            
            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h1 className='text-xl font-bold text-gray-800 border-b-2 border-b-gray-200 pb-3 mb-4'>Job Details</h1>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div>
                            <h2 className='font-semibold text-gray-700'>Role</h2>
                            <p className='text-gray-600 mt-1'>{singleJob?.title}</p>
                        </div>
                        <div>
                            <h2 className='font-semibold text-gray-700'>Location</h2>
                            <p className='text-gray-600 mt-1'>{singleJob?.location}</p>
                        </div>
                        <div>
                            <h2 className='font-semibold text-gray-700'>Experience Required</h2>
                            <p className='text-gray-600 mt-1'>{singleJob?.experience} years</p>
                        </div>
                    </div>
                    
                    <div className='space-y-4'>
                        <div>
                            <h2 className='font-semibold text-gray-700'>Salary</h2>
                            <p className='text-gray-600 mt-1'>{singleJob?.salary} LPA</p>
                        </div>
                        <div>
                            <h2 className='font-semibold text-gray-700'>Total Applicants</h2>
                            <p className='text-gray-600 mt-1'>{singleJob?.applications?.length}</p>
                        </div>
                        <div>
                            <h2 className='font-semibold text-gray-700'>Posted Date</h2>
                            <p className='text-gray-600 mt-1'>{singleJob?.createdAt?.split("T")[0]}</p>
                        </div>
                    </div>
                </div>
                
                <div className='mt-6'>
                    <h2 className='font-bold text-gray-700 mb-2'>Job Description</h2>
                    <p className='text-gray-600 bg-gray-50 p-4 rounded-md'>{singleJob?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default JobDescription