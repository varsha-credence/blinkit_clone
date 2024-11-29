import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

const WalletItem: FC<{ icon: string; label: string }> = ({ icon, label }) => {
    return (
        <View style={styles.WalletItemContainer}>
            <Icon name={icon} color={Colors.text} size={RFValue(20)} />
            <CustomText variant='h6' style={{ fontWeight: 'medium', color: 'black' }}>
                {label}
            </CustomText>
        </View>
    )
}

export default WalletItem

const styles = StyleSheet.create({
    WalletItemContainer: {
        alignItems: 'center'
    }
})