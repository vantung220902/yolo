import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Button from '../../components/common/Button';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Avatar from '../../assets/avatar.jpg';
import { logoutAsync } from '../../redux/authRedux/actions';
import { IMe } from '../../redux/authRedux/type';
import { useSelector } from 'react-redux';
import { IRootReducers } from 'redux/rootReducer';

export interface IPropDrop {
  user: IMe | undefined;
}

export default function Dropdown({ user }: IPropDrop) {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutDispatch = () => dispatch(logoutAsync.success());
  const loading = useSelector((state: IRootReducers) => state.auth.loading);
  return (
    <Menu as="div" className="w-24 h-12 relative flex items-center z-100">
      <div className="w-full absolute right-0 group">
        <Menu.Button className="flex items-center w-full px-4 py-3 text-sm font-medium text-black rounded-full hover:bg-[#cecece]">
          <ChevronDownIcon className="h-6 text-[#686868]" aria-hidden="true" />
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src={user?.avatar ? user.avatar : Avatar.src}
            alt="Bordered avatar"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 mt-24 origin-top-right bg-[#1A1A1A] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
          <div className="px-1 py-1 cursor-pointer " onClick={() => logoutDispatch()}>
            <Menu.Item>
              {({ active }: any) => (
                <button
                  className={`${
                    active && 'bg-white/10 '
                  } group  flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white`}
                >
                  <LogoutIcon className="w-5 h-5 mr-2 " aria-hidden="true" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
          <Menu.Item>
            {({ active }: any) => (
              <Button
                className={`${
                  active && 'bg-white/10 '
                } group  flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white`}
                onClick={() => router.push('/user/me')}
                loading={loading}
                disabled={loading}
              >
                <AiOutlineSetting className="w-5 h-5 mr-2 " aria-hidden="true" />
                Profile
              </Button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
