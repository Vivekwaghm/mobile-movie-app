import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import { fetchMovies } from '@/services/api'

const search = () => {
 const router = useRouter()
  const {
      data : movies,
      loading: moviesLoading,
      error: moviesError
    } = useFetch(() => fetchMovies({
    query: ''
  }))
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg}  className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      <FlatList data={movies} renderItem={({item}) => 
        <MovieCard {...item}/>
      }
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent:'center',
        gap:16,
        marginVertical:16
      }}
      contentContainerStyle={{ paddingBottom: 100}}
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})