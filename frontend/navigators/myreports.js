import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserReportsList from "../screens/user/profile/user-reports-list";
import PublicReportsView from "../screens/home/reports/public-reports-view";
import PublicReportsUpdate from "../screens/home/reports/public-reports-update";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserReportsList"
                component={UserReportsList}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="MyPublicReportsView"
                component={PublicReportsView}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="MyPublicReportsUpdate"
                component={PublicReportsUpdate}
                options={{
                    headerShown:false
                }}
            />
           
        </Stack.Navigator>
    )
}

export default function MyReports() {
    return <MyStack/>;
}