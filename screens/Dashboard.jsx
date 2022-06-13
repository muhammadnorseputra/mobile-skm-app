import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import { ThemeProvider, Icon, Divider, Button, Avatar} from 'react-native-elements'


function CardBox (props) {
    return (
   <View style={[styles.box, {backgroundColor: props.bgColor}]}>
    <Text style={[styles.title, {color: props.textColor}]}>{props.title}</Text>
    <Divider orientation="horizontal" width={1} />
    <View style={{flex:1, flexDirection: 'row', marginTop: 20, justifyContent: 'space-around'}}>
        
        <View>
            <Text style={[styles.title, {fontSize: 60, color: props.textColor}]}>{props.icon}</Text>
            {/* {props.load ? <Loading/> : ''} */}
        </View>
       
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.title, {fontSize: 50, color: props.textColor}]}>{props.value}</Text>
            <View><Text>{props.load ? <Loading/> : ''}</Text></View>
        </View>
    </View>
   </View>
   )
}

function Loading() {
    return <ActivityIndicator size="large"/>
}

export default function Dashboard ({navigation}) {
    const [arr, setArr] = useState([]);
    const [data, setData] = useState([]);
    const [konversi, setKonversi] = useState([]);
    const [periode, setPeriode] = useState([]);
    const [jk, setJk] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    
    useEffect(() => {
    const fetchData = async () => {
        const result = await axios.get(
            'https://bkpsdm-skm.balangankab.go.id/api/ikm',
        );
    
        setArr(result.data);
        setData(result.data['data']);
        setKonversi(result.data['data']['nilai_konversi']);
        setPeriode(result.data['periode']);
        setJk(result.data['jenis_kelamin']);
        setIsLoading(false);
    };
    
    fetchData();
    }, [axios]);

    const normaliseValue = function(value, decimals = 2) {
        if (!value) {
          return <Loading/>
        }
        if (value === '.') {
          return value = '0.'
        }
        const parsed = parseFloat(value).toFixed(2)
        if (isNaN(parsed)) {
          return '0'
        }
        return parsed
      }

return (
    <ThemeProvider>
    <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
    />
     <View style={{backgroundColor: '#DEEDF0', height:180}}>
        <View style={{flex:2, marginHorizontal: 15, paddingVertical: 25, flexDirection: 'row', justifyContent: 'start', alignItems: 'start'}}>
            <View>
            <Avatar
                size="large"
                source={{
                uri:
                    'http://web.bkppd-balangankab.info/assets/images/logo.png',
                }}
            />
            </View>
            <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>IKM (Indeks Kepuasan Masyarakat)</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#444'}}>BKPPD BALANGAN</Text>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#2541B2', marginTop: 5}}>Dashboard</Text>
            </View>
        </View>
     </View>
     <View style={styles.container}>
        
        <View style={{marginTop: -80, width: '100%'}}>
            <CardBox 
            load={isLoading}
            title={arr.tahun != undefined ? `IKM ${arr.tahun}` : 'Mohon tunggu ...'} 
            bgColor="#2541B2" 
            textColor="#fff"
            icon={normaliseValue(data.nilai_ikm)} 
            value={konversi.x}/>
        </View>
         <CardBox 
         load={isLoading}
         title="Responden" 
         bgColor="#fff" 
         icon={<Icon size="30" name='users' type='font-awesome' color='#78DEC7'/>} 
         value={arr.jml_responden} />
        
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10}}>
            <View style={{border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: 10, flex:1, marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.title, {marginTop: 10}]}>Lakian</Text>
                <Text style={{fontSize: 60}}>{isLoading ? <Loading/> : jk.L}</Text>
            </View>
            <View style={{border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: 10, flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.title, {marginTop: 10}]}>Binian</Text>
                <Text style={{fontSize: 60}}>{isLoading ? <Loading/> : jk.P}</Text>
            </View>
        </View>

         <CardBox
         load={isLoading} 
         title="Jumlah Layanan" 
         bgColor="#fff" 
         icon={<Icon size="30" name='industry' type='font-awesome' color='#2F5D62'/>} 
         value={arr.jml_layanan} />
         <CardBox
         load={isLoading} 
         title="Jumlah Indikator" 
         bgColor="#fff" 
         icon={<Icon size="30" name='bookmark' type='font-awesome' color='#D83A56'/>}  
         value={arr.jml_indikator} />
         <Button
            onPress={() => navigation.navigate('SurveiCard')}
            icon={{
                name: "check-circle",
                size: 18,
                color: "white"
            }}
            title="Isi Survei"
            buttonStyle={{backgroundColor: '#2541B2'}}
            containerStyle={{width: '100%', borderRadius: 10}}
            />
        
     </View>
     </ThemeProvider>
 )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
        marginVertical: 15,
        marginHorizontal: 15
    },
    box: {
        border: '1px solid #ccc', marginBottom: 10, borderRadius: 10, padding: 10, width: '100%'
    },  
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,

    }
});