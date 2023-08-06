import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './src/routes';
import Toast from './src/components/Toast/toast';


export default function App() {

    return (
        <>
            <Toast />
            <NavigationContainer>
                <Routers />
            </NavigationContainer>
        </>
    );
}
