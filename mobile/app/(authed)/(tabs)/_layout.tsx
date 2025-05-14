import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { ComponentProps } from 'react';
import { UserRole } from '@/types/user';
import { useAuth } from '@/context/AuthContext';


export default function TabLayout() {
    // Get info from context (used to check role)
    const {user} = useAuth()
    const tabs = [
        {
            showFor: [UserRole.Attendee, UserRole.Manager],
            name: "(events)",
            displayName: "Events",
            icon: "calendar",
            options: {
                headerShown: false
            }
        },
        {
            showFor: [UserRole.Attendee],
            name: "(tickets)",
            displayName: "My Tickets",
            icon: "ticket",
            options: {
                headerShown: false
            }
        },
        {
            showFor: [UserRole.Manager],
            name: "scan-ticket",
            displayName: "Scan Ticket",
            icon: "qrcode",
            options: {
                headerShown: true
            }
        },
        {
            showFor: [UserRole.Attendee, UserRole.Manager],
            name: "settings",
            displayName: "Settings",
            icon: "cogs",
            options: {
                headerShown: true
            }
        }
    ]

    return (
        <Tabs>
            { tabs.map(tab => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        ...tab.options,
                        headerTitle: tab.displayName,
                        href: tab.showFor.includes(user?.role!) ? tab.name as any : null,
                        tabBarLabel: ({focused}) => (
                            <Text style= {{color: focused ? "black" : "gray", fontSize: 12}}>
                                {tab.displayName}
                            </Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon 
                                name = {tab.icon as ComponentProps<typeof FontAwesome> ["name"]}
                                color={focused ? "black" : "gray"}
                            />
                        )
                    }}
                />
            ))}
        </Tabs>
    )
}