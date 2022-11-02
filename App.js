import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// UI
// import { ThemeProvider } from 'react-native-elements';

// Pages
import LazyLoad from './screens/Lazyload';
import Dashboard from './screens/Dashboard';
import Survei from './screens/Survei';
import SurveiCard from './screens/SurveiCard';

import AppIntroSlider from 'react-native-app-intro-slider';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: responsiveWidth(90),
    height: responsiveHeight(60),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: '#999',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: responsiveFontSize(1.6),
    lineHeight: 19
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 'one',
    title: 'Halo, Selamat Datang',
    text: 'SKM (Survei Kepuasan Masyarakat)\n Badan Kepegawaian dan Pengembangan Sumber Daya Manusia Kabupaten Balangan',
    image: require('./assets/images/hero-1.png'),
    // backgroundColor: '#59b2ab',
    backgroundColor: '#fff',
  },
  {
    key: 'two',
    title: 'Pedoman',
    text: 'Penilaian IKM (Indeks Kepuasan Masyarakat) Sesuai Dengan \n PERMENPAN RB No. 14 Tahun 2017',
    image: require('./assets/images/skm_menpan.png'),
    // backgroundColor: '#febe29',
    backgroundColor: '#fff',
  },
  {
    key: 'three',
    title: 'Uptodate',
    text: 'Hasil Penilaian Ditampilkan Secara Uptodate pada Aplikasi WEB & Android',
    image: require('./assets/images/hero-3.png'),
    // backgroundColor: '#22bcb5',
    backgroundColor: '#fff',
  }
];

// Stack berguna untuk routing aplikasi
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showRealApp: false
    }
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.innerContainer}>
        <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
          <Image source={item.image} style={styles.image} resizeMode='contain'/>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    AsyncStorage.setItem('@realApp', JSON.stringify(true))
  }


  render () {
    const isRealApp = AsyncStorage.getItem('@realApp')
    if (isRealApp && isRealApp !== null) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lazy">
            <Stack.Screen name="Lazy" component={LazyLoad} options={{headerShown: false}} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
            <Stack.Screen name="SurveiCard" component={SurveiCard}  options={{title: 'Pilih Formulir Survei'}}/>
            <Stack.Screen name="Survei" component={Survei}  options={{title: 'Formulir Survei', headerLeft: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } 
    return (
      <SafeAreaView style={styles.container}>
        <AppIntroSlider 
          renderItem={this._renderItem} 
          data={slides} 
          dotStyle={{ backgroundColor: '#DDD' }}
          activeDotStyle={{ backgroundColor: 'green' }} 
          renderNextButton={() => { return (<Text style={{ fontSize: responsiveFontSize(2.3), marginTop: 3, fontWeight: 'bold', color: 'green', backgroundColor: '#eee', padding: 8, borderRadius: 10 }}>Next</Text>) }}
          renderPrevButton={() => { return (<Text style={{ fontSize: responsiveFontSize(2.3), marginTop: 3, fontWeight: 'bold', color: 'green', backgroundColor: '#eee', padding: 8, borderRadius: 10 }}>Back</Text>) }}
          renderDoneButton={() => { return (<Text style={{ fontSize: responsiveFontSize(2.3), marginTop: 3, fontWeight: 'bold', color: 'black', backgroundColor: '#eee', padding: 8, borderRadius: 10 }}>Done</Text>) }} onDone={this._onDone}/>
      </SafeAreaView>
    );
    // return (<SurveiCard/>)
  }
}

