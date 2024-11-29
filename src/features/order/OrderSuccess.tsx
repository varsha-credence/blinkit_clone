import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { screenWidth } from '@utils/Scaling'
import { Colors } from '@utils/Constants'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { authStore } from '@state/AuthStore'
import { replace } from '@utils/NavigationUtils'

const OrderSuccess: FC = () => {
    const { user } = authStore()

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            replace("LiveTracking")
        }, 2300)
        return () => clearTimeout(timeOutId)
    }, [])

    return (
        <View style={styles.container}>
            <LottieView
                source={require('@assets/animations/confirm.json')}
                autoPlay
                duration={2000}
                loop={false}
                speed={1}
                style={styles.lottieView}
                enableMergePathsAndroidForKitKatAndAbove
                hardwareAccelerationAndroid
            />
            <CustomText variant='h6' style={styles.orderPlaceText}>ORDER PLACED</CustomText>
            <View style={styles.deliveryContainer}>
                <CustomText variant='h4' style={styles.deliveryText}>Delivery to home</CustomText>
            </View>
            <CustomText variant='h7' style={styles.addressText}>
                {user?.address || 'Somewhere, knowhere'}
            </CustomText>
        </View>
    )
}

export default OrderSuccess

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    lottieView: {
        width: screenWidth * 0.6,
        height: 150
    },
    deliveryContainer: {
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginBottom: 5,
        borderColor: Colors.secondary
    },
    deliveryText: {
        marginTop: 15,
        borderColor: Colors.secondary,
        fontWeight: '800'
    },
    addressText: {
        opacity: 0.8,
        fontWeight: '600',
        width: '80%',
        textAlign: 'center',
        marginTop: 10
    },
    orderPlaceText: {
        opacity: 0.4,
        fontWeight: '800'
    }
})