import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { authStore } from '@state/AuthStore'
import { useNavigationState } from '@react-navigation/native'
import { getOrderById } from '@service/OrderService'
import { hocStyles } from '@styles/GlobalStyles'
import CustomText from '@components/ui/CustomText'
import { Colors } from '@utils/Constants'
import { navigate } from '@utils/NavigationUtils'
import io from 'socket.io-client'
import { SOCKET_URL } from '@service/config'

const WithLiveStatus = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {
    const WithLiveStatusComponent: FC<P> = (props) => {

        const { currentOrder, setCurrentOrder } = authStore()
        const routeName = useNavigationState(state => state.routes[state.index]?.name)

        const fetchOrderDetails = async () => {
            if (currentOrder && currentOrder._id) {
                try {
                    const data = await getOrderById(currentOrder._id);
                    setCurrentOrder(data);
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            } else {
                console.log("No current order available");
            }
        };

        // useEffect(() => {
        //     fetchOrderDetails()
        // }, [])

        // console.log("Current order:", currentOrder)

        useEffect(() => {
            if (currentOrder) {
                const socketInstance = io(SOCKET_URL, {
                    transports: ['websocket'],
                    withCredentials: false
                })
                socketInstance.emit('joinRoom', currentOrder?._id)
                socketInstance.on('liveTrackingUpdates', (updateOrder) => {
                    fetchOrderDetails()
                    console.log('RECEIVING LIVE UPDATES 🛑')
                })
                socketInstance.on('orderConfirmed', (confirmOrder) => {
                    fetchOrderDetails()
                    console.log('ORDER CONFIRMATION LIVE UPDATES 🛑')
                })

                return () => {
                    socketInstance.disconnect()
                }
            }
        }, [currentOrder])

        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />

                {currentOrder && routeName === 'ProductDashboard' && (
                    <View style={[hocStyles.cartContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.flexRow}>
                            <View style={styles.img}>
                                <Image source={require('@assets/icons/bucket.png')} style={{ width: 20, height: 20 }} />
                            </View>
                            <View style={{ width: '68%' }}>
                                <CustomText variant='h5' style={{ fontWeight: '800' }}>
                                    Order is {currentOrder?.status}
                                </CustomText>
                                <CustomText variant='h7' style={{ fontWeight: 'semibold' }}>
                                    {currentOrder?.items?.[0]?.item?.name +
                                        (currentOrder?.items?.length > 1 ? ` and ${currentOrder?.items.length - 1} more items` : '')}
                                </CustomText>
                            </View>
                        </View>

                        {/* Navigate to LiveTracking */}
                        <TouchableOpacity onPress={() => navigate('LiveTracking', { order: currentOrder })} style={styles.btn}>
                            <CustomText variant='h7' style={{ color: Colors.secondary, fontWeight: 'medium' }}>
                                View
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
    return WithLiveStatusComponent
}

export default WithLiveStatus

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