import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import jobImage from '@/assets/job3.png';
import searchIllustration from '@/assets/Search.png';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        // Trim and convert to lowercase for consistent matching
        const searchTerm = query.trim().toLowerCase();
        dispatch(setSearchedQuery(searchTerm));
        navigate("/browse");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    };

    return (
        <div className='text-center'>
            <div className='flex flex-col md:flex-row items-start justify-between gap-6 my-8 max-w-7xl mx-auto px-4'>
                {/* Left Content Section - unchanged */}
                <div className='flex flex-col gap-4 md:text-left text-center w-full md:w-1/2'>
                    <span className='inline-block px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium w-fit md:mx-0 mx-auto'>
                    Find the Right Job, Right Now
                    </span>
                    <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
                        Search, Apply & <br /> Get Your <span className='text-[#FF6500]'>Dream Jobs</span>
                    </h1>
                    <p className='text-gray-700 mb-2 font-sans text-lg leading-relaxed'>
                        Start your career journey with us. Explore thousands of job opportunities from top companies, tailored just for you.
                    </p>
                    <p className='text-gray-800 font-medium mb-4 font-sans text-lg leading-relaxed'>
                        Discover jobs that match your skills, passion, and goals — all in one place.
                    </p>
                    
                    {/* Search Illustration + Bar Stack */}
                    <div className='relative mt-2'>
                        <img 
                            src={searchIllustration} 
                            alt="Search illustration"
                            className='w-full max-w-md mx-auto scale-100'
                        />
                        <div className='flex w-full bg-white border border-gray-200 shadow-lg pl-4 rounded-full items-center gap-2 md:mx-0 mx-auto transition-all duration-300 hover:shadow-xl hover:border-[#6A38C2]/60'>
                            <input
                                type="text"
                                placeholder='Find your dream jobs...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='outline-none border-none w-full py-3 text-gray-800 placeholder-gray-500 font-sans'
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="rounded-r-full bg-gradient-to-r from-[#6A38C2] to-[#8E54E9] hover:from-[#5a2cad] hover:to-[#7d3ce1] h-full px-6 text-white shadow-md"
                            >
                                <Search className='h-5 w-5' />
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Right Side Image - unchanged */}
                <div className='md:w-1/2 mt-12 md:mt-8 md:ml-12 relative self-end'>
                    <img 
                        src={jobImage} 
                        alt="Happy professional at work" 
                        className='w-full h-auto max-h-[750px] md:max-h-[850px] object-contain drop-shadow-2xl'
                        style={{ 
                            transform: 'scale(1.1) translateY(2rem)',
                            transformOrigin: 'left center'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;