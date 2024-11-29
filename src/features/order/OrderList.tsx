import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/CartStore'
import CustomText from '@components/ui/CustomText'
import { Colors } from '@utils/Constants'
import OrderItem from './OrderItem'

const OrderList = () => {
    const cartItems = useCartStore((state) => state.cart)
    const totalItems = cartItems?.reduce((acc, cart) => acc + cart?.count, 0)
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.imgContainer}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.img} />
                </View>
                <View>
                    <CustomText variant='h5' style={{ fontWeight: '700' }}>Delivery in 9 minutes</CustomText>
                    <CustomText variant='h8' style={{ fontWeight: '700', opacity: 0.7 }}>Shipment of {totalItems || 0} item</CustomText>
                </View>
            </View>
            {cartItems?.map((item) => {
                return (
                    <OrderItem key={item._id} item={item} />
                )
            })}
        </View>
    )
}

export default OrderList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    imgContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15
    },
    img: {
        width: 30,
        height: 30
    }
})