import { useNavigate } from "react-router-dom"

export function MyInfoPage() {

    const navigate = useNavigate()

    const handleLogout = () => {
        if (!window.confirm("로그아웃 하시겠습니까?")) {
            return
        }
        localStorage.removeItem("accessToken")
        navigate("/login", { replace: true })

    }

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '16px', alignItems: 'center', padding: '24px', background: '#f5f5f5' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>마이페이지</h2>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    )
}