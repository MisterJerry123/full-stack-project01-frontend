import type { LoginRequest, LoginResponse, SignUpRequest } from "../types/auth";

export const login = async(data:LoginRequest): Promise<LoginResponse>=>{
    const response = await fetch('/api/users/login',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(response.ok){
        return response.json()
    }
    else{
        throw new Error("로그인 실패: 아이디 비번을 확인하세요.")
    }
}

export const signUp = async(data:SignUpRequest)=>{
    const response = await fetch('/api/users/signUp', {
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.ok){
        return 
    }
    else{
        throw new Error("회원가입 실패")
    }
}