import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { Event } from "@/types/event";
import { eventService } from "@/services/event";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Alert } from "react-native";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { VStack } from "@/components/VStack";
import DateTimePicker from "@/components/DateTimePicker";
import { useFocusEffect } from "@react-navigation/native";


export default function EventDetailScreen() {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [eventData, setEventData] = useState<Event | null>(null)

    function updateField(field: keyof Event, value: string | Date) {
        setEventData(prev => ({
            ...prev!,
            [field]: value
        }))
    }

    const onDelete = useCallback(() => {
        if( !eventData ) return
        try {
            Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
                {text: "Cancel"},
                {
                    text: "Delete", onPress: async() => {
                        await eventService.deleteOne(eventData.id)
                        router.back()
                    }
                }
            ])
        } catch (error) {
            Alert.alert("Error", "Failed to delete event")
        }

    }, [eventData, id])

    async function onSubmitChanges() {
        if (!eventData) return
        try {
            setIsSubmitting(true)
            await eventService.updateOne(eventData.id, eventData.name, eventData.location, eventData.date)
            router.back()
        } catch (error) {
            Alert.alert("Error", "Failed to fetch event")
        }finally{
            setIsSubmitting(false)
        }
    }

    const fetchEvents = async() => {
        try {
            const respone = await eventService.getOne(Number(id))
            setEventData(respone.data)
        } catch (error) {
            router.back()
        }
    }

    useFocusEffect(useCallback(() => {fetchEvents()}, []))

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => headerRight(onDelete)
        })
    }, [navigation, onDelete])

        return ( 
            <VStack m={20} flex={1} gap={30}>
                <VStack gap={5}>
                    <Text ml={10} fontSize={14} color="gray">Name</Text>
                    <Input
                        value={eventData?.name}
                        onChangeText={(value) => updateField("name", value)}
                        placeholder="Enter Name"
                        placeholderTextColor="darkgray"
                        h={48}
                        p={14}
                    />
                </VStack>
                <VStack gap={5}>
                    <Text ml={10} fontSize={14} color="gray">Location</Text>
                    <Input
                        value={eventData?.location}
                        onChangeText={(value) => updateField("location", value)}
                        placeholder="Enter Location"
                        placeholderTextColor="darkgray"
                        mb={20}
                        h={48}
                        p={14}
                    />
    
                    <VStack gap={5}>
                        <Text ml={10} fontSize={14} color="gray">Date</Text>
                        <DateTimePicker 
                            onChange={(date) => updateField("date", date || new Date())}
                            currentDate={new Date(eventData?.date || new Date())}
                        />
                    </VStack>
    
                    <Button  
                        mt={330}
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                        onPress={onSubmitChanges}
                    >
                        Save Changes
                    </Button>
    
                </VStack>
            </VStack>
        )
}

const headerRight = (onPress: VoidFunction) => {
    return <TabBarIcon size={30} name="trash" onPress={onPress}/>
}