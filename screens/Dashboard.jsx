import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import axios from 'axios';
import { ThemeProvider, Icon, Divider, Button, Avatar} from 'react-native-elements'


function CardBox (props) {
    return (
   <View style={[styles.box, {backgroundColor: props.bgColor, height: props.height, elevation: 2, shadowColor: '#52006A'}]}>
    <Text style={[styles.title, {color: props.textColor}]}>{props.title}</Text>
    <Divider orientation="horizontal" color="rgba(0, 0, 0, 0.10)" width={1} />
    <View style={{flex:1, flexDirection: 'row', marginTop: 20, justifyContent: 'space-around'}}>
        
        <View>
            <Text style={[styles.title, {fontSize: 60, color: props.textColor}]}>{props.icon}</Text>
            {/* {props.load ? <Loading/> : ''} */}
        </View>
       
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.title, {fontSize: 60, color: props.textColor}]}>{props.value}</Text>
            <View><Text>{props.load ? <Loading/> : ''}</Text></View>
        </View>
    </View>
   </View>
   )
}
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

function Loading() {
    return <ActivityIndicator size="small" color="#276FBF"/>
}

export default function Dashboard ({navigation}) {
    const [arr, setArr] = useState([]);
    const [data, setData] = useState([]);
    const [konversi, setKonversi] = useState([]);
    const [periode, setPeriode] = useState([]);
    const [jk, setJk] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
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

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsLoading(true);
        wait(2000).then(() => {
            setRefreshing(false)
            fetchData();
        });
    }, []);

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
     <View style={{backgroundColor: '#276FBF', height:220}}>
        <View style={{flex:2, marginHorizontal: 15, paddingVertical: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            
            <View>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>IKM - Indeks Kepuasan Masyarakat</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>BKPSDM KAB. BALANGAN</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#EAF0CE', marginTop: 5}}>Dashboard</Text>
            </View>
            <View>
            <Avatar
                size="large"
                source={{
                uri:
                    'https://bkpsdm.balangankab.go.id/assets/images/logo.png',
                }}
            />
            </View>
        </View>
     </View>
     <View style={styles.container}>
        <View style={{marginTop: -100, height: 180, width: '100%'}}>
            <CardBox 
            title={arr.tahun != undefined ? `IKM ${arr.tahun} - ${isLoading ? 'Mohon Tunggu ...' : konversi.y}` : 'Mohon tunggu ...'} 
            bgColor="#2541B2" 
            textColor="#fff"
            height={170}
            icon={<Icon name='inbox' size={75} type='font-awesome' color='#78DEC7'/>}
            value={`${isLoading ? '0' : normaliseValue(data.nilai_ikm ?? '-')} (${isLoading ? '-' : konversi.x ?? 'Mohon Tunggu ...'})`}/>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <CardBox 
        title="Live Responden" 
        bgColor="#fff" 
        icon={<Icon name='users' size={75} type='font-awesome' color='#78DEC7'/>} 
        value={isLoading ? <Loading/> : arr.jml_responden} />
        
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10}}>
            <View style={{border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: 10, flex:1, marginRight: 10, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#52006A'}}>
                <Text style={[styles.title, {marginTop: 10}]}>Pria</Text>
                <Text style={{fontSize: 32, marginBottom: 40, fontWeight: 'bold'}}>{isLoading ? <Loading/> : jk.L}</Text>
            </View>
            <View style={{border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: 10, flex:1, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#52006A'}}>
                <Text style={[styles.title, {marginTop: 10}]}>Wanita</Text>
                <Text style={{fontSize: 32, marginBottom: 40, fontWeight: 'bold'}}>{isLoading ? <Loading/> : jk.P}</Text>
            </View>
        </View>

         <CardBox
         title="Jumlah Layanan"
         bgColor="#fff" 
         icon={<Icon name='industry' size={75} type='font-awesome' color='#2F5D62'/>} 
         value={isLoading ? <Loading/> : arr.jml_layanan} />
         <CardBox
         title="Jumlah Indikator"
         bgColor="#fff" 
         icon={<Icon name='bookmark' size={75} type='font-awesome' color='#D83A56'/>}  
         value={isLoading ? <Loading/> : arr.jml_indikator} />
        </ScrollView>
     </View>
        <Button
        onPress={() => navigation.navigate('Survei')}
        icon={{
            name: "check-circle",
            size: 18,
            color: "white"
        }}
        title="Isi Survei"
        buttonStyle={{backgroundColor: '#2541B2', paddingVertical:18}}
        containerStyle={{width: '100%', borderRadius: 0}}
        />
     </ThemeProvider>
 )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        marginVertical: 15,
        marginHorizontal: 15
    },
    box: {
     marginBottom: 10, borderRadius: 10, padding: 10, width: '100%'
    },  
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 0,
        textAlign: 'center'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }
});