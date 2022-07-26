import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { defaultSize } from '../services/ui'
import { sliderData } from '../services/localData'

const Slider = () => {

    const [slide, setSlide] = useState(1);
    const data = sliderData[slide - 1];
    return (
        <div className='relative z-0'>
            <div className='flex justify-between mb-32 h-[400px]'>
                <div className='w-[55%]'>
                    <h1 className='text-primary font-bold mb-4'>
                        {data.title}
                    </h1>
                    <h5 className='my-12 font-sans text-gray-500 text-justify'>
                        {data.description}
                    </h5>
                    <button className='btn'>
                        Show More
                    </button>
                </div>
                <div className='relative w-[50%] left-[5%]'>
                    <div className={`${slide === 1 ? 'bg-primary' : slide===2 ? 'bg-pink-500': 'bg-orange-500' } rounded-full w-[472px] h-[472px] absolute top-10 left-[2%] animate-bounce z-0`}>
                    </div>
                    <img src={data.img.src} alt='anh' className='h-[78vh] 3xl:h-[70vh] absolute top-[-50%] right-0 left-0 z-1'  />
                </div>
            </div>
            <div className='text-normal absolute bottom-[-20%] left-[46%] flex justify-between w-20 cursor-pointer'>
                <FiChevronLeft size={defaultSize} onClick={() => {
                    setSlide(pre => {
                        if (pre === 1) {
                            return 3
                        }
                        return pre - 1;
                    })
                }} />
                <h5>{slide}</h5>
                <h5>/{sliderData.length}</h5>
                <FiChevronRight size={defaultSize} onClick={() => {
                    setSlide(pre => {
                        if (pre === 3) return 1;
                        return pre + 1;
                    })
                }} />
            </div>
        </div>

    )
}

export default Slider