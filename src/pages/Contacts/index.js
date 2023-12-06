import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'


export default function Contacts({ navigation }) {

    return (
        <View>
            <View style={{ marginTop: 30, backgroundColor: "#ddd", borderRadius: 20, padding: 20, }}>
                <Text>Nome: João Silva</Text>
                <Text>Telefone: (11) 988776655</Text>
                <Text onPress={() => navigation.navigate('Information', {
                    nome: 'João Silva',
                    telefone: '(11) 988776655',
                    endereco: 'Rua teste 123, bairro Tal, CIDADE-UF',
                    profissao: 'Analista Contábil',
                    email: 'joao@email.com'
                }
                )}>Ver mais <FontAwesome name="plus" /></Text>
            </View>
            <View style={{ marginTop: 30, backgroundColor: "#ddd", borderRadius: 20, padding: 20, }}>
                <Text>Nome: Amanda Silva</Text>
                <Text>Telefone: (11) 988665544</Text>
                <Text onPress={() => navigation.navigate('Information', {
                    nome: 'Amanda Silva',
                    telefone: '(11) 988554433',
                    endereco: 'Rua teste 678, bairro Tal, CIDADE-UF',
                    profissao: 'Jornalista',
                    email: 'amanda@email.com'
                }
                )}>Ver mais <FontAwesome name="plus" /></Text>
            </View>

        </View>


    );
}