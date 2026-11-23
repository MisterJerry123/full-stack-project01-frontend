import { useEffect, useRef, useState } from "react"
import type { GetChatResponse, GetChattingRoomResponse } from "../../domain/models/auth"
import { Client } from "@stomp/stompjs"
import { useLocation } from "react-router-dom"
import { pastChats } from "../../data/api/auth"

export function ChattingRoomPage() {
    const location = useLocation()

    const [content, setContent] = useState<string>("")
    const [chats, setChats] = useState<GetChatResponse[]>([])
    const [chattingRoom, setChattingRoom] = useState<GetChattingRoomResponse>(location.state)
    const clientRef = useRef<Client | null>(null)
    const token = localStorage.getItem("accessToken")?.split(".")[1]
    const userId = token ? Number(JSON.parse(atob(token)).sub) : null

    useEffect(() => {
        pastChats(chattingRoom.id)
            .then((data) => setChats(data.chats))
            .catch((error) => alert(error.message))
    }, [chattingRoom.id])

    useEffect(() => {
        const client = new Client({
            brokerURL: 'wss://misterjerry-fullstackproject01.duckdns.org/ws',
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            onWebSocketError: (event) => {
                console.error("WebSocket error", event)
            },
            onWebSocketClose: (event) => {
                console.error("WebSocket closed", event.code, event.reason)
            },
            onStompError: (frame) => {
                console.error("STOMP error", frame.headers["message"], frame.body)
            },


            onConnect: () => {
                const subscription = client.subscribe(
                    `/sub/api/chats/${chattingRoom.id}`,
                    (message) => {
                        const newChat: GetChatResponse = JSON.parse(message.body)
                        setChats((prev) =>
                            prev.some((chat) => chat.id === newChat.id) ? prev : [...prev, newChat]
                        )
                    }
                )
                console.log("connect에 도달")

            }
        })
        clientRef.current = client

        client.activate()

        return () => {
            clientRef.current = null
            client.deactivate()
        }
    }, [chattingRoom.id])





    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "calc(100dvh - 60px)"
        }}>
            <h2>채팅 디테일 페이지</h2>
            <div style={{
                display: "flex",
                maxWidth: "600px",
                width: "100%",
                flex: 1,
                minHeight: 0,
                flexDirection: "column",
                overflowY: "auto"
            }}>

                {chats.map((chat) => (

                    chat.writerId === userId ? (
                        <div style={{
                            alignSelf: "end",
                            textAlign: "end"
                        }} key={chat.id}>
                            <strong>{chat.writerName}</strong>
                            <p>{chat.content}</p>
                            <small>{chat.createdAt.slice(0, 19)}</small>
                        </div>
                    ) : (
                        <div style={{
                            alignSelf: "start",
                            textAlign: "start"
                        }} key={chat.id}>
                            <strong>{chat.writerName}</strong>
                            <p>{chat.content}</p>
                            <small>{chat.createdAt.slice(0, 19)}</small>
                        </div>
                    )

                ))}


            </div>
            <div style={{
                flexShrink: 0,
                width: "100%",
                maxWidth: "600px",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",

                    minHeight: 0,
                    margin: "0 auto",
                }}>
                    <input value={content} style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #d1d5db',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        flex: 1
                    }} placeholder="채팅을 입력해주세요." onChange={(e) => { setContent(e.target.value) }}>
                    </input>
                    <button style={{
                        padding: "12px 18px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#3b82f6",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginLeft: "8px",
                    }} onClick={() => {

                        console.log("send click", clientRef.current?.connected, chattingRoom.id, content.length)

                        if (!(clientRef.current?.connected)) {
                            alert("채팅 서버에 연결 안됨")
                            return
                        }

                        clientRef.current?.publish({
                            destination: '/pub/message', body: JSON.stringify({
                                chattingRoomId: chattingRoom.id,
                                content
                            })
                        })

                        setContent("")
                    }}>전송</button>
                </div>
            </div>
        </div>
    )
}