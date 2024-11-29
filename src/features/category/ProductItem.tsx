import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { screenHeight } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';
import UniversalAdd from '@components/ui/UniversalAdd';

const ProductItem: FC<{ item: any; index: number }> = ({ item, index }) => {

    const isSecondColumn = index % 2 != 0
    return (
        <View style={[styles.container, { marginRight: isSecondColumn ? 10 : 0 }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.flexRow}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.clockIcon} />
                    <CustomText fontSize={RFValue(7)} style={{ fontWeight: '700' }}>8 MINS</CustomText>
                </View>
                <CustomText variant='h6' numberOfLines={2} style={{ marginVertical: 4, fontWeight: '800' }}>
                    {item.name}
                </CustomText>
                <View style={styles.priceContainer}>
                    <View>
                        <CustomText variant='h7' style={{ fontWeight: '800' }}>
                            ₹ {item?.price}
                        </CustomText>
                        <CustomText variant='h7' style={{ opacity: 0.8, textDecorationLine: 'line-through', fontWeight: '800' }}>
                            ₹ {item?.discountPrice}
                        </CustomText>
                    </View>

                    <UniversalAdd item={item} />
                </View>
            </View>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        width: '45%',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        height: screenHeight * 0.14,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    image: {
        height: '100%',
        width: '100%',
        aspectRatio: 1 / 1,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        paddingHorizontal: 10
    },
    flexRow: {
        flexDirection: 'row',
        padding: 2,
        borderRadius: 4,
        alignItems: 'center',
        gap: 2,
        backgroundColor: Colors.backgroundSecondary,
        alignSelf: 'flex-start'
    },
    clockIcon: {
        height: 15,
        width: 15
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginTop: 'auto'
    }
})