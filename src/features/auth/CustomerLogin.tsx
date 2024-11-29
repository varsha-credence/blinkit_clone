import CustomSafeAreaView from '@components/globle/CustomSafeAreaView';
import ProductSlider from '@components/product/ProductSlider';
import CustomButton from '@components/ui/CustomButton';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import { customerLogin } from '@service/AuthService';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import UseKeyboardOffsetHeight from '@utils/UseKeyboardOffsetHeight';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Image, StatusBar, SafeAreaView, Keyboard, Alert } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

const bottomColors = [...lightColors].reverse()

const CustomerLogin: FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [gestureSequence, setGestureSequence] = useState<string[]>([]);
    const keyboardOffsetHeight = UseKeyboardOffsetHeight();

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (keyboardOffsetHeight === 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [keyboardOffsetHeight]);

    const handleAuth = async () => {
        Keyboard.dismiss()
        setLoading(true)
        try {
            await customerLogin(phoneNumber)
            resetAndNavigate('ProductDashboard')
        } catch (error) {
            Alert.alert("Login Failed")
        } finally {
            setLoading(false)
        }
    }

    const handleGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent;
            let direction = '';
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left';
            } else {
                direction = translationY > 0 ? 'down' : 'up';
            }

            if (gestureSequence.length === 0 || gestureSequence[gestureSequence.length - 1] !== direction) {
                const newSequence = [...gestureSequence, direction].slice(-4);
                setGestureSequence(newSequence);
                // console.log(newSequence, 'sequence');

                if (newSequence.join(' ') === 'up down up down') {
                    setGestureSequence([]);
                    resetAndNavigate('DeliveryLogin');
                }
            }
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />
                    <PanGestureHandler onHandlerStateChange={handleGesture}>
                        <Animated.ScrollView
                            bounces={false}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps="always"
                            contentContainerStyle={styles.subContainer}
                            style={{ transform: [{ translateY: animatedValue }] }}
                        >
                            <LinearGradient colors={bottomColors} style={styles.gradient} />
                            <View style={styles.content}>
                                <Image source={require('@assets/images/logo.png')} style={styles.logo} />
                                <CustomText
                                    variant='h2'
                                    style={{ fontWeight: 'bold' }}
                                >
                                    India's last minute app
                                </CustomText>
                                <CustomText
                                    variant='h5'
                                    style={[styles.text]}
                                >
                                    Log in or Sign up
                                </CustomText>

                                <CustomInput
                                    onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)) }}
                                    onClear={() => setPhoneNumber('')}
                                    value={phoneNumber}
                                    left={<CustomText
                                        variant='h4'
                                        style={styles.phoneText}
                                    >
                                        +91
                                    </CustomText>}
                                    placeholder='Enter mobile number'
                                    inputMode='numeric'
                                />
                                <CustomButton
                                    disabled={phoneNumber?.length != 10}
                                    onPress={() => handleAuth()}
                                    loading={loading}
                                    title='Continue' />
                            </View>
                        </Animated.ScrollView>
                    </PanGestureHandler>
                </CustomSafeAreaView>


                <View style={styles.footer}>
                    <SafeAreaView>
                        <CustomText fontSize={RFValue(8)}>
                            By Continuing, you agree to our Terms of Service & Privacy Policy
                        </CustomText>
                    </SafeAreaView>
                </View>


            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    gradient: {
        paddingTop: 60,
        width: '100%'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    logo: {
        height: 60,
        width: 60,
        borderRadius: 20,
        marginVertical: 10
    },
    text: {
        fontWeight: '900',
        marginTop: 2,
        opacity: 0.8,
        marginBottom: 25
    },
    phoneText: {
        marginLeft: 10,
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingVertical: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#f8f9fc',
        width: '100%'
    }
});

export default CustomerLogin;
