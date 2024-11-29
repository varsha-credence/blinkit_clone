import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

interface ActionButtonProps {
    icon: string;
    label: string;
    onPress: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Icon name={icon} color={Colors.text} size={RFValue(16)} />
            </View>
            <CustomText variant='h5' style={{ fontWeight: '800' }}>
                {label}
            </CustomText>
        </TouchableOpacity>
    )
}

export default ActionButton

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: Colors.backgroundSecondary
    }
})