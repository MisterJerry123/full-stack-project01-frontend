import { useEffect, useRef, useState } from "react"
import { type getPostResponse } from "../types/auth"
import { useNavigate } from "react-router-dom"
import { getPosts } from "../api/auth"

export function PostPage() {
    const [posts, setPosts] = useState<getPostResponse[]>([])

    const [page, setPage] = useState<number>(0)
    const [hasMorePage, setHasMorePage] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const observerRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    const loadPost = async () => {
        if (isLoading || !hasMorePage) {
            return
        }
        setIsLoading(true)
        try {
            const data = await getPosts(page)
            setPosts(prev => [
                ...prev,
                ...data.posts
            ])
            setPage(prev => prev + 1)
            if (page + 1 >= data.totalPages) {
                setHasMorePage(false)
            }
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadPost()
            }
        })
        if (observerRef.current) {
            observer.observe(observerRef.current)
        }
        return () => observer.disconnect()
    }, [hasMorePage, isLoading, page])

    // useEffect(() => {
    //     getPosts(0)
    //         .then((data) => {
    //             setPosts(data.posts)
    //         })
    //         .catch((error) => {
    //             alert((error as Error).message)
    //             if (!localStorage.getItem('accessToken')) {
    //                 navigate('/login')
    //             }
    //         })
    // }, [])

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '16px', alignItems: 'center', padding: '24px', background: '#f5f5f5' }}>
            <h2>게시글 화면</h2>

            {posts.map((post) => (
                <div key={post.id}
                    onClick={() => navigate(`/posts/${post.id}`, { state: post })}
                    style={{
                        width: '100%',
                        maxWidth: '480px',
                        background: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}

                >
                    <h3 style={{ margin: '0 0 8px 0' }}>{post.title}</h3>
                    <p style={{ margin: '0 0 12px 0', color: '#444' }}>{post.content}</p>
                    <small style={{ color: '#888' }}>
                        {post.isLiked ? '❤️' : '🤍'} {post.totalLikes}개 | 💬 {post.totalComments}개 | {post.authorName}
                    </small>
                </div>
            ))}
            <div ref={observerRef} style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 0 60px 0',
                minHeight: '60px'
            }}>
                {isLoading && <div className="spinner" />}
                {!hasMorePage && posts.length > 0 && (
                    <span style={{ color: '#9ca3af', fontSize: '14px' }}>모든 게시글을 다 읽었습니다</span>
                )}
            </div>

            <button
                onClick={() => {
                    navigate("/posts/create")

                }}
                style={{
                    position: "fixed",
                    bottom: "84px",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#3b82f6",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                    cursor: 'pointer'
                }}
            >
                ✏️ 글쓰기
            </button>

        </div>


    )
}