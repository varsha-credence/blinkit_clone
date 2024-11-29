import axios from "axios";
import { GOOGLE_MAP_API } from "./config";
import { updateUserLocation } from "./AuthService";

export const reverseGeocode = async (latitude: number, longitude: number, setUser: any) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API}`
        );

        if (response.data.status == 'OK') {
            const address = response.data.results[0].formatted_address;
            console.log('response dataaa', response.data)
            updateUserLocation({ liveLocation: { latitude, longitude }, address }, setUser)
        } else {
            console.error('Geo code failed', response.data)
        }

    } catch (error) {
        console.error('Geo code failed', error)

    }
}