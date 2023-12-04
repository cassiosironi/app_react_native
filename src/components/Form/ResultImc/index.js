import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style"


export default function ResultImc(props) {

    const onShare = async () => {
        const result = await Share.share({
            message: "Meu IMC hoje é:" + props.resultImc,
        })
    }

    return (
        <View style={styles.ResultImc}>
            <View style={styles.boxShareButton}>
                <Text style={styles.information}>
                    {props.messageResultImc}
                </Text>
                <Text style={styles.numberImc}>
                    {props.resultImc}
                </Text>
                <TouchableOpacity style={styles.shared}
                    onPress={onShare}
                >
                    <Text style={styles.sharedText}>
                        Compartilhar
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}