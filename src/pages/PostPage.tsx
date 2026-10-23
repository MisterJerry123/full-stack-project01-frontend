import { useEffect, useState } from "react"
import { type getPostResponse } from "../types/auth"
import { useNavigate } from "react-router-dom"
import { getPost, getPosts } from "../api/auth"

export function PostPage() {
    const [posts, setPosts] = useState<getPostResponse[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getPosts(0)
            .then((data) => {
                setPosts(data.posts)
            })
            .catch((error) => {
                alert((error as Error).message)
            })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '16px', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',padding:'24px', background: '#f5f5f5' }}>
            <h2>게시글 화면</h2>

          {posts.map((post, index) => (
                <div key={index} style={{
                    width: '100%',
                    maxWidth: '480px',
                    background: 'white',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>{post.title}</h3>
                    <p style={{ margin: '0 0 12px 0', color: '#444' }}>{post.content}</p>
                    <small style={{ color: '#888' }}>
                        작성자: {post.authorName} | {post.isLiked ? '❤️' : '🤍'} {post.totalLikes}
                    </small>
                </div>
            ))}
        </div>


    )
}