import { useLocation, useNavigate } from "react-router-dom";

export function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'white',
            borderTop: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <button onClick={() => { navigate("/posts") }}
                style={{
                    flex: 1,
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: location.pathname.startsWith('/posts') ? '#3b82f6' : '#888'
                }}
            >
                🏠 게시판
            </button>
            <button onClick={() => { navigate("/mypage") }}
                style={{
                    flex: 1,
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: location.pathname.startsWith('/mypage') ? '#3b82f6' : '#888'
                }}
            >
                👤 마이페이지
            </button>
        </nav>
    )
}