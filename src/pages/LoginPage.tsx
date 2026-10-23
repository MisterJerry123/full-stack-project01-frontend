import { useState } from "react"
import { login } from "../api/auth"
import { Link, useNavigate } from "react-router-dom"

export function LoginPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const data = await login({ email, password })
            localStorage.setItem("accessToken", data.accessToken)
            alert("로그인 성공!")
            navigate('/posts')
        } catch (error) {
            alert((error as Error).message)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: "320px", padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>로그인</h2>
                <input type="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} style={{  padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} required />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
                    required
                />

                <button
                    type="submit"
                    style={{ padding: '12px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    로그인
                </button>
                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px' }}>
                    계정이 없으신가요?{' '}
                    <Link to='/signUp' style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                        회원가입
                    </Link>
                </div>
            </form>
        </div>
    )
}
