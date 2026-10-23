import type { getPostResponse, getPostsResponse, LoginRequest, LoginResponse, SignUpRequest } from "../types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        return response.json()
    }
    else {
        throw new Error("로그인 실패: 아이디 비번을 확인하세요.")
    }
}

export const signUp = async (data: SignUpRequest) => {
    const response = await fetch('/api/users/signUp', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        return
    }
    else {
        throw new Error("회원가입 실패")
    }
}

export const home = async () => {
    const response = await fetch('/health', {
        method: 'GET',
    })
    if (response.ok) {
        return
    }
    else {
        throw new Error("페이지 이동 실패")
    }

}

export const getPost = async (postId: number): Promise<getPostResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.ok) {
        return response.json()
    }
    else {
        throw new Error("getPost 실패")
    }
}

export const getPosts = async (page: number): Promise<getPostsResponse> => {
    const token = localStorage.getItem(`accessToken`)
    if (!token) {
        localStorage.removeItem('accessToken')
        throw new Error("로그인이 필요합니다!")
    }
    const response = await fetch(`/api/posts?page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.ok) {
        return response.json()
    }
    else if (response.status == 401) {
        localStorage.removeItem('accessToken')
        throw new Error("로그인이 필요합니다!")
    }
    else {
        throw new Error(`서버 통신 실패 (상태 코드: ${response.status})`)
    }
}