import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors } from '@utils/Constants'
import Logo from "@assets/images/splash_logo.jpeg"
import { screenHeight, screenWidth } from '@utils/Scaling'
import Geolocation from '@react-native-community/geolocation'
import { authStore } from '@state/AuthStore'
import { tokenStorage } from '@state/Storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { jwtDecode } from 'jwt-decode'
import { refetchUser, refresh_tokens } from '@service/AuthService'

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})

interface DecodedToken {
    exp: number;
}

const SplashScreen: FC = () => {

    const { user, setUser } = authStore()

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string
        const refreshToken = tokenStorage.getString('refreshToken') as string

        // console.log('Access Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

            const currentTime = Date.now() / 1000;

            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate('CustomerLogin')
                Alert.alert("Session expired", "Please login again")
                return false
            }

            if (decodedAccessToken?.exp < currentTime) {
                try {
                    await refresh_tokens()
                    await refetchUser(setUser)

                    const updatedUser = authStore().user;
                    console.log('User role after refetch:', updatedUser?.role);

                    if (updatedUser?.role === 'Customer') {
                        resetAndNavigate('ProductDashboard')
                    } else {
                        resetAndNavigate('DeliveryDashboard')
                    }

                } catch (error) {
                    console.log(error)
                    Alert.alert("There was an error refreshing token")
                    return false
                }
            } else {
                // console.log('User role:', user?.role);
                if (user?.role === 'Customer') {
                    resetAndNavigate('ProductDashboard')
                } else {
                    resetAndNavigate('DeliveryDashboard')
                }
            }

            return true
        }

        resetAndNavigate("CustomerLogin")
        return false
    }

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                Geolocation.requestAuthorization()
                await tokenCheck()
            } catch (error) {
                Alert.alert("Sorry we need location service to give you better shopping experience")
            }
        }
        const timeOutId = setTimeout(fetchUserLocation, 1000)
        return () => clearTimeout(timeOutId)

    }, [])

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: 'contain'
    }
})

export default SplashScreen