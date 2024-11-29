import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { authStore } from '@state/AuthStore'
import { hocStyles } from '@styles/GlobalStyles'
import CustomText from '@components/ui/CustomText'
import { Colors } from '@utils/Constants'
import { navigate } from '@utils/NavigationUtils'
import Geolocation from '@react-native-community/geolocation'
import { sendLiveOrderUpdates } from '@service/OrderService'

const WithLiveOrder = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {
    const WithLiveOrder: FC<P> = (props) => {
        const { currentOrder } = authStore()
        const user = authStore(state => state.user)
        const [myLocation, setMyLocation] = useState<any>(null)

        useEffect(() => {
            if (currentOrder) {
                const watchId = Geolocation.watchPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords
                        console.log('LIVE TRACKING 🛑', 'LAT: ', new Date().toLocaleTimeString(), latitude.toFixed())
                        setMyLocation({ latitude, longitude })
                    },
                    error => console.log('Error fetching location: ', error),
                    {
                        enableHighAccuracy: true,
                        distanceFilter: 10
                    }
                );
                return () => Geolocation.clearWatch(watchId)
            }
        }, [currentOrder])

        useEffect(() => {
            async function sendLiveUpdates() {
                if (currentOrder?.deliveryPartner?._id == user?._id && currentOrder?.status == 'delivered' && currentOrder?.status == 'cancelled') {
                    sendLiveOrderUpdates(currentOrder?._id, myLocation, currentOrder?.status)
                }
            }
            sendLiveUpdates()
        }, [myLocation])

        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />

                {currentOrder && (
                    <View style={[hocStyles.cartContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.flexRow}>
                            <View style={styles.img}>
                                <Image source={require('@assets/icons/bucket.png')} style={{ width: 20, height: 20 }} />
                            </View>
                            <View style={{ width: '65%' }}>
                                <CustomText variant='h5' style={{ fontWeight: '800' }}>
                                    #{currentOrder?.orderId}
                                </CustomText>
                                <CustomText variant='h7' style={{ fontWeight: 'semibold' }}>
                                    {currentOrder?.deliveryLocation?.address}
                                </CustomText>
                            </View>
                        </View>

                        {/* Navigate to LiveTracking */}
                        <TouchableOpacity onPress={() => navigate('DeliveryMap', {
                            ...currentOrder
                        })} style={styles.btn}>
                            <CustomText variant='h7' style={{ color: Colors.secondary, fontWeight: 'medium' }}>
                                Continue
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
    return WithLiveOrder
}

export default WithLiveOrder

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 15,
        marginBottom: 15,
        paddingVertical: 10,
        padding: 10
    },
    img: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.7,
        borderColor: Colors.secondary,
        borderRadius: 5
    }
})