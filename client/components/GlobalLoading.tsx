import React from 'react'
import { useSelector } from 'react-redux'
import { IRootReducers } from '../redux/rootReducer'
const GlobalLoading = () => {
    const { isLoading } = useSelector((state: IRootReducers) => state.common);
    if (isLoading)
        return (
          <div className="fixed flex items-center justify-center h-screen top-0 right-0 left-0 bg-gray-50/30">
            <div className="w-40 h-40 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
          </div>
        );
    return <>
    </>
}

export default GlobalLoading