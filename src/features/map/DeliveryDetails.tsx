import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'

const DeliveryDetails: FC<{ details: any }> = ({ details }) => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.iconContainer}>
                    <Icon name='bike-fast' color={Colors.disabled} size={RFValue(20)} />
                </View>
                <View>
                    <CustomText variant='h4' style={{ fontWeight: '900' }}>
                        Your delivery details
                    </CustomText>
                    <CustomText variant='h7' style={{ fontWeight: '700' }}>
                        Details of your current order
                    </CustomText>
                </View>
            </View>

            <View style={styles.flexRow2}>
                <View style={styles.iconContainer}>
                    <Icon name='map-marker-outline' color={Colors.disabled} size={RFValue(20)} />
                </View>
                <View style={{ width: '80%' }}>
                    <CustomText variant='h7' style={{ fontWeight: 'medium' }}>
                        Delivery at home
                    </CustomText>
                    <CustomText variant='h7' numberOfLines={2} style={{ fontWeight: 'regular' }}>
                        {details?.address || '-----'}
                    </CustomText>
                </View>
            </View>

            <View style={styles.flexRow2}>
                <View style={styles.iconContainer}>
                    <Icon name='phone-outline' color={Colors.disabled} size={RFValue(20)} />
                </View>
                <View style={{ width: '80%' }}>
                    <CustomText variant='h7' style={{ fontWeight: 'medium' }}>
                        {details?.name || '--'} {details?.phone || 'xxxxxxxxxx'}
                    </CustomText>
                    <CustomText variant='h7' numberOfLines={2} style={{ fontWeight: 'regular' }}>
                        Receiver's contact no.
                    </CustomText>
                </View>
            </View>
        </View>
    )
}

export default DeliveryDetails

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 15,
        marginVertical: 15,
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border
    },
    flexRow2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    iconContainer: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})