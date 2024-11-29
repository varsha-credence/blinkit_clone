import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { authStore } from '@state/AuthStore'
import DeliveryHeader from '@components/delivery/DeliveryHeader'
import TabBar from '@components/delivery/TabBar'
import { fetchOrders } from '@service/OrderService'
import CustomText from '@components/ui/CustomText'
import OrderItem from '@components/delivery/OrderItem'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@service/MapService'
import WithLiveOrder from './WithLiveOrder'


const DeliveryDashboard: FC = () => {

    const { user, setUser } = authStore()
    // console.log('user', user)

    const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const updateUser = async () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                reverseGeocode(latitude, longitude, setUser)
            },
            error => console.error(error),
            {
                enableHighAccuracy: false,
                timeout: 1500
            }
        )
    }

    useEffect(() => {
        updateUser()
    }, [])

    const renderOrderItem = ({ item, index }: any) => {
        return (
            <OrderItem index={index} item={item} />
        )
    }

    const fetchData = async () => {
        setData([])
        setRefreshing(true)
        setLoading(true)
        const data = await fetchOrders(selectedTab, user?._id, user?.branch);
        // console.log('Response data:', JSON.stringify(data, null, 2));
        // console.log('data', data)
        setData(data || [])
        setRefreshing(false)
        setLoading(
            false
        )
    }

    useEffect(() => {
        fetchData()
    }, [selectedTab])

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <DeliveryHeader name={user?.name} email={user?.email} />
            </SafeAreaView>
            <View style={styles.subContainer}>
                <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
                <FlatList
                    data={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={async () => await fetchData()}
                        />
                    }
                    ListEmptyComponent={() => {
                        if (loading) {
                            return (
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.secondary} size='small' />
                                </View>
                            )
                        }
                        return (
                            <View style={styles.center}>
                                <CustomText>No orders found yet!</CustomText>
                            </View>
                        )
                    }}

                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.orderId}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </View>
    )
}

export default WithLiveOrder(DeliveryDashboard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7cc57',
        flex: 1
    },
    subContainer: {
        backgroundColor: Colors.backgroundSecondary,
        flex: 1,
        padding: 6,
    },
    flatListContainer: {
        padding: 2
    },
    center: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})