import { useState, useEffect, useCallback } from "react"
import { Event } from "@/types/event"
import { Alert, FlatList, TouchableOpacity } from "react-native"
import { eventService } from "@/services/event"
import { VStack } from "@/components/VStack"
import { HStack } from "@/components/HStack"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { UserRole } from "@/types/user"
import { router } from "expo-router"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Divider } from "@/components/Divider"
import { Button } from "@/components/Button"
import { useNavigation } from "@react-navigation/native"
import { useFocusEffect } from "@react-navigation/native"


export default function EventsScreen() {
    const {user} = useAuth()
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState<Event[]>([])

    const buyTicket = (id: number) => {
        try {
            //await ticketService.createOne(id)
            Alert.alert("Success", "Ticket Purchased Successfully")  
        } catch (error) {
            Alert.alert("Error", "Failed to buy ticket")  
        }
    }

    const onGoToEventPage = (id: number) => {
        if (user?.role === UserRole.Manager) {
            router.push(`/(authed)/(tabs)/(events)/event/${id}`)
        }
    }

    const fetchEvents = async () => {
        try {
            setIsLoading(true)

            const response = await eventService.getAll()
            setEvents(response.data)

        } catch (error){
            Alert.alert("Error", "Failed to fetch events")
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {fetchEvents()}, []))

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Events",
            headerRight: user?.role === UserRole.Manager ? headerRight: null
        })
    }, [navigation, user])

    return (
        <VStack flex={1} p={20} pb={0} gap={20} >
            <HStack alignItems="center" justifyContent="center">
                <Text fontSize={18} bold>{events.length} Events</Text>
            </HStack>

            <FlatList 
                data={events}
                keyExtractor={({id}) => id.toString()}
                onRefresh={fetchEvents}
                refreshing={isLoading}
                ItemSeparatorComponent={() => <VStack h={20} />}
                renderItem={({item: event }) => (
                    <VStack
                        p = {20}
                        mb={10}
                        style = {{
                            backgroundColor: "white",
                            borderRadius: 20,
                        }}
                        key={event.id}
                    >
                        <TouchableOpacity onPress={() => onGoToEventPage(event.id)}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <HStack p={10} alignItems="center">
                                    <Text fontSize={22} bold>{event.name}</Text>
                                    <Text fontSize={25} bold> | </Text>
                                    <Text fontSize={15} bold color="back">{event.location}</Text>
                                </HStack>
                                {user?.role === UserRole.Manager && <TabBarIcon size={24} name="arrow-circle-o-right" />}
                            </HStack>

                            <Divider />

                            <HStack justifyContent="space-between" pt={15}>
                                <Text bold fontSize={16} color="gray">Sold: {event.totalTicketsPurchased}</Text>
                                <Text bold fontSize={16} color="green">Entered: {event.totalTicketsPurchased}</Text>
                            </HStack>

                            {user?.role === UserRole.Attendee && ( 
                                <VStack py={15}>
                                    <Button 
                                        variant="contained"
                                        disabled={isLoading}
                                        onPress={ () => buyTicket(event.id) } 
                                    >
                                        Buy Ticket
                                    </Button>
                                </VStack>
                            )}

                            <Text fontSize={13} color="gray">{event.date}</Text>

                        </TouchableOpacity>

                    </VStack>
                )}
            />

        </VStack>
    )
}

const headerRight = () => {
    return (
        <TabBarIcon 
            size={28} 
            name="plus-circle"
            onPress={ () => router.push("/(authed)/(tabs)/(events)/new") }
        />
    )
}