import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Select2 from "react-native-select-two"

const JK_SELECT = [
    { id: 1, name: "Laki - Laki" }, // set default checked for render option item
    { id: 2, name: "Perempuan" },
  ]

export default function Survei() {
 return (
     <SafeAreaView>
        <View style={{backgroundColor: '#fff', paddingTop: 10, paddingLeft: 5, paddingRight:5}}>
         <Input
         label="Nama Lengkap"
         leftIcon={<Icon name='user' type='font-awesome' color='#78DEC7'/>}
         placeholder='Masukan Nama Lengkap'
        />
        <Input
         label="Umur"
         leftIcon={<Icon name='user' type='font-awesome' color='#78DEC7'/>}
         placeholder='Masukan Umur Saat Ini'
        />
        
        
        </View>
        <View style={{backgroundColor: '#fff', paddingLeft: 5, paddingRight:5}}>
        <Text style={{fontWeight: 'bold', color: '#999', marginLeft: 10}}>Jenis Kelamin</Text>
        <Select2
          isSelectSingle
          style={{ borderRadius: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, paddingLeft: 8, paddingRight: 8, marginLeft: 8, width: '95%' }}
          colorTheme="#000"
          showSearchBox={false}
          popupTitle="Jenis Kelamin"
          title="Pilih Jenis Kelamin"
          cancelButtonText="Batal"
          selectButtonText="Pilih"
          data={JK_SELECT}
          onSelect={data => {
            setData({ data })
          }}
        />
        </View>
        <View style={{backgroundColor: '#fff', paddingLeft: 5, paddingRight:5, paddingTop: 25}}>
        <Text style={{fontWeight: 'bold', color: '#999', marginLeft: 10}}>Jenis Layanan</Text>
        <Select2
          isSelectSingle
          style={{ borderRadius: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, paddingLeft: 8, paddingRight: 8, marginLeft: 8, width: '95%' }}
          colorTheme="#000"
          showSearchBox={false}
          popupTitle="Jenis Layanan"
          title="Pilih Jenis Layanan"
          cancelButtonText="Batal"
          selectButtonText="Pilih"
          data={JK_SELECT}
          onSelect={data => {
            setData({ data })
          }}
        />
        </View>
     </SafeAreaView>
 )   
}