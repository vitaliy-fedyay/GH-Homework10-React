import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers/history';
import { alertActions } from './../actions/alert.actions';
import { PrivateRoute } from './../components/PrivateRoute';
import { HomePage } from './../_HomePage/HomePage';
import { LoginPage } from './../_LoginPage/LoginPage';
import { RegisterPage } from './../_RegisterPage/RegisterPage';
import { SettingPage } from './../_SettingPage/SettingPage';
import { ToDoPage } from './../_ToDoPage/ToDoPage';

const Wrapper = {
  marginTop: "6%"
}

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (

      <div style={Wrapper} className="container">
        <div>
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path="/setting" component={SettingPage} />
              <PrivateRoute path="/todo" component={ToDoPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </div>
          </Router>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 