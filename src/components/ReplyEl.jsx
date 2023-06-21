import React, { useContext, useState, useRef, useEffect } from 'react'
import RegularBtn from './RegularBtn'
import { Context } from '../Context'

export default function ReplyEl({ username, replyActive, reply_id, hideAllReplyEls, replyTo }) {

    const [msgValue, setMsgValue] = useState('')
    const { toggleNewComment, addNewReply } = useContext(Context)
    const ref = useRef(null)

    useEffect(() => {
        ref.current.focus()
    })

    function handleChange(e) {
        setMsgValue(e.target.value)
    }

    function addReplyAndToggleComment() {
        addNewReply(msgValue, reply_id)
        toggleNewComment(true)
        setMsgValue('')
        hideAllReplyEls()
    }

    return (
        <div className="bg-white rounded-md shadow-md p-6 grid grid-cols-2 row-start-2 gap-6 w-11/12 md:justify-evenly md:items-start relative max-w-comment lg:min-w-comment z-0 lg:flex mb-6">
            <img src="../../public/images/avatars/image-juliusomo.png" className="w-10 row-start-2 lg:row-auto flex items-center" />
            <textarea ref={ref} rows="4" value={msgValue} onChange={(e) => handleChange(e)} className="placeholder:font-semibold border-2 w-full col-span-2 border-solid border-gray-100 rounded-lg p-4 text-sm focus:outline-violet-300 outline-4 resize-none"></textarea>
            <div className="row-start-2 col-start-2 lg:row-auto lg:col-auto flex justify-end items-start" onClick={addReplyAndToggleComment}><RegularBtn>Reply</RegularBtn></div>
        </div >
    )
}
