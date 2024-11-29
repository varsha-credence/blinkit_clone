import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useCartStore } from '@state/CartStore'
import { Colors } from '@utils/Constants'
import CustomText from './CustomText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'

const UniversalAdd: FC<{ item: any }> = ({ item }) => {

    const count = useCartStore((state) => state.getItemCount(item._id))
    const { addItem, removeItem } = useCartStore()
    return (
        <View style={[styles.container, { backgroundColor: count === 0 ? '#fff' : Colors.secondary }]}>
            {count === 0 ?
                <Pressable
                    onPress={() => addItem(item)}
                    style={styles.add}
                >
                    <CustomText variant='h7' style={styles.addText}>ADD</CustomText>
                </Pressable> :
                <View style={styles.counterContainer}>
                    <Pressable onPress={() => removeItem(item._id)}>
                        <Icon name='minus' color='#fff' size={RFValue(15)} />
                    </Pressable>
                    <CustomText style={styles.text}>{count}</CustomText>
                    <Pressable onPress={() => addItem(item)}>
                        <Icon name='plus' color='#fff' size={RFValue(15)} />
                    </Pressable>
                </View>
            }
        </View>
    )
}

export default UniversalAdd

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.secondary,
        width: 70,
        borderRadius: 8
    },
    add: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 6
    },
    addText: {
        fontWeight: '800',
        color: Colors.secondary
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 6,
        justifyContent: 'space-between'
    },
    text: {
        fontWeight: '700',
        color: '#fff',
        fontSize: 17
    }
})