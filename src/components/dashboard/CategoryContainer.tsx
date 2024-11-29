import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'

const CategoryContainer: FC<{ data: any }> = ({ data }) => {

    const renderItems = (items: any[]) => {
        return (
            <>
                {items.map((item, index) => {
                    return (
                        <ScalePress
                            onPress={
                                () =>
                                    navigate('ProductCategories')
                            }
                            key={index}
                            style={styles.item}>
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={styles.image} />
                            </View>
                            <CustomText variant='h8' style={styles.text}>{item.name}</CustomText>
                        </ScalePress>
                    )
                })}
            </>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
            <View style={styles.row}>{renderItems(data?.slice(4))}</View>
        </View>
    )
}

export default CategoryContainer

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 25
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    item: {
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#E5F3F3',
        marginBottom: 8
    },
    text: {
        textAlign: 'center',
        fontWeight: '600'
    }
})