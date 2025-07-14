
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/springboot";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, useWindowDimensions, View } from "react-native";
import '../globals.css';

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const {
      data: trendingMovies,
      loading: trendingLoading,
      error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  // Determine numColumns based on screen width
  const numColumns = Math.floor(width / 120); // Adjust 120 based on your MovieCard width and desired spacing

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0" 
        resizeMode="cover" 
      />
      {moviesLoading || trendingLoading? (
        <ActivityIndicator
          size='large'
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : moviesError || trendingError? (
        <Text className="text-white text-center mt-10">Error: {moviesError?.message || trendingError?.message}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns} 
          columnWrapperStyle={{
            justifyContent: 'space-around', 
            gap: 20,
            marginBottom: 10,
          }}
          ListHeaderComponent={() => (
            <View>
              <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
              <View className="px-5"> 
                <SearchBar
                  onPress={() => router.push("/search")}
                  placeholder="Search for a movie"
                />
                {trendingMovies &&(
                  <View className="mt-10">
                    <Text className="text-lg text-white font-bold mt-5 mb-3">Trending Movies</Text>

                  </View>
                )}
                

                <FlatList className="mb-4 mt-3" 
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() =>
                  <View className="w-4"/>
                }
                data={trendingMovies} 
                renderItem={({item, index}) => 
                   <TrendingCard 
                                movie_id={item.movieId}
                                title={item.title}
                                url={item.url} 
                                index={index}
                    />
                }
                keyExtractor={(item) => item.movieId.toString()}
                
                ></FlatList>


                <Text className="text-lg font-bold mt-5 mb-3 text-white">Latest Movies</Text>

              </View>
            </View>
          )}
          renderItem={({ item }) => (
            
            <MovieCard {...item} />
          )}
          contentContainerStyle={{
            paddingHorizontal: 10, 
            paddingBottom: 32, 
          }}
          showsVerticalScrollIndicator={false}
        
        />
      )}
    </View>
  );
}