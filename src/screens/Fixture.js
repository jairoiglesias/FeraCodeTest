import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

import { mainAPI } from '../api';

const Fixture = props => {

    const [fixtureData, setFixtureData] = useState({})
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    const route = useRoute()

    const fetchFixtureData = async () => {

        setLoading(true)

        const options = {
            method: 'GET',
            url: '/fixtures',
            params: {
                league: route.params.league,
                season: route.params.season
            }
        }
        
        const {data} = await mainAPI.request(options)
        // console.log('$$$$$$')
        // console.log(JSON.stringify(data))
        setFixtureData(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchFixtureData()
    }, [])

    const handleMatchDetail = (item) => {

        navigation.navigate('MatchDetail', {
            item
        })
    }

    const _renderItem = ({item}) => {
        console.log('renderItem', item)
        return (
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: 10
                }}
                onPress={() => handleMatchDetail(item)}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: '40%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={[styles.text]}>{item.teams.home.name}</Text>
                    <Image 
                        source={{
                            uri: item.teams.home.logo
                        }}
                        style={{
                            width: 40,
                            height: 40
                        }}
                        resizeMode={'contain'}
                    />
                </View>
                <Text style={[styles.text, {fontSize: 20}]}>{item.goals.home} - {item.goals.away}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '40%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Image 
                        source={{
                            uri: item.teams.away.logo
                        }}
                        style={{
                            width: 40,
                            height: 40
                        }}
                        resizeMode={'contain'}
                    />
                    <Text style={[styles.text]}>{item.teams.away.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{route.params.name}</Text>
            <Text style={styles.title}>Ano {route.params.season}</Text>

            {loading && <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size={'large'}/>
            </View>
            }

            {!loading && <FlatList 
                renderItem={_renderItem}
                data={fixtureData.response}
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%',
                    marginVertical: 10
                    // backgroundColor: 'red'
                }}
            />}

        </View>
    )
}

export default Fixture

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: 'rgb(39, 59, 76)',
        backgroundColor: 'rgb(9, 92, 75)',
        flex: 1,
        padding: 10
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5
    },
    text: {
        color: 'white',
        textAlign: 'justify',
        fontSize: 13
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
})
