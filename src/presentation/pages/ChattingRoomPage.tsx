import { useEffect, useRef, useState } from "react"
import type { GetChatResponse, GetChattingRoomResponse } from "../../domain/models/auth"
import { Client } from "@stomp/stompjs"
import { useLocation } from "react-router-dom"

export function ChattingRoomPage() {
    const location = useLocation()

    const [content, setContent] = useState<string>("")
    const [chats, setChats] = useState<GetChatResponse[]>([])
    const [chattingRoom, setChattingRoom] = useState<GetChattingRoomResponse>(location.state)
    const clientRef = useRef<Client | null>(null)


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
                        const payload = JSON.parse(message.body)
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
            <div>
                <input value={content} onChange={(e) => { setContent(e.target.value) }}></input>
                <button onClick={() => {
                    clientRef.current?.publish({
                        destination: '/pub/message', body: JSON.stringify({
                            chattingRoomId: chattingRoom.id,
                            content
                        })
                    })
                }}>전송</button>
            </div>
        </div>
    )
}