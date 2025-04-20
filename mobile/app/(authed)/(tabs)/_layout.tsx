import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { ComponentProps } from 'react';


export default function TabLayout() {
    const tabs = [
        {
            showFor: [],
            name: "(events)",
            displayName: "Events",
            icon: "calendar",
            options: {
                headerShown: false
            }
        },
        {
            showFor: [],
            name: "(tickets)",
            displayName: "My Tickets",
            icon: "ticket",
            options: {
                headerShown: false
            }
        },
        {
            showFor: [],
            name: "scan-ticket",
            displayName: "Scan Ticket",
            icon: "qrcode",
            options: {
                headerShown: true
            }
        },
        {
            showFor: [],
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
                        // href: tab.showFor.includes()
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