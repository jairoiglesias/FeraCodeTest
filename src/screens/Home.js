import { useNavigation } from '@react-navigation/core'
import React, {useEffect, useState, useCallback} from 'react'
import { Keyboard, StyleSheet, Text, Image, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { mainAPI } from '../api'
import { debounce } from "lodash";


const Home = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        fetchLeagues()
    }, [])

    const fetchLeagues = async () => {

        setLoading(true)

        const {data} = await mainAPI.get('/leagues')
        
        setData(data.response)
        setLoading(false)
    }

    const fetchLeaguesByName = async (name) => {
        setLoading(true)

        const {data} = await mainAPI.get(`/leagues/${name}`)

        setData(...data.response)

        Keyboard.dismiss()

        setLoading(false)
    }

    const handleFixtureData = (league, season) => {

        navigation.navigate('Classification', {
            league: league.id,
            name: league.name,
            season: season.year
        })
    }

    const handleOnChangeText = debounce((text) => {
        fetchLeaguesByName(text)
    }, 1000)

    const _renderItem = ({item}) => {
        console.log('renderItem', item.league)
        return (
            <View 
                style={styles.cardContainer}
                // onPress={() => handleDetails(item)}
            >
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Image 
                        source={{
                            uri: item.league.logo
                        }}
                        style={{
                            width: '20%',
                            height: 80
                        }}
                        resizeMode={'center'}
                    />
                    
                    <View style={{
                        margin: 10,
                        flex: 1
                    }}>
                        <Text style={styles.leagueName}>{item.league.name}</Text>
                        <Text style={styles.countryName}>{item.country.name}</Text>
                        
                    </View>

                </View>
                
                <Text style={{fontSize: 10, marginTop: 10}}>Temporadas</Text>
                <View style={styles.seasonContainer}>
                        {item.seasons.map(season => {
                            return <TouchableOpacity 
                                style={styles.seasonItem}
                                onPress={() => handleFixtureData(item.league, season)}
                            >
                                <Text style={styles.year}>{season.year}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                    
            </View>
        )
    }

    return (
        
        <View style={styles.container}>
            
            <View style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Text style={styles.mainTitle}>Fera Code</Text>
                <Text style={[styles.subTitle]}>Football Manager</Text>
            </View>
            {/* <TextInput 
                style={styles.textInput}
                placeholder={'Busca'}
                returnKeyType={'done'}
                onChangeText={handleOnChangeText}
            /> */}
            {loading && <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size={'large'}/>
            </View>
            }
            {!loading && <FlatList 
                renderItem={_renderItem}
                data={data}
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%',
                    // backgroundColor: 'red'
                }}
            />}
        </View>
        
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: 'rgb(39, 59, 76)',
        // backgroundColor: 'rgba(139,194,76,1)',
        // backgroundColor: 'rgba(106,190,131,1)',
        backgroundColor: 'rgb(9, 92, 75)',
        flex: 1,
        padding: 10
    },
    textInput: {
        backgroundColor: 'white',
        width: '95%',
        height: 40,
        borderRadius: 10,
        marginVertical: 20,
        padding: 10
    },
    cardContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        // backgroundColor: 'rgb(75, 89, 105)',
        backgroundColor: 'rgba(222,226,209,1)',
        margin: 10,
        borderRadius: 10,
    },
    mainTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 10
    },
    subTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10
    },
    leagueName: {
        color: 'gray',
        fontWeight: 'bold',
    },
    countryName: {
        color: 'gray',
        marginTop: 5
    },
    seasonContainer: {
        margin: 5,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    seasonItem: {
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgba(53,75,94,0.8)',
        borderRadius: 10
    },
    year: {
        color: 'white',
        fontWeight: 'bold',
    }
})
