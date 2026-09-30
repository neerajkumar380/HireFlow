import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-200 via-purple-200 to-orange-200 animate-gradient">
            <Navbar />
            <div className='max-w-6xl mx-auto py-10 px-4'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'>
                    <Input
                        className="w-full sm:w-64 bg-white border-gray-300 focus:border-[#00ADFF]"
                        placeholder="Filter by name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="w-full sm:w-auto"
                        style={{
                            backgroundColor: '#00ADFF',
                            color: 'white'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0085CC'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00ADFF'}
                    >
                        New Company
                    </Button>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies