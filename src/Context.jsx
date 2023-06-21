import React, { Children, createContext, useState, useEffect } from 'react'
import data from '../data.json'

const Context = createContext()

export default function ContextProvider({ children }) {


    const [commentsData, setCommentsData] = useState(() => {
        const dataFromLocalStorage = localStorage.getItem("comments")
        return dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : data.comments
    })


    function getReplyIds() {
        const idsArr = []

        commentsData.forEach(comment => {
            idsArr.push({ id: comment.id, isVisible: false })
            if (comment.replies) {
                comment.replies.forEach(reply => {
                    idsArr.push({ id: reply.id, isVisible: false })
                })
            }
        })

        return idsArr

    }

    const [repliesVisibilityArr, setRepliesVisibilityArr] = useState(getReplyIds)

    function toggleRepliesVisibility(id) {
        setRepliesVisibilityArr(oldArr => {
            return oldArr.map(item => {
                if (item.id === id) {
                    return { ...item, isVisible: !item.isVisible }
                }
                else return item
            })
        })
    }

    function hideAllReplyEls() {
        setRepliesVisibilityArr(getReplyIds)
    }

    function checkIfVisible(id) {

        let isVisible

        repliesVisibilityArr.forEach(item => {
            if (item.id === id) {
                isVisible = item.isVisible
            }
        })

        return isVisible

    }

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(commentsData))
    }, [commentsData])

    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false)
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
    const [isNewCommentVisible, setIsNewCommentVisible] = useState(true)
    const [currentId, setCurrentId] = useState()
    const username = 'juliusomo'

    function generateRandomId() {
        return Math.floor(Math.random() * 100000000)
    }

    function toggleReplyModal(value) {
        setIsReplyModalVisible(value)
    }

    function toggleCommentModal(value) {
        setIsCommentModalVisible(value)
    }

    function toggleNewComment(value) {
        setIsNewCommentVisible(value)
    }


    function addNewComment(msg) {

        const randomId = generateRandomId()

        if (msg) {
            setCommentsData(oldCommentsData => {
                return [...oldCommentsData, { id: randomId, content: msg, createdAt: "just now", replies: [], score: 0, user: { image: { png: './images/avatars/image-juliusomo.png' }, username: 'juliusomo' } }]
            })
        }
    }

    function addNewReply(msg, id) {

        const randomId = generateRandomId()

        if (msg) {
            setCommentsData(oldCommentsData => {
                return oldCommentsData.map(comment => {
                    if (id === comment.id) {
                        return { ...comment, replies: [...comment.replies, { id: randomId, content: msg, createdAt: 'just now', replyingTo: 'test', score: 0, user: { image: { png: './images/avatars/image-juliusomo.png' }, username: 'juliusomo' } }] }
                    }
                    else return comment
                })
            })
        }
    }

    function updateComment(msg, id) {
        setCommentsData(oldCommentsData => {
            return oldCommentsData.map(comment => {
                if (id === comment.id) {
                    return { ...comment, content: msg }
                }
                else return {
                    ...comment, replies: comment.replies.map(reply => {
                        if (id === reply.id) {
                            return { ...reply, content: msg }
                        }
                        else return reply
                    })
                }
            })
        })
    }

    function deleteComment(id) {

        const filteredComments = commentsData.filter(comment => comment.id !== id)


        const finalComments = filteredComments.map(comment => {
            if (comment.replies.length > 0) {
                return {
                    ...comment, replies: comment.replies.filter(reply => reply.id !== id)
                }
            }
            else return comment
        })

        setCommentsData(finalComments)

        toggleReplyModal(false)
        toggleCommentModal(false)
    }

    function changeId(id) {
        setCurrentId(id)
    }

    function checkCommentId(id) {

        let commentId

        commentsData.forEach(comment => {
            comment.replies.forEach(reply => {
                if (reply.id === id) {
                    commentId = comment.id
                }
            })
        })

        return commentId

    }


    return (
        <Context.Provider value={{ commentsData, username, deleteComment, toggleCommentModal, isCommentModalVisible, toggleReplyModal, isReplyModalVisible, addNewComment, currentId, changeId, addNewReply, isNewCommentVisible, toggleNewComment, checkCommentId, repliesVisibilityArr, checkIfVisible, toggleRepliesVisibility, hideAllReplyEls, updateComment }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }