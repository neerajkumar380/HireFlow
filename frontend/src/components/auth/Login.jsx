import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import LoginImage from '@/assets/login.png'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            {/* Background wrapper */}
            <div className="min-h-[calc(105vh-95px)] flex items-center justify-center bg-gray-50">
                <div className="max-w-5xl w-full mx-4 bg-white rounded-xl shadow-md overflow-hidden md:flex">
                    {/* Image on left side */}
                    <div className="md:w-1/2 hidden md:block">
                        <img 
                            src={LoginImage}
                            alt="Login illustration"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    
                    {/* Login Form on right side */}
                    <div className="md:w-1/2 p-8">
                        <form onSubmit={submitHandler} className='w-full'>
                            <h1 className='font-bold text-2xl mb-6 text-center'>Login</h1>
                            <div className='mb-4'>
                                <Label className="block text-sm font-medium mb-1">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="patel@gmail.com"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className='mb-4'>
                                <Label className="block text-sm font-medium mb-1">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div className='mb-6'>
                                <Label className="block text-sm font-medium mb-2">Login as</Label>
                                <RadioGroup className="flex items-center gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <Label>Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <Label>Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {loading ? (
                                <Button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                >
                                    Login
                                </Button>
                            )}

                            <div className='text-center mt-4 text-sm'>
                                Don't have an account? <Link to="/signup" className='text-blue-600 hover:text-blue-800'>Signup</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login