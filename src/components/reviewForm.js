import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';

const reviewSchema = yup.object ({
  title: yup.string().required().min(4),
  thing: yup.string().required().min(3),
  email: yup.string().required()
})


export default function ReviewForm({ addReview }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', email: '', thing: '', numberOfThings: '', timeFrom: '', timeTo: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addReview(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Imie i nazwisko'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
              onBlur={props.handleBlur('title')}
            />

            <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>

            <TextInput
              style={globalStyles.input}
              placeholder='email'
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              keyboardType='email-address'
              onBlur={props.handleBlur('email')}
           />

            <Text style={globalStyles.errorText}>{ props.touched.email && props.errors.email }</Text>

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='nazwa rzeczy'
              onChangeText={props.handleChange('thing')}
              value={props.values.thing}
              onBlur={props.handleBlur('thing')}
            />

            <Text style={globalStyles.errorText}>{ props.touched.thing &&  props.errors.thing }</Text>

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='ilosc rzeczy'
              onChangeText={props.handleChange('numberOfThings')}
              value={props.values.numberOfThings}
              keyboardType='numeric'
            />    

            <TextInput 
              style={globalStyles.input}
              placeholder='Wprowadz date od'
              onChangeText={props.handleChange('timeFrom')}
              value={props.values.timeFrom}
            />
            
            <TextInput 
              style={globalStyles.input}
              placeholder='Wprowadz date od'
              onChangeText={props.handleChange('timeTo')}
              value={props.values.timeTo}
            />
            

            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}