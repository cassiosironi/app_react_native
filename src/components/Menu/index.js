import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts from '../../pages/Contacts/';
import Information from '../../pages/Information/';
import Assessment from '../../pages/Assessment/';
import TabNavigation from '../../pages/TabNavigation/';
import { FontAwesome } from '@expo/vector-icons'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const CustomHeader = ({ navigation, route }) => {
    const isTabNavigation = route?.name === 'TabNavigation';

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
            {!isTabNavigation && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text> <FontAwesome name="arrow-left" /> Voltar</Text>
                </TouchableOpacity>
            )}
            <Text>{isTabNavigation ? 'O melhor aplicativo para controle de peso.' : 'Informações'}</Text>
            <View style={{ width: 50 }} />
        </View>
    );
};


function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Calculadora IMC" component={TabNavigation} options={{
                tabBarIcon: ({ size }) => (
                    <FontAwesome name="male" color={'red'} size={size} />
                ),
            }} />
            <Tab.Screen name="Contatos" component={Contacts} options={{
                tabBarIcon: ({ size }) => (
                    <FontAwesome name="users" color={'red'} size={size} />
                ),
            }} />
            <Tab.Screen name="Avaliação" component={Assessment} options={{
                tabBarIcon: ({ size }) => (
                    <FontAwesome name="camera" color={'red'} size={size} />
                ),
            }} />
        </Tab.Navigator>
    )
}

export default function Menu() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TabNavigation"
                    component={Tabs}
                    options={({ route, navigation }) => ({
                        header: (props) => <CustomHeader {...props} navigation={navigation} route={route} />,
                    })}
                />
                <Stack.Screen
                    name="Information"
                    component={Information}
                    options={({ route, navigation }) => ({
                        header: (props) => {
                            if (route.name === 'O melhor aplicativo para controle de peso.') {
                                return null; // Retorna null para ocultar o cabeçalho
                            }
                            return <CustomHeader {...props} navigation={navigation} route={route} />;
                        },
                    })}
                />
                 <Stack.Screen
                    name="Assessment"
                    component={Assessment}
                    options={({ route, navigation }) => ({
                        header: (props) => {
                            if (route.name === 'Avaliação') {
                                return null; // Retorna null para ocultar o cabeçalho
                            }
                            return <CustomHeader {...props} navigation={navigation} route={route} />;
                        },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
