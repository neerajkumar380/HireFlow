import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import logo from '@/assets/logo.png' // Import the uploaded logo

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo and Brand Name */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Job Portal Logo" className="h-15 w-12 object-contain" /> 
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                {/* Navigation Links */}
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-gray-300 transition-colors duration-200'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-gray-300 transition-colors duration-200'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-gray-300 transition-colors duration-200'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-gray-300 transition-colors duration-200'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-gray-300 transition-colors duration-200'>Browse</Link></li>
                                    <li><Link to="/interviews" className='hover:text-gray-300 transition-colors duration-200'>Interviews</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Authentication Section */}
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button 
                                        variant="outline" 
                                        className='
                                            text-white border-gray-400 bg-transparent
                                            hover:bg-gray-800 hover:border-white
                                            active:bg-gray-700 active:scale-[0.98]
                                            transition-all duration-200 ease-in-out
                                        '
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button 
                                         variant="outline" 
                                        className='
                                            text-white border-gray-400 bg-transparent
                                            hover:bg-gray-800 hover:border-white
                                            active:bg-gray-700 active:scale-[0.98]
                                            transition-all duration-200 ease-in-out
                                        '
                                    >
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-gray-800 text-white border-gray-700">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-400'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors duration-200'>
                                                        <User2 />
                                                        <Button variant="link" className='text-white hover:text-gray-300'> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors duration-200'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className='text-white hover:text-gray-300'>Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar