export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

export interface SignUpRequest {
  email: string
  password: string
  name: string
}
export interface getPostResponse {
  id: number
  title: string
  content: string
  authorName: string
  createdAt: string
  updatedAt: string
  imageUrl?: string | null
  totalLikes: number
  isLiked: boolean
}

export interface getPostsResponse {
  posts: getPostResponse[]
  totalPages: number
  totalElements: number
  currentPage: number
}

export interface postLikeResponse {
  status: boolean
  totalLikes: number
}

export interface PostRequest {
  title: string
  content: string | null,
  imageUrl: string | null
}
