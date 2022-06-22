import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface ILayoutProps {
    children: ReactNode,
}

 const Layout = ({ children }: ILayoutProps) => {
    return (
        <div className='mx-8 my-16 h-screen w-screen '>
            <Navbar  />
            <div className='mt-44 mx-12'>
                {children}
                <Footer />
            </div>
            
        </div>
    )
}


export default (Layout)