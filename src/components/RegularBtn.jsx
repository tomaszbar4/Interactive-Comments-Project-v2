import React from 'react'

export default function RegularBtn({ children }) {
    return (
        <div className="py-3 px-6 text-white bg-blue-700 font-medium text-sm rounded-xl uppercase cursor-pointer hover:bg-violet-300 transition-all duration-200 w-20 flex justify-center items-center">{children}</div>
    )
}
