import { React, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import QRCode from 'react-native-qrcode-svg';

export default function PaymentComplete() {
  const navigation = useNavigation();
  const [qrvalue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <QRCode
          style={styles.qrTitle}
          value={
            qrvalue ? qrvalue : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
          size={250}
          color="black"
          backgroundColor="white"
        />
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}>
        <Text style={styles.title}>Obrigado por comprar com nosso app</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  containerLogo: {
    flex: 3,
    backgroundColor: '#38a69d',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: '#a1a1a1',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#6495ED',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  qrtitle: {
    alignSelf: 'center',
  },
});
