import { NavigationActions,StackActions } from "react-navigation";

export default  function(navigation){
    const resetAction = StackActions.reset({    
        index:0,
        key: 'Login',
        actions:[NavigationActions.navigate({ routeName: 'Login' })]
    })    
    navigation.dispatch(resetAction)

}