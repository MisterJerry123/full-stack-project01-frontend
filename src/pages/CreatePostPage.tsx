import { Form, useNavigate } from "react-router-dom"
import { createPost } from "../api/auth"
import { useState } from "react"
import type { PostRequest } from "../types/auth"

export function CreatePostPage() {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')


    const navigate = useNavigate()

    const handleSubmit = async () => {

        try {
            const request: PostRequest = {
                title: title,
                content: content,
                imageUrl: imageUrl
            }
            const response = await createPost(request)
            navigate("/posts")

        } catch (error) {

        }

    }



    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                padding: "24px",
                background: "#f5f5f5"
            }}>

                <form style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                    maxWidth: "600px",
                    flex: "1",
                }}>
                    <h2 style={{ textAlign: "center" }}>게시글 작성</h2>
                    <input 
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                    }} placeholder="제목을 입력하세요."></input>

                    <textarea 
                    value={content}
                    onChange={(e)=>{
                        setContent(e.target.value)
                    }}
                    style={{
                        minHeight: "200px",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        resize: "vertical",
                        flex: "1"
                    }} placeholder="내용을 입력하세요.">

                    </textarea>

                    <button type="button" style={{
                        padding: "14px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#3b82f6",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                    onClick={handleSubmit}
                    >제출하기</button>
                </form>

            </div>
        </div>
    )

}
