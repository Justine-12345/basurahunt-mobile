import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// import Profile from "../screens/user/profile/profile";
import Profile from "../screens/user/profile/profile";
import ProfileNav from "./profileNav";
import UserReportsList from "../screens/user/profile/user-reports-list";
import UserDonationsList from "../screens/user/profile/user-donations-list";
import UserClaimedDonationsList from "../screens/user/profile/user-claimed-donations-list";
import PublicReportsView from "../screens/home/reports/public-reports-view";
import MyReports from "./myreports";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#1E5128"
                }
            }}
        >
            <Tab.Screen
                name="ProfileNav"
                component={ProfileNav}
                options={{
                    title: "Profile"
                }}
            />

            {/* <Tab.Screen
                name="GProfile"
                component={GProfile}
                options={{
                    title: "GProfile"
                }}
            /> */}

            <Tab.Screen
                name="MyReports"
                component={MyReports}
                options={{
                    title: "Reports"
                }}

                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        // Do something with the `navigation` object
                        navigation.navigate('UserReportsList');
                        
                    },
                })}
            />
            <Tab.Screen
                name="UserDonationsList"
                component={UserDonationsList}
                options={{
                    title: "Donated Items"
                }}
            />
            <Tab.Screen
                name="UserClaimedDonationsList"
                component={UserClaimedDonationsList}
                options={{
                    title: "Claimed Items"
                }}
            />

        </Tab.Navigator>
    )
}

export default function UserNav() {
    return <MyTabs />
}