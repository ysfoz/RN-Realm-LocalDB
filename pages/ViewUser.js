import React from 'react';
import { Text, View, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
let realm;

export default class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({ path: 'UserDatabase.realm' });
    this.state = {
      input_user_id: '',
      userData: '',
    };
  }
  searchUser = () => {
    const { input_user_id } = this.state;
    console.log(this.state.input_user_id);
    var user_details = realm
      .objects('user_details')
      .filtered('user_id =' + input_user_id);
    console.log(user_details);
    if (user_details.length > 0) {
      console.log(user_details[0]);
      this.setState({
        userData: user_details[0],
      });
    } else {
      alert('No user found');
      this.setState({
        userData: '',
      });
    }
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Enter User Id"
          onChangeText={input_user_id => this.setState({ input_user_id })}
        />
        <Mybutton
          title="Search User"
          customClick={this.searchUser.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>User Id: {this.state.userData.user_id}</Text>
          <Text>User Name: {this.state.userData.user_name}</Text>
          <Text>User Contact: {this.state.userData.user_contact}</Text>
          <Text>User Address: {this.state.userData.user_address}</Text>
        </View>
      </View>
    );
  }
}