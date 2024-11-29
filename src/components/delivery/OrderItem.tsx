import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatISOToCustom } from '@utils/DateUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigate } from '@utils/NavigationUtils';

interface CartItem {
    _id: string | number;
    item: any;
    count: number
}

interface Order {
    orderId: string;
    items: CartItem[];
    deliveryLocation: any;
    totalPrice: number;
    createdAt: string;
    status: 'confirmed' | 'completed'
}

function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
        case 'available':
            return '#28a745';
        case 'confirmed':
            return '#007bff';
        case 'delivered':
            return '#17a2b8';
        case 'cancelled':
            return '#dc3545'
        default:
            return '#6c757d'
    }
}

const OrderItem: FC<{ item: Order; index: number }> = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRowBetween}>
                <CustomText variant='h6' style={{ fontWeight: 'medium' }}>
                    #{item.orderId}
                </CustomText>
                <View style={[
                    styles.statusContainer
                ]}>
                    <CustomText
                        variant='h8'
                        style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </CustomText>
                </View>
            </View>

            <View style={styles.itemsContainer}>
                {item.items.slice(0, 2).map((i, idx) => {
                    if (i.item) {
                        return (
                            <CustomText variant='h7' numberOfLines={1} key={idx}>
                                {i.count}x {i.item.name}
                            </CustomText>
                        )
                    }
                    return null;
                })}
            </View>

            <View style={[styles.flexRowBetween, styles.addressContainer]}>
                <View style={styles.addressTextContainer}>
                    <CustomText variant='h7' numberOfLines={1}>
                        {item?.deliveryLocation?.address}
                    </CustomText>
                    <CustomText style={styles.dateText} >
                        {formatISOToCustom(item?.createdAt)}
                    </CustomText>
                </View>

                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => {
                        navigate('DeliveryMap', {
                            ...item
                        })
                    }}>
                    <Icon name='arrow-right-circle' size={RFValue(20)} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.7,
        padding: 10,
        borderColor: Colors.border,
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 10,
        backgroundColor: 'white'
    },
    flexRowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    statusContainer: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    statusText: {
        textTransform: 'capitalize',
        color: 'white',
        fontWeight: 'semibold'
    },
    itemsContainer: {
        width: '50%',
        marginTop: 10
    },
    addressContainer: {
        marginTop: 10
    },
    addressTextContainer: {
        width: '70%'
    },
    dateText: {
        marginTop: 2,
        fontSize: RFValue(9)
    },
    iconContainer: {
        alignItems: 'flex-end'
    }
})