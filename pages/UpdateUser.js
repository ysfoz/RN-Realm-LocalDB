import React from 'react';
import {
  View,
  YellowBox,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
let realm;

export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({ path: 'UserDatabase.realm' });
    this.state = {
      input_user_id: '',
      user_name: '',
      user_contact: '',
      user_address: '',
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
      this.setState({
        user_name: user_details[0].user_name,
      });
      this.setState({
        user_contact: user_details[0].user_contact,
      });
      this.setState({
        user_address: user_details[0].user_address,
      });
    } else {
      alert('No user found');
      this.setState({
        user_name: '',
      });
      this.setState({
        user_contact: '',
      });
      this.setState({
        user_address: '',
      });
    }
  };
  updateUser = () => {
    var that = this;
    const { input_user_id } = this.state;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    if (input_user_id) {
      if (user_name) {
        if (user_contact) {
          if (user_address) {
            realm.write(() => {
              var ID = this.state.input_user_id;
              console.log('ID', ID);
              var obj = realm
                .objects('user_details')
                .filtered('user_id =' + this.state.input_user_id);
              console.log('obj', obj);
              if (obj.length > 0) {
                obj[0].user_name = this.state.user_name;
                obj[0].user_contact = this.state.user_contact;
                obj[0].user_address = this.state.user_address;
                Alert.alert(
                  'Success',
                  'User updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('User Updation Failed');
              }
            });
          } else {
            alert('Please fill Address');
          }
        } else {
          alert('Please fill Contact Number');
        }
      } else {
        alert('Please fill Name');
      }
    } else {
      alert('Please fill User Id');
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter User Id"
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Search User"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.user_name}
              onChangeText={user_name => this.setState({ user_name })}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={'' + this.state.user_contact}
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.user_address}
              placeholder="Enter Address"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
            <Mybutton
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}