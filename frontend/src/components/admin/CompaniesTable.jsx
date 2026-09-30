import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table className="min-w-full divide-y divide-gray-200">
                <TableCaption className="text-gray-500 bg-gray-50 py-2">
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id} className="hover:bg-gray-50">
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                <Avatar className="border border-gray-200">
                                    <AvatarImage src={company.logo} className="object-cover"/>
                                </Avatar>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {company.name}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {company.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 bg-white rounded-md shadow-lg border border-gray-200">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable