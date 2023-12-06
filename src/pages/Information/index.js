import React from 'react';
import { Text, View } from 'react-native';

export default function Information({route}) {

    return (
        <View>
            <View style={{ marginTop: 30, backgroundColor: "#ddd", borderRadius: 20, padding: 20, }}>
                <Text>Nome: {route.params?.nome}</Text>
                <Text>Telefone: {route.params?.telefone}</Text>
                <Text>Endereço: {route.params?.endereco}</Text>
                <Text>Profissão: {route.params?.profissao}</Text>
                <Text>Email: {route.params?.email}</Text>
            </View>
        </View>
    );
}