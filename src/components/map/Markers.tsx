import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

const Markers = ({ deliveryLocation, pickupLocation, deliveryPersonLocation }: any) => {
    return (
        <>
            {
                deliveryLocation && <Marker
                    image={require('@assets/icons/my_pin.png')}
                    coordinate={deliveryLocation}
                    style={{ height: 20, width: 20 }}
                />
            }

            <Marker
                image={require('@assets/icons/store.png')}
                coordinate={pickupLocation}
                style={{ height: 20, width: 20 }}
            />

            {
                deliveryPersonLocation && <Marker
                    image={require('@assets/icons/delivery.png')}
                    coordinate={deliveryPersonLocation}
                    style={{ position: 'absolute', zIndex: 99, height: 20, width: 20 }}
                />
            }
        </>
    )
}

export default Markers

const styles = StyleSheet.create({})