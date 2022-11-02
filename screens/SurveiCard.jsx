import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

export default function SurveiCard({navigation}) {
 return (
     <View style={styles.container}>
         <Card style={{flex: 1}}>
            <Card.Title style={{fontSize: 120}}>
                <Icon
                    name='archive-outline'
                    type='ionicon'
                    color='#517fa4'
                    size={80}
                    />
            </Card.Title>
            <Card.Divider/>
            {/* <Card.Image source={require('../images/pic2.jpg')}> */}
                <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold', align: 'center'}}>
                BKPSDM KAB. BALANGAN
                </Text>
                <Text>
                Formulir Elektronik IKM (Indeks Kepuasan Masyarakat) Badan Kepegawaian dan Pengembangan Sumber Daya Manusia.
                </Text>
                <Button
                onPress={() => navigation.navigate('Survei')}
                icon={<Icon name='check-circle' style={{marginRight: 15}} type="font-awesome" color='#ffffff' />}
                buttonStyle={{borderRadius: 10, marginTop: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Lanjutkan' />
            {/* </Card.Image> */}
        </Card>
     </View>
 )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
});