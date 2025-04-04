import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState,  useEffect} from 'react'

//This component allows the user to search for city 
export default function CitySearch({onCitySelect}) {

  //this use state is used to track the text input by a user
  const[searchText, setSearchText]= useState('')

  //this use state is used to store all the cities we will get when we make an API calls

  const [cities, setCities]=useState([])

  //loading states thiswill be called when the data being fetched is loading...this allows us to make use of the Activity indicator
  // inital start is false, bacause we don not want it to be loading
  const[loading, setLoading]=useState(false)


  const handleSearchText =(text)=>{
    setSearchText(text)
  }

// creating a function that will bring out a list of cities that will match the city the user search


    const searchCities = async(text)=>{
      if(text.legnth < 3){
        setCities([])
        return
      }

      setLoading(true)
      try {
        const response = await  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${text}&limit=10`,{
          headers:{
            'x-RapidAPI-Key': '55cdab37e8msh5ec0cbf3a901877p13889djsn1a96586e38a7',
            'x-RapidAPI-Host':'wft-geo-db.p.rapidapi.com'
          }
        })

        const data = await response.json()

        if(data && data.data && Array.isArray(data.data)){
          const cityList = data.data.map(city => city.name)
          setCities(cityList)
        }else{
          setCities([
            'New York','London', 'Tokyo','Paris', 'Sydney', 'Berlin', 'Moscow','Dubai', 'Singapore','Barcelona'
          ].filter(city=>city.toLowerCase().includes(text.toLowerCase)()))
        }
      } 
      catch(error){
        console.error('Error searching cities:', error)
        setCities([
          'New York','London', 'Tokyo','Paris', 'Sydney', 'Berlin', 'Moscow','Dubai', 'Singapore','Barcelona'
        ].filter(city=>city.toLowerCase().includes(text.toLowerCase())))
      } finally {
        setLoading(false)
      }
  
    }
  
    useEffect(()=>{
      const timeOutId =setTimeout(()=>{
        searchCities(searchText)
      }, 500)

      return ()=> clearTimeout(timeOutId)
    }, [searchText])

    const handleCityPress = (city)=>{
      onCitySelect(city)
      setSearchText('')
      setCities([])
    }


  return (
    <View style={styles.container}>
      <Text style ={styles.label}>Enter City Name</Text>
      <TextInput
      style={styles.input}
      placeholder='Type a city name...'
      value={searchText}
      onChangeText={handleSearchText}
      />
      {
        loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size='small'
            color='black'
          />
        )
      }
      {
      cities.length > 0  && (
        <FlatList
          data={cities}
          keyExtractor={(item,index)=>`city- ${index}`}
          style= {styles.cityList}
          renderItem={({item})=>(
            <TouchableOpacity onPress={()=>
              handleCityPress(item) 
            } style ={styles.cityItem}>
              <Text>{item}</Text>
            </TouchableOpacity>
            )}
        />
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 20,
  },

  label:{
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '700',
    color:'#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor:'#fff'
  },

  loadingIndicator:{
    marginTop: 10
  },

  cityList:{
    marginTop: 8,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    backgroundColor:'white'
  },

  cityItem :{
    padding:12,
    borderBottomWidth: 1,
    borderBottomColor:'#f0f0f0',
  },

  cityName: {
    fontSize:16
  }
})