import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { authStore } from '@state/AuthStore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from '@utils/NavigationUtils'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@service/MapService'

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {

    const { user, setUser } = authStore()

    const updateUserLocation = async () => {
        Geolocation.requestAuthorization()
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                reverseGeocode(latitude, longitude, setUser)
            },
            error => console.log(error),
            {
                enableHighAccuracy: false,
                timeout: 10000,
            }
        )
    }

    useEffect(() => {
        updateUserLocation()
    }, [])

    return (
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText variant='h8' style={styles.text}>
                    Delivery in
                </CustomText>
                <View style={styles.flexRowGap}>
                    <CustomText variant='h2' style={[styles.text, { fontWeight: '800' }]}>
                        10 minutes
                    </CustomText>
                    <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                        <CustomText
                            fontSize={RFValue(8)}
                            style={{ color: '#3B4886', fontWeight: '800' }}
                        >🌧 Rain</CustomText>
                    </TouchableOpacity>
                </View>

                <View style={styles.flexRow}>
                    <CustomText variant='h6' numberOfLines={1} style={styles.text2}>
                        {user?.address || 'knowhere, somewhere...'}
                    </CustomText>
                    <Icon name='menu-down' color='#fff' size={RFValue(20)} style={{ bottom: -1 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('Profile')}>
                <Icon name='account-circle-outline' size={RFValue(36)} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontWeight: 'bold'
    },
    text2: {
        fontWeight: '800',
        color: '#fff',
        width: '90%',
        textAlign: 'center'
    },
    flexRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
        width: '70%'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? 10 : 5,
        justifyContent: 'space-between'
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    noticeBtn: {
        backgroundColor: '#b1b3b1',
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 4,
        bottom: -2
    }
})