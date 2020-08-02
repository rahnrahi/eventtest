import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import {
  Dashboard as DashboardView,
  SignIn as SignInView,
} from '../../views';
const noAuthreqRoutes = ['/sign-in', '/sign-up' ]

class RouteWithLayout extends Component {

  constructor(props){
      super(props)
      this.state = {
        authInvalid: false
      }
  }

  async checkLogin(prevProps){
  
      let pathname = this.props.location.pathname
      let doespathexist = noAuthreqRoutes.includes(pathname)
      if(!doespathexist){
        let token = await localStorage.getItem('token') 
        this.setState({authInvalid: !token})

      }
      console.log('Route change!', this.props.location.pathname,  doespathexist);
    
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkLogin(prevProps)
    }
  }

  async componentDidMount(prevProps){
    this.checkLogin(prevProps)
  }

  render() {
    const { layout: Layout, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            {this.state.authInvalid? (<SignInView {...matchProps} />): <Component {...matchProps} />}
          </Layout>
        )}
      />
    )
  }

}


// const RouteWithLayout = props => {
//   const { layout: Layout, component: Component, ...rest } = props;

//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <Layout>
//           <Component {...matchProps} />
//         </Layout>
//       )}
//     />
//   );
// };

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
