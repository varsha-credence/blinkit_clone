import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants';
import CustomText from './CustomText';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    disabled: boolean;
    loading: boolean
}

const CustomButton: FC<CustomButtonProps> = ({
    onPress,
    title,
    disabled,
    loading
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.btn, {
                backgroundColor: disabled ? Colors.disabled : Colors.secondary
            }]}
        >
            {
                loading ?
                    <ActivityIndicator color='white' size='small' /> :
                    <CustomText
                        variant='h4'
                        style={styles.text
                        }
                    >
                        {title}
                    </CustomText>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        width: '100%'
    },
    text: {
        color: '#fff',
        fontWeight: '900'
    }
})

export default CustomButton