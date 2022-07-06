import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="mx-auto my-16 h-screen xl:container ">
      <Navbar />
      <div className="mt-44 mx-12">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
