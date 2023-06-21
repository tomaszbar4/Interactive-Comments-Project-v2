import React from 'react'

import BlackBg from './BlackBg'
import DeleteModal from './DeleteModal'


export default function DeleteBtnReply({ toggleReplyModal }) {

    return (

        <button onClick={() => toggleReplyModal(true)} className="flex justify-center items-center gap-2 font-bold text-red-500 md:absolute top-6 right-24 hover:opacity-50 transition-all duration-200">
            <img src="../../public/images/icon-delete.svg" />
            <span>Delete</span>
        </button>

    )
}
