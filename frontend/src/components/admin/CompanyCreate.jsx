import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Loader2 } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter a company name');
            return;
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-200 via-purple-200 to-orange-200 animate-gradient">
            <Navbar />
            <div className='flex items-center justify-center w-full py-8'>
                <div className='w-full max-w-xl bg-white rounded-lg shadow-lg p-8 mx-4'>
                    <div className='mb-8'>
                        <h1 className='font-bold text-2xl text-gray-800 mb-2'>Your Company Name</h1>
                        <p className='text-gray-600'>
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className='space-y-2 mb-6'>
                        <Label className="text-gray-700">Company Name</Label>
                        <Input
                            type="text"
                            value={companyName}
                            className="bg-white border-gray-300 focus-visible:ring-primary"
                            placeholder="e.g., JobHunt, Microsoft, etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center gap-3 mt-8'>
                        <Button 
                            variant="outline" 
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="flex-1"
                            onClick={registerNewCompany}
                            disabled={loading || !companyName.trim()}
                            style={{
                                backgroundColor: '#00ADFF',
                                color: 'white'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0085CC'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00ADFF'}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : 'Continue'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate