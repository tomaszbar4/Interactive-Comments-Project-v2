import React, { useContext, useEffect, useState, useRef } from 'react'
import ReplyBtn from './ReplyBtn'
import DeleteBtnComment from './DeleteBtnComment'
import EditBtn from './EditBtn'
import { Context } from '../Context'
import Reply from './Reply'
import ReplyEl from './ReplyEl'

import BlackBg from './BlackBg'
import DeleteModal from './DeleteModal'
import RegularBtn from './RegularBtn'
import CancelBtn from './CancelBtn'
import { comment } from 'postcss'


export default function Comment({ content, user, createdAt, score, replies, id }) {

    const { username, deleteComment, isCommentModalVisible, toggleCommentModal, changeId, currentId, addNewReply, toggleNewComment, checkIfVisible, toggleRepliesVisibility, hideAllReplyEls, updateComment } = useContext(Context)

    const replyEls = replies.map((reply, idx) => {
        return <Reply key={reply.id} id={reply.id} content={reply.content} user={reply.user} createdAt={reply.createdAt} score={reply.score} />
    })

    const imgSrc = `././dist/` + user.image.png
    console.log(user.image.png)

    const ref = useRef(null)

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
        if (commentText) {
            updateComment(commentText, id)
            setEditMode(false)
            setPreviousCommentText(commentText)
        }
    }


    function openReplyAndHideNewComment() {
        hideAllReplyEls()
        toggleRepliesVisibility(id)
        toggleNewComment(false)
    }

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
                    <div onClick={upvotePlus} ><img src="././dist/images/icon-plus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                    <span className="text-blue-900 font-bold text-sm ">{upvoteCount}</span>
                    <div onClick={upvoteMinus}><img src="././dist/images/icon-minus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="flex gap-4 items-center mb-4">
                        <img src={imgSrc} className="w-8" />
                        <span className="font-bold">{user.username}</span>
                        {user.username === username && <span className="bg-blue-800 text-white py-0.5 px-2 text-sm font-semibold rounded-md">you</span>}
                        <span className="text-gray-400 font-semibold">{createdAt}</span>
                    </div>
                    {editMode ? <div className="flex flex-col"><textarea ref={ref} rows="3" value={commentText} onChange={(e) => handleChange(e)} className="border-2 py-3 px-4 focus:outline-0 focus:border-violet-300 border-gray-100 rounded-xl resize-none"></textarea><div className="flex gap-4 mt-4 justify-end"><div onClick={cancel}><CancelBtn /></div><div className="" onClick={handleSubmit}><RegularBtn >Update</RegularBtn></div></div></div> : <p className="text-gray-500 break-words" >{commentText}</p>}
                    <div className="flex justify-between items-center mt-4">
                        <div className="bg-gray-100 flex justify-center md:hidden items-center rounded-lg gap-3 w-24 h-10">
                            <div onClick={upvotePlus}> <img src="././dist/images/icon-plus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                            <span className="text-blue-900 font-bold text-sm">{upvoteCount}</span>
                            <div onClick={upvoteMinus}> <img src="././dist//images/icon-minus.svg" className="w-3.5 p-0.5 cursor-pointer" /></div>
                        </div>
                        <div className="flex gap-4">
                            {user.username !== username && <div onClick={openReplyAndHideNewComment}><ReplyBtn /></div>}
                            {user.username === username && <div onClick={() => changeId(id)}><DeleteBtnComment toggleCommentModal={toggleCommentModal} comment_id={id} /></div>}
                            {user.username === username && <div onClick={editComment}><EditBtn /></div>}
                        </div>
                    </div>
                </div >
            </div >
            <div className="flex flex-col w-11/12 items-end max-w-comment border-gray-300">
                {replyEls}
            </div>
            {checkIfVisible(id) && <ReplyEl username={user.username} reply_id={id} hideAllReplyEls={hideAllReplyEls} replyTo={user.username} />}
            {isCommentModalVisible && (<DeleteModal comment_id={currentId} />)}
        </>

    )
}
