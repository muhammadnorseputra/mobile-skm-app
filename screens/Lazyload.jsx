import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

export default class LazyLoad extends Component {
    
    componentDidMount() {
      setTimeout(() => {
        this.props.navigation.replace('Dashboard');
      }, 2000)
    }

    componentWillUnmount() {
      clearTimeout();
    }

    render() {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{uri: 'https://bkpsdm.balangankab.go.id/assets/images/logo.png'}}
          />
          <ActivityIndicator/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 130,
      height: 130,
      marginBottom: 10
    },
    intro_txt: {
      marginBottom: 5,
      marginTop: 15,
      fontSize: 18,
      fontWeight: 'bold'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    intro_txt_sub: {
      marginBottom: 15,
      fontSize: 18,
      fontWeight: 'bold'
    }
  });