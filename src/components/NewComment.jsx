import React, { useContext, useState } from 'react'
import RegularBtn from './RegularBtn'
import { Context } from '../Context'

export default function NewComment() {

    const { addNewComment } = useContext(Context)

    function addAndClear() {
        addNewComment(msgValue)
        setMsgValue('')
    }

    const [msgValue, setMsgValue] = useState('')

    function handleChange(e) {
        setMsgValue(e.target.value)
    }

    return (
        <div className="bg-white rounded-md mx-6 shadow-md p-6 grid grid-cols-2  row-start-2 gap-6 w-11/12 lg:flex md:justify-evenly md:items-start relative max-w-comment lg:min-w-comment z-0">
            <img src="../../public/images/avatars/image-juliusomo.png" className="w-10 row-start-2 lg:row-auto flex items-center" />
            <textarea rows="4" placeholder="Add a comment.." value={msgValue} onChange={(e) => handleChange(e)} className="placeholder:font-semibold border-2 w-full col-span-2 border-solid border-gray-100 rounded-lg p-4 text-sm focus:outline-violet-300 outline-4 resize-none"></textarea>
            <div onClick={addAndClear} className="row-start-2 col-start-2 lg:row-auto lg:col-auto flex justify-end items-start"><RegularBtn>Send</RegularBtn></div>
        </div >
    )
}
