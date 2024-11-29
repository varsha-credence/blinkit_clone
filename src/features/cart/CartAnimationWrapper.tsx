import { Animated, StyleSheet } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'

interface CartAnimationWrapperProps {
    cartCount: number;
    children: React.ReactNode;
}

const CartAnimationWrapper: FC<CartAnimationWrapperProps> = ({ cartCount, children }) => {
    const slideAnim = useRef(new Animated.Value(0)).current

    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (cartCount > 0 && !hasAnimated) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                setHasAnimated(true)
            })
        } else if (cartCount === 0 && hasAnimated) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                setHasAnimated(false)
            })
        }
    }, [cartCount, hasAnimated])

    const slidUpStyle = {
        transform: [
            {
                translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })
            }
        ],
        opacity: slideAnim
    }

    return (
        <Animated.View style={[styles.cartContainer, slidUpStyle]}>{children}</Animated.View>
    )
}

export default CartAnimationWrapper

const styles = StyleSheet.create({
    cartContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    }
})