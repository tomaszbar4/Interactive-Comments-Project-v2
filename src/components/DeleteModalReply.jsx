import React, { useContext } from 'react'
import { Context } from '../Context'

export default function DeleteModal({ reply_id }) {

    const { toggleReplyModal, deleteComment } = useContext(Context)



    return (
        <div className="fixed w-11/12 sm:w-96 h-60 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 p-8 bg-white z-30">
            <h2 className="text-xl font-semibold">Delete comment</h2>
            <p className="text-gray-600">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="flex gap-4">
                <button className="w-1/2 text-white bg-gray-500 rounded-lg py-3 uppercase font-semibold" onClick={() => toggleReplyModal(false)}>No, cancel</button>
                <button onClick={() => deleteComment(reply_id)} className="w-1/2 text-white bg-red-400 rounded-lg py-3 uppercase font-semibold">Yes, delete</button>
            </div>
        </div>
    )
}
