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
        <div>
            <h2>채팅 디테일 페이지</h2>

            {chats.map((chat) => (
                <div key={chat.id}>
                    <strong>{chat.writerName}</strong>
                    <p>{chat.content}</p>
                    <small>{chat.createdAt}</small>
                </div>
            ))}

            <div>
                <input value={content} onChange={(e) => { setContent(e.target.value) }}></input>
                <button onClick={() => {

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
    )
}