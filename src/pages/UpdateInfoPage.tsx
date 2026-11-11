import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { changeInfo } from "../api/auth"

export function UpdateInfoPage() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const navigate = useNavigate()
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
            <input placeholder="이메일" onChange={(e) => { setEmail(e.target.value) }}></input>
            <input placeholder="이름" onChange={(e) => { setName(e.target.value) }}></input>
            <button onClick={handleUpdateSubmit}>제출하기</button>


        </div>
    )

}