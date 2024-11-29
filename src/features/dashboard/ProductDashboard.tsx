import { StyleSheet, Text, View, Animated as RNAnimated, SafeAreaView, TouchableOpacity, Platform, } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { authStore } from '@state/AuthStore'
import NoticeAnimation from './NoticeAnimation'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import Visual from './Visual'
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, useCollapsibleContext, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import AnimatedHeader from './AnimatedHeader'
import StickSearchBar from './StickSearchBar'
import Content from '@components/dashboard/Content'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'
import WithCart from '@features/cart/WithCart'
import WithLiveStatus from '@features/map/WithLiveStatus'

const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard: FC = () => {
    // const { user } = authStore()
    // console.log(user)

    const { scrollY, expand } = useCollapsibleContext()
    const previousScroll = useRef<number>(0)

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180
        const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 })
        const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 })

        previousScroll.current = scrollY.value

        return {
            opacity,
            transform: [{ translateY }]
        }
    })

    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current

    const slidUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HEIGHT,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    const slidDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        slidDown()
        const timeOutId = setTimeout(() => {
            slidUp()
        }, 3500)
        return () => clearTimeout(timeOutId)
    }, [])

    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <>
                <Visual />
                <SafeAreaView />

                <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
                    <TouchableOpacity
                        onPress={() => {
                            scrollY.value = 0;
                            expand()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Icon name='arrow-up-circle-outline' color='white' size={RFValue(12)} />
                        <CustomText variant='h9' style={{ color: 'white', fontWeight: '600' }}>
                            Back to Top
                        </CustomText>
                    </TouchableOpacity>
                </Animated.View>


                <CollapsibleContainer style={styles.panelContainer}>
                    <CollapsibleHeaderContainer containerStyle={styles.transparent}>
                        <AnimatedHeader
                            showNotice={() => {
                                slidDown()
                                const timeOutId = setTimeout(() => {
                                    slidUp()
                                }, 3500)
                                return () => clearTimeout(timeOutId)
                            }}
                        />
                        <StickSearchBar />
                    </CollapsibleHeaderContainer>

                    <CollapsibleScrollView
                        nestedScrollEnabled
                        style={styles.panelContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <Content />

                        <View style={{ backgroundColor: '#F8F8F8', padding: 20 }}>
                            <CustomText
                                fontSize={RFValue(32)}
                                style={{
                                    opacity: 0.2,
                                    fontWeight: 'bold'
                                }}>
                                India's last minute app 🥭
                            </CustomText>
                            <CustomText
                                // fontSize={RFValue(32)}
                                style={{
                                    opacity: 0.2,
                                    fontWeight: 'bold',
                                    marginTop: 10,
                                    paddingBottom: 100
                                }}>
                                Developed by ♥️ Varsha Verma
                            </CustomText>
                        </View>

                    </CollapsibleScrollView>
                </CollapsibleContainer>
            </>
        </NoticeAnimation>
    )
}

export default WithLiveStatus(WithCart(withCollapsibleContext(ProductDashboard)))

const styles = StyleSheet.create({
    panelContainer: {
        flex: 1,
        // paddingHorizontal: 8
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    backToTopButton: {
        position: 'absolute',
        alignSelf: 'center',
        top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        zIndex: 999
    }
})
