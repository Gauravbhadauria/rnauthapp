import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const navigation = useNavigation();
  const handleSignUp = values => {
    console.log('Sign Up values:', values);
    // Handle sign-up logic here
    registerUser(values);
  };

  const registerUser = async values => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const res = await axios.post('http://10.0.2.2:3300/register', data);
    if (res.data.data) {
      console.log(res.data);
      navigation.goBack();
    } else {
      console.log(res);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{username: '', password: '', confirmPassword: ''}}
        validationSchema={validationSchema}
        onSubmit={values => handleSignUp(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <Text style={styles.linkText} onPress={() => navigation.goBack()}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  button: {
    height: 50,
    width: '90%',
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Signup;
