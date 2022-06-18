import React from 'react'

export interface IPropsPolicy {
    title: string;
    description: string;
    icon: JSX.Element;
}

const Policy = ({ item }: { item: IPropsPolicy }) => {
    return (
        <div className='shadow-md shadow-gray-400 p-[12px] rounded-sm text-normal max-w-[330px] flex 
      justify-between items-center hover:translate-y-[-20px] transition-all duration-300 ease-linear'>
            <div className='w-[30%] mx-auto'>
                {item.icon}
         </div>
            <div className='w-[68%]'>
                <p className='font-bold text-lg'>
                    {item.title}
                </p>
                <p className='font-medium text-sm'>
                    {item.description}
                </p>
            </div>
        </div>
    )
}

export default Policy