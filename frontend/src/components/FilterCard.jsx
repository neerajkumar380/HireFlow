import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1L", "1L-5L"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
        // Convert salary ranges to a format that can be compared with job salaries
        let filterValue = value;
        if (value === "0-40k") filterValue = "0-40000";
        if (value === "40k-1L") filterValue = "40000-100000";
        if (value === "1L-5L") filterValue = "100000-500000";
        dispatch(setSearchedQuery(filterValue));
    }

    return (
        <div className='w-full bg-white p-3 rounded-md shadow-sm border border-gray-200 sticky top-4'>
            <h1 className='font-bold text-lg mb-3'>Filter Jobs</h1>
            <hr className='mb-4' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className='mb-4'>
                        <h2 className='font-semibold text-md mb-2'>{data.filterType}</h2>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-1'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className='cursor-pointer'>
                                        {item}
                                    </Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard