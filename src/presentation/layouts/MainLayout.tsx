import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BottomNav } from "../components/BottomNav";

export function MainLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("accessToken")

        if (!token) {
            alert("로그인이 필요합니다.")
            navigate('/login')
        }
    }, [navigate])


    return (
        <div style={{ minHeight: '100vh', paddingBottom: '60px', background: '#f5f5f5' }}>
            <Outlet />
            <BottomNav />
        </div>
    )
}