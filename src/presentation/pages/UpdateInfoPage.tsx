import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { changeInfo, getInfo } from "../../data/api/auth";

export function UpdateInfoPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const [name, setName] = useState<string>(location.state?.name ?? "")
    const [email, setEmail] = useState<string>(location.state?.email ?? "")

    const handleUpdateSubmit = async () => {
        try {
            await changeInfo({ name, email })
            alert("성공적으로 변경되었습니다.")
            navigate("/mypage")
        }
        catch (error) {
            alert((error as Error).message)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column', gap: '16px', padding: '24px' }} >
            <h2>내 정보 변경 페이지</h2>
            <input value={email} placeholder="이메일" onChange={(e) => { setEmail(e.target.value) }} style={{
                width: '100%',
                maxWidth: '600px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
            }}></input>
            <input value={name} placeholder="이름" onChange={(e) => { setName(e.target.value) }} style={{
                width: '100%',
                maxWidth: '600px',

                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
            }}></input>
            <button onClick={handleUpdateSubmit} style={{
                width: '100%',
                maxWidth: '600px',

                padding: '14px 0',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)'
            }}>제출하기</button>


        </div>
    )

}