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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import SignupImage from '@/assets/signup.jpg'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
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
            <div className="min-h-[calc(90vh-50px)] flex items-center justify-center bg-gray-50">
                <div className="max-w-5xl w-full mx-4 bg-white rounded-xl shadow-md overflow-hidden md:flex">
                    {/* Image on left side */}
                    <div className="md:w-1/2 hidden md:block relative">
                        <img 
                            src={SignupImage}
                            alt="Signup illustration"
                            className="w-full h-800px object-cover object-center"
                            style={{
                                position: 'absolute',
                                top: '52%',
                                transform: 'translateY(-50%)'
                            }}
                        />
                    </div>
                    
                    {/* Signup Form on right side */}
                    <div className="md:w-1/2 p-8">
                        <form onSubmit={submitHandler} className='w-full'>
                            <h1 className='font-bold text-2xl mb-6 text-center'>Sign Up</h1>
                            
                            <div className='mb-4'>
                                <Label className="block text-sm font-medium mb-1">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className='mb-4'>
                                <Label className="block text-sm font-medium mb-1">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className='mb-4'>
                                <Label className="block text-sm font-medium mb-1">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
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
                                <Label className="block text-sm font-medium mb-1">Profile Picture</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="block w-20px text-sm text-gray-500
                                    file:mr-1 file:py-0 file:px-2
                                    file:rounded-md file:border-3
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-800
                                    hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>

                            {/* Moved "Register as" section after Profile Picture */}
                            <div className='mb-4'>
                                <Label className="block text-sm font-medium mb-2">Register as</Label>
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
                                    Sign Up
                                </Button>
                            )}

                            <div className='text-center mt-4 text-sm'>
                                Already have an account? <Link to="/login" className='text-blue-600 hover:text-blue-800'>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup