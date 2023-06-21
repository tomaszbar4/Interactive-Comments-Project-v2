import React, { useContext, useState, useEffect, useRef } from 'react'
import ReplyBtn from './ReplyBtn'
import DeleteBtnReply from './DeleteBtnReply'
import EditBtn from './EditBtn'
import { Context } from '../Context'
import ReplyEl from './ReplyEl'
import RegularBtn from './RegularBtn'

import DeleteModalReply from './DeleteModalReply'
import BlackBg from './BlackBg'
import CancelBtn from './CancelBtn'

export default function Reply({ content, user, createdAt, score, id }) {

    const { username, isReplyModalVisible, toggleReplyModal, currentId, changeId, checkCommentId, toggleNewComment, repliesVisibilityArr, checkIfVisible, toggleRepliesVisibility, hideAllReplyEls, updateComment } = useContext(Context)

    const ref = useRef(null)

    const imgSrc = `../../dist/` + user.image.png

    const [editMode, setEditMode] = useState(false)
    const [commentText, setCommentText] = useState(content)
    const [previousCommentText, setPreviousCommentText] = useState(content)
    const [upvoteCount, setUpvoteCount] = useState(() => {
        const value = localStorage.getItem("score-" + id)

        return value ? JSON.parse(value) : score
    })

    useEffect(() => {
        localStorage.setItem("score-" + id, JSON.stringify(upvoteCount))
    }, [upvoteCount])


    function upvotePlus() {
        if (username !== user.username && upvoteCount < score + 1) {
            setUpvoteCount(oldCount => oldCount + 1)
        }
    }


    function upvoteMinus() {
        if (username !== user.username && upvoteCount > score - 1) {
            setUpvoteCount(oldCount => oldCount - 1)
        }
    }

    function handleChange(e) {
        setCommentText(e.target.value)
    }

    function cancel() {
        setCommentText(previousCommentText)
        setEditMode(false)
    }

    function handleSubmit() {
        setEditMode(false)
        updateComment(commentText, id)
        setPreviousCommentText(commentText)
    }

    function openReplyAndHideNewComment() {
        hideAllReplyEls()
        toggleRepliesVisibility(id)
        toggleNewComment(false)
    }

    const realId = checkCommentId(id)

    function editComment() {
        setEditMode(true)
        const end = commentText.length
        setTimeout(() => {
            ref.current.focus()
            ref.current.setSelectionRange(end, end)
        }, 100)
    }

    return (
        <>
            <div className="bg-white rounded-md shadow-md p-6 flex w-11/12 gap-6 relative max-w-comment mb-6 z-10" >
                <div className="bg-gray-100 hidden md:flex flex-col justify-center items-center w-10 max-h-24 rounded-lg gap-3">
                    <div onClick={upvotePlus}> <img src="../../dist/images/icon-plus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                    <span className="text-blue-900 font-bold text-sm ">{upvoteCount}</span>
                    <div onClick={upvoteMinus}> <img src="../../dist/images/icon-minus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="flex gap-3 items-center mb-4">
                        <img src={imgSrc} className="w-8" />
                        <span className="font-bold">{user.username}</span>
                        {user.username === username && <span className="bg-blue-800 text-white py-0.5 px-2 text-sm font-semibold rounded-md">you</span>}
                        <span className="text-gray-400 font-semibold">{createdAt}</span>
                    </div>
                    {editMode ? <div className="flex flex-col"><textarea ref={ref} rows="3" value={commentText} onChange={(e) => handleChange(e)} className="border-2 py-3 px-4 focus:outline-0 focus:border-violet-300 border-gray-100 rounded-xl resize-none"></textarea><div className="flex gap-4 mt-4 justify-end"><div onClick={cancel}><CancelBtn /></div><div className="" onClick={handleSubmit}><RegularBtn >Update</RegularBtn></div></div></div> : <p className="text-gray-500 break-words" >{commentText}</p>}
                    <div className="flex justify-between items-center mt-4">
                        <div className="bg-gray-100 flex justify-center md:hidden items-center rounded-lg gap-3 w-24 h-10">
                            <div onClick={upvotePlus}> <img src="../../dist/images/icon-plus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                            <span className="text-blue-900 font-bold text-sm">{upvoteCount}</span>
                            <div onClick={upvoteMinus}> <img src="../../dist/images/icon-minus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                        </div>
                        <div className="flex gap-4">
                            {user.username !== username && <div onClick={openReplyAndHideNewComment}><ReplyBtn /></div>}
                            {user.username === username && <div onClick={() => changeId(id)} ><DeleteBtnReply toggleReplyModal={toggleReplyModal} /></div>}
                            {user.username === username && <div onClick={editComment}><EditBtn /></div>}
                        </div>
                    </div>
                </div>
            </div >
            {checkIfVisible(id) && <ReplyEl username={user.username} reply_id={realId} hideAllReplyEls={hideAllReplyEls} replyTo={user.username} />}
            {isReplyModalVisible && (<DeleteModalReply reply_id={currentId} />)}
        </>

    )
}
