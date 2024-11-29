import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { authStore } from '@state/AuthStore'
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from '@service/OrderService'
import { Colors } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import { useRoute } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import LIveHeader from '@features/map/LIveHeader'
import LiveMap from '@features/map/LiveMap'
import DeliveryDetails from '@features/map/DeliveryDetails'
import OrderSummary from '@features/map/OrderSummary'
import { hocStyles } from '@styles/GlobalStyles'
import CustomButton from '@components/ui/CustomButton'

const DeliveryMap: FC = () => {
    const user = authStore(state => state.user)
    const [orderData, setOrderData] = useState<any>(null)
    const [myLocation, setMyLocation] = useState<any>(null)
    const route = useRoute()

    const orderDetailes = route?.params as Record<string, any>
    const { setCurrentOrder } = authStore()

    const fetchOrderDetails = async () => {
        if (orderDetailes?._id) {
            const data = await getOrderById(orderDetailes?._id);
            // console.log(data, "Data")
            // console.log("Fetched order data:", data);
            setOrderData(data);
        } else {
            console.log("No valid order ID found or currentOrder is undefined");
        }
    };

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                setMyLocation({ latitude, longitude })
            },
            (err) => console.log('Error fetching geoLocatin', err),
            { enableHighAccuracy: true, distanceFilter: 10 }
        );
        return () => Geolocation.clearWatch(watchId)
    }, [])

    const acceptOrder = async () => {
        const data = await confirmOrder(orderData?._id, myLocation)
        if (data) {
            setCurrentOrder(data)
            Alert.alert("Order Accepted, Grab your package")
        } else {
            Alert.alert("There was an error")
        }
        fetchOrderDetails()
    }

    const orderPickedUp = async () => {
        const data = await sendLiveOrderUpdates(orderData?._id, myLocation, 'arriving')
        if (data) {
            setCurrentOrder(data)
            Alert.alert("Let's deliver it as soon as possible")
        } else {
            Alert.alert("There was an error")
        }
        fetchOrderDetails()
    }

    const orderDelivered = async () => {
        const data = await sendLiveOrderUpdates(orderData?._id, myLocation, 'delivered')
        if (data) {
            setCurrentOrder(null)
            Alert.alert("Woohoo! You made it 🥳")
        } else {
            Alert.alert("There was an error")
        }
        fetchOrderDetails()
    }

    let message = "Start this order"

    if (orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'confirmed') {
        message = "Grab your order"
    } else if (orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'arriving') {
        message = "Complete your order"
    } else if (orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'delivered') {
        message = "Your milestone"
    } else if (orderData?.deliveryPartner?._id != user?._id && orderData?.status != 'available') {
        message = "you missed it!"
    }

    useEffect(() => {
        async function sendLiveUpdates() {
            if (orderData?.deliveryPartner?._id == user?._id
                && orderData?.status != 'delivered'
                && orderData?.status != 'cancelled') {
                await sendLiveOrderUpdates(orderData?._id, myLocation, orderData?._status)
                fetchOrderDetails()
            }
        }
        sendLiveUpdates()
    }, [myLocation])



    // console.log('current order', orderDetailes)
    return (
        <View style={styles.container}>
            <LIveHeader type='Delivery' title={message} secondTitle='Delivery in 10 minutes' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                <LiveMap
                    deliveryPersonLocation={orderData?.deliveryPersonLocation || myLocation}
                    deliveryLocation={orderData?.deliveryLocation || null}
                    hasAccepted={orderData?.deliveryPartner?._id == user?._id && orderData?.status == 'confirmed'}
                    hasPickedUp={orderData?.status == 'arriving'}
                    pickupLocation={orderData?.pickupLocation || null}
                />
                <DeliveryDetails details={orderData?.customer} />
                <OrderSummary order={orderData} />


                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name='cards-heart-outline' color={Colors.disabled} size={RFValue(20)} />
                    </View>
                    <View style={{ width: '82%' }}>
                        <CustomText variant='h6' style={{ fontWeight: 'semibold' }}>Do you like our app clone ?</CustomText>
                        <CustomText variant='h7' style={{ fontWeight: 'medium' }}>Hit like and subscribe button! If you are enjoying comment your excitement</CustomText>
                    </View>
                </View>

            </ScrollView>

            {orderData?.status != 'delivered' && orderData?.status != 'cancelled' &&
                <View style={[hocStyles.cartContainer, styles.btnContainer]}>
                    {orderData?.status == 'available' &&
                        <CustomButton
                            disabled={false}
                            title='Accept Order'
                            onPress={acceptOrder}
                            loading={false}
                        />
                    }
                    {orderData?.status == 'confirmed' &&
                        orderData?.deliveryPartner?._id === user?._id &&
                        <CustomButton
                            disabled={false}
                            title='Order Picked Up'
                            onPress={orderPickedUp}
                            loading={false}
                        />
                    }
                    {orderData?.status == 'arriving' &&
                        orderData?.deliveryPartner?._id === user?._id &&
                        <CustomButton
                            disabled={false}
                            title='Delivered'
                            onPress={orderDelivered}
                            loading={false}
                        />
                    }
                </View>
            }

        </View>
    )
}

export default DeliveryMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    scrollContent: {
        paddingBottom: 150,
        backgroundColor: Colors.backgroundSecondary,
        padding: 15
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border
    },
    iconContainer: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        padding: 10
    }
})