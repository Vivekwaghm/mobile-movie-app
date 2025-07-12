import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'

const SearchBar = ({placeholder, onSearchBarPress, value,onChangeText}) => {
  return (
    <Pressable onPress={onSearchBarPress}>
    <View className='flex flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>

      <TextInput 
        onFocus={onSearchBarPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#a8b5db'
        className='flex-1 ml-2 text-white'
      />
    </View>
    </Pressable>
  )
}

export default SearchBar;

const styles = StyleSheet.create({})