import axios from "axios"
import { BASE_URL } from "./config"
import { tokenStorage } from "@state/Storage"
import { authStore } from '@state/AuthStore'
import { resetAndNavigate } from "@utils/NavigationUtils"
import { appAxios } from "./ApiInterCeptors"


export const deliveryLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password })
        const { accessToken, refreshToken, deliveryPartner } = response.data

        console.log("Login response: ", response.data);

        if (deliveryPartner) {
            tokenStorage.set("accessToken", accessToken);
            tokenStorage.set("refreshToken", refreshToken);
            const { setUser } = authStore.getState();
            setUser(deliveryPartner);
        } else {
            console.error("deliveryPartner data is missing in the login response");
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Login error:', error.response ? error.response.data : 'Network error');
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export const customerLogin = async (phone: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, { phone })
        const { accessToken, refreshToken, customer } = response.data
        if (customer) {
            tokenStorage.set("accessToken", accessToken)
            tokenStorage.set("refreshToken", refreshToken)
            const { setUser } = authStore.getState()
            setUser(customer)
            // console.log(response, "response data")
        } else {
            console.error('No customer data received from the response')
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log('Network error: Please check your internet connection.')
            } else {
                console.log('Login error', error.response.data)
            }
        } else {
            console.log('Unexpected error:', error)
        }

    }
}

export const refetchUser = async (setUser: any) => {
    try {
        const response = await appAxios.get(`/user`)

        setUser(response.data.user)
    } catch (error) {
        console.log('Login error', error)

    }
}

export const refresh_tokens = async () => {
    try {

        const refreshToken = tokenStorage.getString('refreshToken')
        const response = await axios.post(`${BASE_URL}/refresh-token`, {
            refreshToken
        })

        const new_access_token = response.data.accessToken
        const new_refresh_token = response.data.refreshToken

        tokenStorage.set('accessToken', new_access_token)
        tokenStorage.set('refreshToken', new_refresh_token)
        return new_access_token

    } catch (error) {
        console.log('REFRESH_TOKEN_ERROR', error)
        tokenStorage.clearAll()
        resetAndNavigate('CustomerLogin')
    }
}

export const updateUserLocation = async (data: any, setUser: any) => {
    try {
        const response = await appAxios.patch(`/user`, data)
        refetchUser(setUser)
    } catch (error) {
        console.log('updateUserLocation error', error)

    }
}