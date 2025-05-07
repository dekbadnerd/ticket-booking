import { ApiResponse } from "./api"

export type EventResponse = ApiResponse<Event>
export type EventListResponse = ApiResponse<Event[]>

//Event data structure that the backend will return.
export type Event = {
    id: number
    name: string
    location: string
    totalTicketsPurchased: number
    totalTicketsEntered: number
    date: string
    createdAt: string
    updatedAt: string   
}