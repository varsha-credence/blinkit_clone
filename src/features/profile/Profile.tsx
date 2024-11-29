import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { authStore } from '@state/AuthStore'
import { useCartStore } from '@state/CartStore'
import { fetchCustomerOrders } from '@service/OrderService'
import CustomeHeader from '@components/ui/CustomeHeader'
import CustomText from '@components/ui/CustomText'
import WalletSection from './WalletSection'
import ActionButton from './ActionButton'
import OrderItem from './OrderItem'
import { storage, tokenStorage } from '@state/Storage'
import { resetAndNavigate } from '@utils/NavigationUtils'


const Profile: FC = () => {

    const [orders, setOrders] = useState([])
    const { logout, user } = authStore()
    const { clearCart } = useCartStore()

    const fetchOrders = async () => {
        const data = await fetchCustomerOrders(user?._id)
        setOrders(data)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const renderHeader = () => {
        return (
            <View>
                <CustomText variant='h3' style={{ fontWeight: 'bold' }}>
                    Your account
                </CustomText>
                <CustomText variant='h6' style={{ fontWeight: '700' }}>
                    {user?.phone}
                </CustomText>

                <WalletSection />

                <CustomText variant='h7' style={styles.informativeText}>
                    YOUR INFORMATION
                </CustomText>

                <ActionButton icon='book-outline' label='Address book' />
                <ActionButton icon='information-circle-outline' label='About us' />
                <ActionButton icon='log-out-outline' label='Logout' onPress={() => {
                    clearCart()
                    logout()
                    tokenStorage.clearAll()
                    storage.clearAll()
                    resetAndNavigate('CustomerLogin')
                }} />

                <CustomText variant='h7' style={styles.pastText}>
                    PAST ORDERS
                </CustomText>
            </View>
        )
    }

    const renderOrders = ({ item, index }: any) => {
        return (
            <OrderItem item={item} index={index} />
        )
    }

    return (
        <View style={styles.container}>
            <CustomeHeader title='Profile' />

            <FlatList
                data={orders}
                ListHeaderComponent={renderHeader}
                renderItem={renderOrders}
                keyExtractor={(item: any) => item?.orderId}
                contentContainerStyle={styles.scrollViewContent}
            />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollViewContent: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 10
    },
    informativeText: {
        opacity: 0.7,
        marginBottom: 20
    },
    pastText: {
        marginVertical: 20,
        opacity: 0.7
    }
})