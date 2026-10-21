import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";

export function SignUpPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if (password != rePassword) {
            alert("두 비밀번호가 다릅니다.")
            return
        }
        try {
            await signUp({ email, name, password })

            alert("회원가입 성공")
            navigate('/login')
        } catch (error) {
            alert((error as Error).message)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>


            <form onSubmit={handleSubmit} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', width: '320px', gap: '10px', padding: '24px', background: 'white', borderRadius: '12px', textAlign: 'center' }}>
                <h2>회원가입</h2>
                <input type='text' placeholder="이름을 입력해주세요" onChange={(e) => setName(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                <input type='email' placeholder="이메일을 입력해주세요" onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                <input type='password' placeholder="비밀번호를 입력해주세요" onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                <input type='password' placeholder="비밀번호를 다시 입력해주세요" onChange={(e) => setRePassword(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                <button type='submit' style={{ padding: '12px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                    회원가입
                </button>
                <div>
                    <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                        로그인으로 돌아가기
                    </Link>
                </div>
            </form>
        </div>
    )
}