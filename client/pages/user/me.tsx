import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { defaultSize } from 'services/ui';
import 'yup-phone';
import Layout from '../../components/Layout';
import Profile from '../../components/Me/Profile';
import Order from '../../components/Me/Order';
import { useCheckAuth } from '../../hooks';
const me = () => {
  const router = useRouter();
  const [screen, setScreen] = useState(0);
  const query = new URLSearchParams(router.locale);
  useEffect(() => {
    const checkData = async () => {
      await useCheckAuth(router);
    };
    checkData();
  }, []);
  useEffect(() => {
    setScreen((router.query['screen'] && parseInt(router.query['screen'] as string, 10)) || 0);
  }, [router.query]);
  const setActive = (screen: number) => {
    setScreen(screen);
    query.delete('screen');
    query.append('screen', screen.toString());
    router.push(router.route + '?' + query.toString());
  };

  console.log('screen :>> ', screen);
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 border-r-2 border-r-gray-500 h-screen ">
          <div className="flex items-center cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <MdOutlineArrowBackIos size={defaultSize} />
            <p>Back</p>
          </div>
          <div className="mt-12">
            <div className="flex items-center my-4">
              <CgProfile size={defaultSize} />
              <p className="mx-2">Profile</p>
            </div>
            <ul className="mt-2 cursor-pointer">
              <li
                className={`px-4 py-2 ${
                  !screen && 'bg-gray-100'
                } dark:hover:bg-gray-600 dark:hover:text-white`}
                onClick={() => setActive(0)}
              >
                <p>Edit Profile</p>
              </li>
              <li
                className={`px-4 py-2 ${
                  screen && 'bg-gray-100'
                } hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                onClick={() => setActive(1)}
              >
                Order
              </li>
            </ul>
          </div>
        </div>
        <div></div>
        {screen ? <Order /> : <Profile />}
      </div>
    </Layout>
  );
};

export default me;
