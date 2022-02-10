import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

import { mainAPI } from '../api';

const Classification = props => {

    const [standingData, setStandingData] = useState({})
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    const route = useRoute()

    const fetchStandingData = async () => {

        setLoading(true)

        const options = {
            method: 'GET',
            url: '/standings',
            params: {
                league: route.params.league,
                season: route.params.season
            }
        }

        console.log('OPTIONS', options)
        
        const {data} = await mainAPI.request(options)

        setStandingData(data.response[0].league.standings[0])
        setLoading(false)
    }

    useEffect(() => {
        fetchStandingData()
    }, [])

    const handleTeamDetail = (item) => {

        navigation.navigate('TeamDetail', item)
    }

    const FlatListHeader = () => {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <View style={{flexDirection: 'row', width: '40%', alignItems: 'center'}}>
                    <Text style={[styles.text, {marginHorizontal: 10}]}>Time</Text>
                </View>
                <Text style={[styles.text]}>P</Text>
                <Text style={[styles.text]}>J</Text>
                <Text style={[styles.text]}>V</Text>
                <Text style={[styles.text]}>E</Text>
                <Text style={[styles.text]}>D</Text>
                <Text style={[styles.text]}>GP</Text>
                <Text style={[styles.text]}>GC</Text>
            </View>
        )

    }

    const _renderItem = ({item}) => {
        
        return (
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginVertical: 10
                }}
                onPress={() => handleTeamDetail(item)}
                >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between'
                    }}
                >
                    <View style={{flexDirection: 'row', width: '40%', alignItems: 'center'}}>
                        <Text style={[styles.text, {marginHorizontal: 10}]}>{item.rank}</Text>
                        <Image 
                            source={{
                                uri: item.team.logo
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                marginRight: 10,
                            }}
                            resizeMode={'contain'}
                        />
                        <Text style={[styles.text, {width: '50%'}]} >{item.team.name}</Text>
                    </View>
                    <Text style={[styles.text]}>{item.points}</Text>
                    <Text style={[styles.text]}>{item.all.played}</Text>
                    <Text style={[styles.text]}>{item.all.win}</Text>
                    <Text style={[styles.text]}>{item.all.draw}</Text>
                    <Text style={[styles.text]}>{item.all.lose}</Text>
                    <Text style={[styles.text]}>{item.all.goals.for}</Text>
                    <Text style={[styles.text]}>{item.all.goals.against}</Text>
                </View>
                {/* <Text style={[styles.text, {fontSize: 20}]}>{item.goals.home} - {item.goals.away}</Text> */}
                
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                <Text style={styles.title}>{route.params.name}</Text>
                <Text style={styles.title}>Ano {route.params.season}</Text>
            </View>

            {loading && <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size={'large'}/>
            </View>
            }

            {!loading && <FlatList 
                renderItem={_renderItem}
                data={standingData}
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%',
                    marginVertical: 10
                }}
                ListHeaderComponent={FlatListHeader}
            />}

        </View>
    )
}

export default Classification

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        // textAlign: 'justify',
        fontSize: 12
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
})
