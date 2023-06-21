import React, { useState, useContext } from 'react'
import { Context } from './Context'
import Comment from './components/Comment'
import NewComment from './components/NewComment'
import BlackBg from './components/BlackBg'

function clearLocalStorage() {
  localStorage.clear()
  window.location.reload()
}



function App() {

  const { commentsData, username, isReplyModalVisible, isCommentModalVisible, isNewCommentVisible } = useContext(Context)

  const commentEls = commentsData.map((comment, idx) => {
    return <Comment key={comment.id} id={comment.id} content={comment.content} user={comment.user} createdAt={comment.createdAt} score={comment.score} replies={comment.replies} />
  })

  return (

    <>
      <div className="min-h-screen py-8 bg-gray-200 flex items-center flex-col">
        {commentEls}
        {isNewCommentVisible && <NewComment />}
      </div>
      {(isReplyModalVisible || isCommentModalVisible) && <BlackBg />}
      <button onClick={clearLocalStorage} className="fixed top-4 right-4 z-10 bg-blue-400 p-4 rounded-xl hover:bg-blue-300 transition-all duration-200 text-white font-semibold">Clear Local Storage</button>
    </>

  )
}

export default App
