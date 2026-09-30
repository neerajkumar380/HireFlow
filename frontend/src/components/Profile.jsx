import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, X } from 'lucide-react' // Added X icon
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [openImage, setOpenImage] = useState(false); // State for image viewer
    const {user} = useSelector(store=>store.auth);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto py-8'>
                {/* Profile Card */}
                <div className='bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl mb-6 p-8 shadow-lg'>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-start gap-6'>
                            <div 
                                className='cursor-pointer' 
                                onClick={() => setOpenImage(true)}
                            >
                                <Avatar className="h-24 w-24 border-2 border-gray-200">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                        alt="profile" 
                                    />
                                </Avatar>
                            </div>
                            <div className='space-y-2'>
                                <h1 className='font-semibold text-2xl text-gray-800'>{user?.fullname}</h1>
                                <p className='text-gray-600'>{user?.profile?.bio || "No bio available"}</p>
                                
                                <div className='flex flex-col gap-2 pt-2'>
                                    <div className='flex items-center gap-3'>
                                        <Mail className='h-5 w-5 text-gray-500' />
                                        <span className='text-gray-700'>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Contact className='h-5 w-5 text-gray-500' />
                                        <span className='text-gray-700'>{user?.phoneNumber || "Not provided"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline" 
                            className="text-gray-600 hover:bg-gray-100"
                            size="icon"
                        >
                            <Pen className='h-6 w-6' />
                        </Button>
                    </div>

                    {/* Skills Section */}
                    <div className='mt-8'>
                        <h1 className='font-medium text-lg text-gray-800 mb-3'>Skills</h1>
                        <div className='flex flex-wrap gap-2'>
                            {user?.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <Badge 
                                        key={index} 
                                        variant="secondary" 
                                        className='px-3 py-1 bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className='text-gray-500'>No skills added</span>
                            )}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className='mt-6'>
                        <Label className="font-medium text-lg text-gray-800">Resume</Label>
                        <div className='mt-2'>
                            {user?.profile?.resume ? (
                                <a 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    href={user.profile.resume} 
                                    className='inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline'
                                >
                                    {user.profile.resumeOriginalName}
                                </a>
                            ) : (
                                <span className='text-gray-500'>No resume uploaded</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8'>
                    <h1 className='text-center font-bold text-xl text-gray-800 mb-6'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>
            
            {/* Profile Update Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            
            {/* Full Screen Image Viewer */}
            {openImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <img 
                            src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                            alt="Profile" 
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <Button
                            onClick={() => setOpenImage(false)}
                            className="absolute top-4 right-4 rounded-full p-2 bg-gray-800 hover:bg-gray-700 text-white"
                            size="icon"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile