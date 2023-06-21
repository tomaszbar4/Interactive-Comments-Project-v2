import React from 'react'


export default function EditBtn() {
    return (
        <button className="flex justify-center items-center gap-2 font-bold text-blue-800 md:absolute top-6 right-6 hover:opacity-50 transition-all duration-200">
            <img src="../../dist//images/icon-edit.svg" />
            <span>Edit</span>
        </button>
    )
}
