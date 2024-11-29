import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";


export const navigationRef = createNavigationContainerRef()

export async function navigate(routName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routName, params))
    }
}

export async function replace(routName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routName, params))
    }
}

export async function resetAndNavigate(routName: string) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset(
            {
                index: 0,
                routes: [{ name: routName }]
            }
        ))
    }
}

export async function goBack() {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack())
    }
}

export async function push(routName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routName, params))
    }
}

export async function prepareNavigation() {
    navigationRef.isReady();
}
