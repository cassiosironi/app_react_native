import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Vibration, TouchableOpacity, Pressable, Keyboard, FlatList } from "react-native"
import ResultImc from './ResultImc/'
import styles from "./style"
import { FontAwesome } from '@expo/vector-icons'



export default function Form() {

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("preencha o peso e altura!");
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        // Remove os listeners quando o componente for desmontado
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const clearList = () => {
        setImcList([]);
    };

    const renderClearButton = () => {
        if (imcList.length >= 1 && !isKeyboardVisible) {
            return (
                <View style={styles.clearButton}>
                    <TouchableOpacity onPress={clearList} >
                        <Text style={styles.clearButtonText}><FontAwesome name="trash" /> Limpar</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };


    function imcCalculator() {
        let heightFormat = height.replace(',', '.')
        let weightFormat = weight.replace(',', '.')
        let totalImc = (weightFormat / (heightFormat * heightFormat)).toFixed(2)
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }])
        setImc(totalImc)
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate();
            setErrorMessage("campo obrigatório!")
        }
    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual: ")
            setTextButton("Calcular novamente")
            setErrorMessage(null)
        }
        else {
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("preencha o peso e altura!")
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    {!isKeyboardVisible && (
                        <>
                            <Text style={styles.formLabel}>Altura</Text>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </>
                    )}
                    <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="Ex: 1.75" keyboardType="numeric" />
                    {!isKeyboardVisible && (
                        <>
                            <Text style={styles.formLabel}>Peso</Text>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </>
                    )}
                    <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="Ex: 82.70" keyboardType="numeric" />

                    <TouchableOpacity style={styles.ButtonCalculator} onPress={() => validationImc()}  >
                        <Text style={styles.textButtonCalculator} >
                            {textButton}
                        </Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity style={styles.ButtonCalculator} onPress={() => validationImc()}  >
                        <Text style={styles.textButtonCalculator} >
                            {textButton}
                        </Text>
                    </TouchableOpacity>
                </View>
            }


            {renderClearButton()}

            <FlatList
                style={styles.listImcs} data={imcList}
                keyExtractor={(item) => { item.id }}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            Resultado IMC:
                            <Text style={styles.textResultItemList}>
                                {item.imc}
                            </Text>
                        </Text>

                    )
                }}
            >
            </FlatList>

        </View>


    )
}