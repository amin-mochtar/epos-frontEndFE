import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EposRealmProvider } from "../database"
import _EposNavigation from "./epos.navigation";
import _EposDoksulNavigation from "./doksul/doksul.navigation";
import { EposRoutes } from "./epos.navigation.type";
import { EposDoksulRoutes } from "./doksul/doksul.navigation.type";
import { CommonDataProvider } from 'plai_common_frontend';

const Stack = createStackNavigator();

const _EposCombinedNavigation = () => {
    return (
        <CommonDataProvider>
            <EposRealmProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                    headerMode="none"
                >
                    <Stack.Screen name={EposRoutes.NEW_BUSINESS} component={_EposNavigation} />
                    <Stack.Screen name={EposDoksulRoutes.EPOSDOKSUL} component={_EposDoksulNavigation} />
                </Stack.Navigator>
            </EposRealmProvider>
        </CommonDataProvider>
    )
}

export const EposNavigation = [{ name: 'EPOS', component: _EposCombinedNavigation, options: { gestureEnabled: false, swipeEnabled: false } }]