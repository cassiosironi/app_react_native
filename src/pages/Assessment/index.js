import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'


export default function App() {
    const camRef = useRef(null)
    const [type, setType] = useState(CameraType.back)
    const [hasPermission, setHasPermission] = useState(null)
    const [capturedPhoto, setCapturedPhoto] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted");
        })();
    }, [])

    if (hasPermission === null) {
        return (
            <View />
        )
    }

    if (hasPermission === false) {
        return (
            <Text>
                Acesso negado!
            </Text>
        )
    }
    

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setOpen(true)
            console.log(data)
        }
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <SafeAreaView style={styles.cameracontainer}>
            <Camera style={styles.camera} type={type} ref={camRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <FontAwesome name="exchange" size={23} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
                        <FontAwesome name="camera" size={23} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Camera>
            {capturedPhoto && (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={open}
                >
                    <View style={styles.contentModal}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => { setOpen(false) }}>
                            <FontAwesome name="close" size={50} color="#fff" />
                        </TouchableOpacity>
                        <Image style={styles.imgPhoto} source={{ uri: capturedPhoto }} />
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    cameracontainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    camera: {
        width: "100%",
        height: "100%",

    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    button: {
        position: "absolute",
        bottom: 50,
        left: 30,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 50,
        margin: 20,
        height: 50,
        width: 50,
    },
    buttonCamera: {
        position: "absolute",
        bottom: 50,
        right: 30,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 50,
        margin: 20,
        height: 50,
        width: 50,
    },

    contentModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        margin: 20,
        marginTop: 80,
    },

    closeButton: {
        position: "absolute",
        bottom: 80,
        left: "40%",
        margin: 10
    },

    imgPhoto: {
        width: "100%",
        height: 400,

    }
});
