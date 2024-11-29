import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { authStore } from '@state/AuthStore'
import { getOrderById } from '@service/OrderService'
import { Colors } from '@utils/Constants'
import LIveHeader from './LIveHeader'
import LiveMap from './LiveMap'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import DeliveryDetails from './DeliveryDetails'
import OrderSummary from './OrderSummary'
import WithLiveStatus from './WithLiveStatus'

const LiveTracking: FC = () => {
    const { currentOrder, setCurrentOrder } = authStore()

    const fetchOrderDetails = async () => {
        if (currentOrder?._j?._id) {
            const data = await getOrderById(currentOrder?._j?._id);
            // console.log(data, "Data")
            // console.log("Fetched order data:", data);
            setCurrentOrder(data);
        } else {
            console.log("No valid order ID found or currentOrder is undefined");
        }
    };


    useEffect(() => {
        fetchOrderDetails()
    }, [])

    let msg = "Packing your order"
    let time = "Arriving in 10 minutes"
    if (currentOrder?.status == 'confirmed') {
        msg = 'Arriving Soon'
        time = 'Arriving in 8 minutes'
    } else if (currentOrder?.status == 'arriving') {
        msg = 'Order Picked Up'
        time = 'Arriving in 6 minutes'
    } else if (currentOrder?.status == 'delivered') {
        msg = 'Order Delivered'
        time = 'Fastest Delivery ⚡️'
    }
    // console.log('current order', currentOrder)
    return (
        <View style={styles.container}>
            <LIveHeader type='Customer' title={msg} secondTitle={time} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                <LiveMap
                    deliveryLocation={currentOrder?.deliveryLocation}
                    pickupLocation={currentOrder?.pickupLocation}
                    deliveryPersonLocation={currentOrder?.deliveryPersonLocation}
                    hasAccepted={currentOrder?.status == 'confirmed'}
                    hasPickedUp={currentOrder?.status == 'arriving'}
                />

                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
                            color={Colors.disabled}
                            size={RFValue(20)}
                        />
                    </View>
                    <View style={{ width: '82%' }}>

                        <CustomText variant='h6' numberOfLines={1} style={{ fontWeight: '800' }}>
                            {currentOrder?.deliveryPartner?.name || "We will soon assign delivery partner"}
                        </CustomText>

                        {currentOrder?.deliveryPartner &&
                            <CustomText variant='h6' style={{ fontWeight: '700' }}>
                                {currentOrder?.deliveryPartner?.phone}
                            </CustomText>
                        }

                        <CustomText variant='h8' style={{ fontWeight: '700' }}>
                            {currentOrder?.deliveryPartner ? "For delivery instruction you can contact here" : msg}
                        </CustomText>
                    </View>
                </View>


                <DeliveryDetails details={currentOrder?.customer} />

                <OrderSummary order={currentOrder} />

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
        </View>
    )
}

export default WithLiveStatus(LiveTracking)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary
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
    }
})