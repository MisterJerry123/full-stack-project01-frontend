import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { getPostResponse } from "../types/auth";
import { getPost, togglePostLike } from "../api/auth";

export function PostDetailPage() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [post, setPost] = useState<getPostResponse | null>(location.state)

    const handlePostLike = async () => {
        try {
            const data = await togglePostLike(Number(postId))
            if (post) {
                setPost({
                    ...post,
                    isLiked: data.status,
                    totalLikes: data.totalLikes
                })
            }
        } catch (error) {
            alert((error as Error).message)
        }
    }

    useEffect(() => {
        getPost(Number(postId))
            .then((data) => setPost(data))
            .catch((error) => {
                throw new Error("에러 발생")
            })
    }, [postId])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            padding: "24px",
            background: "#f5f5f5"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "600px",
                background: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>

                <button
                    onClick={() => navigate("/posts")}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#3b82f6",
                        cursor: "pointer",
                        marginBottom: "16px",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                >목록으로 돌아가기
                </button>

                <div style={{
                    borderBottom: "1px solid #eee",
                    paddingBottom: "16px",
                    marginBottom: "20px",
                }}>
                    <h2 style={{
                        margin: "0 0 8px 0",
                        fontSize: "22px"
                    }}>{post?.title}</h2>
                    <small>작성자:{post?.authorName} | 작성일: {(post?.createdAt)?.slice(0, 10)}</small>
                </div>
                <p style={{
                    minHeight: "160px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                    color: "#333"
                }}>
                    {post?.content}
                </p>

                <div style={{
                    borderTop: "1px solid #eee",
                    paddingTop: "16px",
                    marginTop: "20px",
                    cursor: "pointer"
                }}>
                    <span onClick={handlePostLike}>{post?.isLiked ? '❤️' : '🤍'} 좋아요 {post?.totalLikes}개 </span>
                </div>
            </div>
        </div>



    )


}