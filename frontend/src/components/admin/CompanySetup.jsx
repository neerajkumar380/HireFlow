import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-200 via-purple-200 to-orange-200 animate-gradient">
            <Navbar />
            <div className='flex items-center justify-center w-full py-8'>
                <div className='w-full max-w-2xl bg-white rounded-lg shadow-lg mx-4'>
                    <form onSubmit={submitHandler} className='p-8'>
                        <div className='flex items-center gap-5 mb-6'>
                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                variant="outline" 
                                className="flex items-center gap-2 text-[#00ADFF] font-semibold border-[#00ADFF] hover:bg-[#00ADFF]/10"
                            >
                                <ArrowLeft size={18} />
                                <span>Back</span>
                            </Button>
                            <h1 className='font-bold text-2xl text-gray-800'>Company Setup</h1>
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <Label className="text-gray-700">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="bg-white border-gray-300 focus-visible:ring-primary"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-gray-700">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="bg-white border-gray-300 focus-visible:ring-primary"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-gray-700">Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="bg-white border-gray-300 focus-visible:ring-primary"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-gray-700">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="bg-white border-gray-300 focus-visible:ring-primary"
                                />
                            </div>
                            <div className='space-y-2 md:col-span-2'>
                                <Label className="text-gray-700">Logo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="bg-white border-gray-200 file:mr-4 file:py-0 file:px-5 file:rounded-md file:border-3 file:text-sm file:font-semibold file:bg-primary/12 file:text-primary hover:file:bg-primary/20"
                                />
                            </div>
                        </div>
                        
                        {loading ? (
                            <Button 
                                className="w-full mt-6 h-10"
                                style={{
                                    backgroundColor: '#00ADFF',
                                    color: 'white'
                                }}
                            >
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full mt-6 h-10"
                                style={{
                                    backgroundColor: '#00ADFF',
                                    color: 'white'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0085CC'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00ADFF'}
                            >
                                Update Company
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup