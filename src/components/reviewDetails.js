import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles, images } from '../../styles/global.js';
import Card from '../shared/card';

export default function ReviewDetails({ navigation }) {
  
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { navigation.getParam('title') }
        </Text>
        <Text>{ navigation.getParam('email') }</Text>
        <Text>{ navigation.getParam('thing') }</Text>
        <Text>{ navigation.getParam('numberOfThings') }</Text>
        <Text>{ navigation.getParam('timeFrom') }</Text>
        <Text>{ navigation.getParam('timeTo') }</Text>
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});