import { EposDoksulNavigationParams, EposDoksulRoutes } from './doksul.navigation.type';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { EposRealmProvider } from '../../../src/database';
import { AdditionalInsuranceStatementScreen, ConfirmProductDoksulScreen, DoksulDocumentScreen, DoksulScreen, LandingDoksulScreen, LinkedSubmitDoksulScreen, MarketersInteractionScreen } from '../../screen';

const EposDoksulStack = createStackNavigator<EposDoksulNavigationParams>();

const _EposDoksulNavigation = () => {
  return (
    // <EposRealmProvider>
    <EposDoksulStack.Navigator
      initialRouteName={EposDoksulRoutes.LANDING_DOKSUL}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="none"
    >
      <EposDoksulStack.Screen name={EposDoksulRoutes.LANDING_DOKSUL} component={LandingDoksulScreen} />
      <EposDoksulStack.Screen name={EposDoksulRoutes.DOKSUL} component={DoksulScreen} />
      <EposDoksulStack.Screen name={EposDoksulRoutes.MARKETERS_INTERACTION} component={MarketersInteractionScreen} />
      <EposDoksulStack.Screen name={EposDoksulRoutes.CONFIRM_PRODUCT_DOKSUL} component={ConfirmProductDoksulScreen} />
      <EposDoksulStack.Screen name={EposDoksulRoutes.ADDITIONAL_INSURANCE_STATEMENT} component={AdditionalInsuranceStatementScreen} />
      <EposDoksulStack.Screen name={EposDoksulRoutes.DOKSUL_DOCUMENT} component={DoksulDocumentScreen} />
    </EposDoksulStack.Navigator>
    // </EposRealmProvider>
  );
};

// export const EposDoksulNavigation = [{ name: EposDoksulRoutes.EPOSDOKSUL, component: _EposDoksulNavigation }];
export default _EposDoksulNavigation
