import { React, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function Payment() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#38a69d' }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cardápio</Text>
        </View>

        <View style={styles.floatingBoxTrad}>
          <Text style={styles.floatingTextTrad}>
            Peixe ao molho escabeche *contem gluten
          </Text>
        </View>
      </View>
      <View style={styles.containerOpcoes}>
        <View style={styles.floatingBoxVeg}>
          <Text style={styles.floatingTextVeg}>Bolinho de ervilha</Text>
        </View>
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}>
        <Text style={styles.title}>Escolha sua Opção</Text>

        <Switch
          style={styles.switchContainer}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <Text style={styles.opTrad}>Tradicional</Text>
        <Text style={styles.opVeg}>Vegetariano</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentComplete')}>
          <Text style={styles.buttonText}>Fazer pagamento</Text>
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
  containerOpcoes: {
    flex: 2,
    backgroundColor: '#38a69d',
    alignContent: 'center',
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
    fontSize: 24,
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
  switchContainer: {
    position: 'absolute',
    borderRadius: 50,
    paddingVertical: 8,
    width: '15%',
    alignSelf: 'center',
    bottom: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opTrad: {
    fontSize: 17,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '48%',
    left: 50,
  },
  opVeg: {
    fontSize: 17,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '48%',
    right: 50,
  },
  floatingBoxTrad: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    margin: 20,
    top: 5,
  },
  floatingBoxVeg: {
    flexBasis: 115,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    margin: 20,
  },
  header: {
    flex: 1,
    borderTopLeftRadius: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    left: 15,
    top: 15,
  },
  floatingTextTrad: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
  },
  floatingTextVeg: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
  },
});
