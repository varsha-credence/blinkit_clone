import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/Scaling'
import CustomText from '@components/ui/CustomText'
import { Defs, G, Path, Svg, Use } from 'react-native-svg'
import { wavyData } from '@utils/dummyData'

const Notice: FC = () => {
    return (
        <View style={{ height: NoticeHeight }}>
            <View style={styles.container}>
                <View style={styles.noticeContainer}>
                    <SafeAreaView style={{ padding: 10 }}>
                        <CustomText variant='h6' style={styles.heading}>
                            It's rainning near this location
                        </CustomText>
                        <CustomText variant='h7' style={styles.textCenter}>
                            Our delivery partners may take longer to reach you
                        </CustomText>
                    </SafeAreaView>
                </View>
            </View>

            <Svg
                width='100%'
                height='20'
                fill='#CCD5E4'
                viewBox='0 0 4000 1000'
                preserveAspectRatio='none'
                style={styles.wave}
            >
                <Defs>
                    <Path id='wavepath' d={wavyData} />
                </Defs>
                <G>
                    <Use href='#wavepath' y={321} />
                </G>
            </Svg>
        </View>
    )
}

export default Notice

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCD5E4'
    },
    noticeContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#CCD5E4å'
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: '600'
    },
    heading: {
        color: '#2D3875',
        marginBottom: 8,
        fontWeight: '800',
        textAlign: 'center',
    },
    wave: {
        width: '100%',
        transform: [{ rotateX: '180deg' }]
    }
})