import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import UniversalAdd from '@components/ui/UniversalAdd'

const OrderItem: FC<{ item: any }> = ({ item }) => {
    return (
        <View style={styles.flexRow}>
            <View style={styles.imgContainer}>
                <Image source={{ uri: item?.item?.image }} style={styles.img} />
            </View>
            <View>
                <CustomText variant='h8' numberOfLines={2} style={{ fontWeight: '700' }}>
                    {item.item.name}
                </CustomText>
                <CustomText variant='h9'>
                    {item.item.quantity}
                </CustomText>
            </View>

            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                <UniversalAdd item={item.item} />
                <CustomText
                    variant='h8'
                    style={{ fontWeight: '700', alignSelf: 'flex-end', marginTop: 4 }}
                >
                    ₹{item.count * item.item.price}
                </CustomText>
            </View>
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50
    },
    imgContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: '17%'
    },
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderTopWidth: 0.6,
        // backgroundColor: Colors.border
    }
})