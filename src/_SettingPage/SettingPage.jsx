import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';

class SettingPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.name}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.items &&
          <ul>
            {users.items.map((user, index) =>
              <li key={user.id}>
                {user.name + ' ' + user.surname}
                {
                  user.deleting ? <em> - Deleting...</em>
                    : user.deleteError ? <span className="error"> - ERROR: {user.deleteError}</span>
                      : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                }
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedSettingPage = connect(mapStateToProps)(SettingPage);
export { connectedSettingPage as SettingPage };