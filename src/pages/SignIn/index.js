import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const [inputSenha, setInput] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const navigation = useNavigation();

  //Sistema provisório de Autenticação
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  //-------------------------------------------
  //Feedback pro usuário
  const [errorMessage, setErrorMessage] = useState('');
  //--------------------------------------------

  const handleLogin = () => {
    // Simulação de uma chamada assíncrona (substitua por uma chamada de autenticação real)
    setTimeout(() => {
      if (username === 'usuario' && password === 'senha') {
        // Credenciais corretas, permitir o login
        setIsLoginSuccessful(true);
        setErrorMessage('');
      } else {
        // Credenciais incorretas, exibir mensagem de erro
        setIsLoginSuccessful(false);
        setErrorMessage('Credenciais incorretas. Tente novamente.');
      }
    }, 1000); // Simula uma verificação assíncrona, substitua por uma chamada de autenticação real.
  };

  useEffect(() => {
    if (errorMessage !== '') {
      const errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Limpa a mensagem de erro após 5 segundos (ajuste conforme necessário)
      return () => clearTimeout(errorTimeout);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          onChangeText={(texto) => setUsername(texto)}
          value={username}
          placeholder="Digite seu email..."
          style={styles.input}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          onChangeText={(texto) => setPassword(texto)}
          value={password} // Use o valor de password como valor padrão
          secureTextEntry={hidePass}
          placeholder="Sua Senha"
          style={styles.inputSenha}
        />
        <TouchableOpacity
          style={styles.icons}
          onPress={() => setHidePass(!hidePass)}>
          <Ionicons name="eye" color="#FFF" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        {isLoginSuccessful && (
          <Text style={styles.successText}>Login feito!</Text>
        )}
        {errorMessage !== '' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.buttonEsqueci}>
          <Text style={styles.registerText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
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
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  inputSenha: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  icons: {
    width: '15%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2E8B57',
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  buttonEsqueci: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',
  },
});
