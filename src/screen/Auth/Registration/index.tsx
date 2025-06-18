import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {RegistrationSchema} from '../utils/validations';
import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import Input from '../../../common/components/Input/index';
import DefaultButton from '../../../common/components/DefaultButton/index';
import auth from '@react-native-firebase/auth';
import styles from '../styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigation} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';

interface ITouched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}
interface IRegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const registrateUser = async (
    email: string,
    password: string,
    formikHelpers: FormikHelpers<IRegistrationForm>,
  ) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('result: ', result);
      if (result.user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: ScreenNames.LOGGED_IN_STACK}],
          }),
        );
      }
    } catch (e: any) {
      console.log('e', e);
      if (e.code === 'auth/email-already-in-use') {
        formikHelpers.setErrors({email: 'email-already-in-use'});
      }
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('user: ', user);
    });

    return subscriber;
  }, []);

  return (
    <AuthLayout>
      <AuthHeader activeTab={'registration'} />
      <Formik<IRegistrationForm>
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(value, formikHelpers) => {
          registrateUser(value.email, value.password, formikHelpers);
        }}
        validationSchema={RegistrationSchema()}>
        {({
          values,
          setFieldValue,
          handleSubmit,
          isValid,
          errors,
        }: FormikValues) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() =>
                  setTouched(prevState => ({...prevState, email: true}))
                }
                value={values.email}
                onChangeText={value => {
                  setFieldValue('email', value);
                }}
                placeholder={'Email'}
                error={touched.email && errors.email}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({...prevState, password: true}))
                }
                value={values.password}
                onChangeText={value => {
                  setFieldValue('password', value);
                }}
                secureTextEntry={true}
                placeholder={'Password'}
                error={touched.password && errors.password}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({
                    ...prevState,
                    confirmPassword: true,
                  }))
                }
                value={values.confirmPassword}
                onChangeText={value => {
                  setFieldValue('confirmPassword', value);
                }}
                secureTextEntry={true}
                placeholder={'Confirm password'}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </View>
            <DefaultButton
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
              onPress={handleSubmit}
              text={'Зарееструватись'}
            />
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
