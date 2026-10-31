import type { GetCommentResponse, getPostResponse, getPostsResponse, LoginRequest, LoginResponse, postLikeResponse, PostRequest, SignUpRequest } from "../types/auth";

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

export const togglePostLike = async (postId: number): Promise<postLikeResponse> => {

    const token = localStorage.getItem(`accessToken`)
    const response = await fetch(`/api/posts/${postId}/likes`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {
        return response.json()
    }
    else {
        throw new Error("좋아요 실패")
    }
}

export const createPost = async (data: PostRequest) => {
    const token = localStorage.getItem('accessToken')
    const response = await fetch('/api/posts', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",

        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return
    }
    else {
        throw new Error("게시글 생성 오류")
    }
}

export const getComments = async (postId: number): Promise<GetCommentResponse[]> => {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.ok) {
        return response.json()

    }
    else {
        throw new Error("댓글 받아오기 오류")
    }

}

export const createComment = async (postId: number, comment: string) => {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ comment })
    })
    if (response.ok) {
        return
    }
    else {
        throw new Error("댓글 작성 실패")
    }
}

export const deletePost = async (postId: number) => {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {

    }
    else if (response.status == 403) {
        throw new Error("본인 게시글만 삭제할 수 있습니다.")
    }
    else {
        throw new Error("게시글 삭제 실패")
    }
}

export const updatePost = async (postId: number, data:PostRequest) => {

    const token = localStorage.getItem("accessToken")
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(data)
    })
    if(response.ok){
        return
    }
    else{
        throw new Error("게시글 수정 실패")
    }

}