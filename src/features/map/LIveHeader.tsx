import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { authStore } from '@state/AuthStore';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';

const LIveHeader: FC<{
    type: 'Customer' | 'Delivery';
    title: string;
    secondTitle: string
}> = ({
    title,
    type,
    secondTitle }) => {

        const isCustomer = type === 'Customer'
        const { currentOrder, setCurrentOrder } = authStore()
        return (
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => {
                            if (isCustomer) {
                                navigate('ProductDashboard')
                                if (currentOrder?.status == 'delivered') {
                                    setCurrentOrder(null)
                                }
                                return
                            }
                            navigate('DeliveryDashboard')
                        }}>
                        <Icon name='chevron-back' color={isCustomer ? "#fff" : '#000'} size={RFValue(16)} />
                    </Pressable>
                    <CustomText variant='h7' style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
                        {title}
                    </CustomText>
                    <CustomText variant='h4' style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
                        {secondTitle}
                    </CustomText>
                </View>
            </SafeAreaView>
        )
    }

export default LIveHeader

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: 'center'
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    titleTextBlack: {
        color: 'black',
        fontWeight: '700'
    },
    titleTextWhite: {
        color: 'white',
        fontWeight: '700'
    }
})