import { useEffect, useState } from "react"
import type { GetChattingRoomResponse, GetChattingRoomsResponse } from "../../domain/models/auth"
import { getMyChattingRooms } from "../../data/api/auth"
import { useNavigate } from "react-router-dom"

export function ChattingPage() {
    const [chattingRooms, setChattingRooms] = useState<GetChattingRoomResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const loadChattingRooms = async () => {
        try {
            const data = await getMyChattingRooms()
            setChattingRooms(prev => [
                ...data.chattingRooms
            ])
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadChattingRooms()
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 16px",
            minHeight: "100vh",
            background: "#f5f5f5"
        }}>
            <div style={{ display:"flex",flexDirection:"column", marginBottom: "16px", alignItems: "center" }}>
                <h2 style={{ margin: "0", fontSize: "22px", fontWeight: "bold", color: "#1f2937" }}>
                    채팅
                </h2>
            </div>
            <div style={{
                width: "100%",
                maxWidth: "480px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                {isLoading ? (
                    <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                        채팅방을 불러오는 중...
                    </div>
                ) : chattingRooms.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        background: "white",
                        borderRadius: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}>
                        <p style={{ fontSize: "36px", margin: "0 0 12px 0" }}>📭</p>
                        <p style={{ color: "#6b7280", margin: "0", fontSize: "15px" }}>
                            아직 참여 중인 채팅방이 없습니다.
                        </p>
                    </div>
                ) : (
                    chattingRooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={() => navigate(`/chats/${room.id}`, {state:room})}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                background: "white",
                                padding: "14px 16px",
                                borderRadius: "14px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                cursor: "pointer",
                                transition: "transform 0.1s ease, box-shadow 0.1s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)"
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.09)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)"
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"
                            }}
                        >

                            <div style={{
                                width: "46px",
                                height: "46px",
                                borderRadius: "50%",
                                background: "#e0e7ff",
                                color: "#4f46e5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "18px",
                                flexShrink: 0
                            }}>
                                {room.partnerName ? String(room.partnerName).charAt(0) : "👤"}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "4px"
                                }}>
                                    <span style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: "#111827",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        {String(room.partnerName)}
                                    </span>
                                    <span style={{ fontSize: "12px", color: "#9ca3af", flexShrink: 0, marginLeft: "8px" }}>
                                        {(room.lastMessageCreatedAt || room.createdAt).slice(0,19)}
                                    </span>
                                </div>
                                <p style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: room.lastMessage ? "#4b5563" : "#9ca3af",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                    {room.lastMessage || "대화 내용이 없습니다."}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}