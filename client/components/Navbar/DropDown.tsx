import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import Avatar from '../../assets/avatar.jpg'
import Image from 'next/image'
import { IMe } from "../../types/Auth";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

export interface IPropDrop {
    user: IMe | undefined
}

export default function Dropdown({ user }: IPropDrop) {

    const dispatch = useDispatch()

    const logoutDispatch = () => dispatch(logout());

    return (
        <Menu as="div" className="w-24 h-12 relative flex items-center z-100">
            <div className="w-full absolute right-0 group">
                <Menu.Button className="flex items-center w-full px-4 py-3 text-sm font-medium text-black rounded-full hover:bg-[#cecece]">
                    <ChevronDownIcon className="h-6 text-[#686868]" aria-hidden="true" />
                    <Image
                        src={user?.avatar ? user.avatar : Avatar}
                        alt="anh"
                        width={44}
                        height={44}
                        objectFit='cover'
                        className="rounded-full absolute -right-1"
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
                                    className={`${active && "bg-white/10 "
                                        } group  flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white`}
                                >
                                    <LogoutIcon className="w-5 h-5 mr-2 " aria-hidden="true" />
                                    Log out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}