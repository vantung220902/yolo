import React from 'react'
import Image from 'next/image'
import Logo from '../assets/Logo.png'
const Footer = () => {
    return (
        <div className='grid grid-cols-4 gap-4 py-8 mx-8 mt-8'>
            <div className=''>
                <p className='font-bold mb-4'>Support Switchboard</p>
                <ul>
                    <li className='flex items-center'>
                        <p className='mr-1'>Contact us to order product</p>
                        <p className='font-bold'>0987654321</p>
                    </li>
                    <li className='flex items-center'>
                        <p className='mr-1'>If you have any question</p>
                        <p className='font-bold'>0987654321</p>
                    </li>
                    <li className='flex items-center'>
                        <p className='mr-1'>
                            Feedback, Complain
                        </p>
                        <p className='font-bold'>0987654321</p>
                    </li>
                </ul>
            </div>
            <div className=''>
                <p className='font-bold mb-4'>About Yolo</p>
                <ul>
                    <li>
                        <p className='mr-1'>Introduce</p>
                    </li>
                    <li>
                        <p className='mr-1'>Contact</p>
                    </li>
                    <li>
                        <p className='mr-1'>
                            Career
                        </p>
                    </li>
                    <li>
                        <p className='mr-1'>
                            News
                        </p>
                    </li>
                </ul>
            </div>
            <div className=''>
                <p className='font-bold mb-4'>Customer Care</p>
                <ul>
                    <li>
                        <p className='mr-1'>Returnable Policy</p>
                    </li>
                    <li>
                        <p className='mr-1'>Warranty Policy</p>
                    </li>
                    <li>
                        <p className='mr-1'>
                            Refund Policy
                        </p>
                    </li>
                </ul>
            </div>
            <div className=''>
                <Image src={Logo} alt='anh' width={120} height={60} objectFit='contain' />
               <p>Toward the goal of bringing new joy of dressing every day to millions of Vietnamese users, please same Yolo to life, active more</p>
            </div>
        </div>
    )
}

export default Footer