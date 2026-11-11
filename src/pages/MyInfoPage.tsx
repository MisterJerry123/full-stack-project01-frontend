import { useNavigate } from "react-router-dom"
import { getInfo } from "../api/auth"
import { useEffect, useState } from "react"

export function MyInfoPage() {

    const navigate = useNavigate()
    const [id, setId] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")


    const handleLogout = () => {
        if (!window.confirm("로그아웃 하시겠습니까?")) {
            return
        }
        localStorage.removeItem("accessToken")
        navigate("/login", { replace: true })

    }

    const handleMyInfo = async () => {
        const token = localStorage.getItem("accessToken")
        try {
            const result = await getInfo()
            setId(result.id)
            setName(result.name)
            setEmail(result.email)

        } catch (error) {
            alert((error as Error).message)
        }
    }

    useEffect(() => {
        handleMyInfo()
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            padding: '24px 16px',
            gap: '16px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                background: 'white',
                borderRadius: '16px',
                padding: '28px 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#eff6ff',
                    color: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    marginBottom: '16px',
                    boxShadow: 'inset 0 0 0 2px #dbeafe'
                }}>
                    👤
                </div>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 'bold' }}>
                    {name || "사용자"}
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    {email}
                </p>
            </div>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                background: 'white',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '15px'
                }}>
                    <span style={{ color: '#6b7280' }}>회원 번호</span>
                    <span style={{ fontWeight: '600' }}>#{id}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '15px'
                }}>
                    <span style={{ color: '#6b7280' }}>가입 계정</span>
                    <span style={{ fontWeight: '500' }}>{email}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    fontSize: '15px'
                }}>
                    <span style={{ color: '#6b7280' }}>앱 버전</span>
                    <span style={{ color: '#9ca3af' }}>v1.0.0</span>
                </div>
            </div>
            <div style={{ width: '100%', maxWidth: '480px' }}>
                <button
                    onClick={() => navigate("/mypage/edit", { state: { email, name } })}
                    style={{
                        width: '100%',
                        padding: '14px 0',
                        marginBottom: '20px',
                        background: '#f3f2fe',
                        color: '#4463ef',
                        border: '1px solid #cad3fe',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    🚪 내 정보 변경
                </button>

                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        padding: '14px 0',
                        background: '#fef2f2',
                        color: '#ef4444',
                        border: '1px solid #fecaca',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    🚪 로그아웃
                </button>
            </div>
        </div>
    )
}