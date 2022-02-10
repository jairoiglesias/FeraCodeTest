import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, ScrollView, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

import { mainAPI } from '../api';

const TeamDetail = props => {

    const [teamData, setTeamData] = useState({})
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    const route = useRoute()

    const fetchTeamData = async () => {
        setLoading(true)

        const options = {
            method: 'GET',
            url: '/teams',
            params: {
                id: route.params.team.id
            },
        }
        
        const {data} = await mainAPI.request(options)
        
        console.log('$$$$$$')
        console.log(JSON.stringify(data))

        setTeamData(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchTeamData()
    }, [])

    const ItemDetail = ({label, text}) => {
        return (
            <View style={{marginVertical: 5, flexDirection: 'row'}}>
                <Text style={styles.label}>{label}: </Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }

    const BackButton = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text style={[styles.text, {
                    fontSize: 16,
                    marginHorizontal: 10,
                    marginVertical: 30,
                    color: 'white'
                }]}>{'Voltar'}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {loading && <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size={'large'}/>
            </View>
            }

            {!loading && teamData.response && <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%'
                }}
            >
            <BackButton />
            <Image 
                source={{
                    uri: teamData.response[0].team.logo
                }}
                style={{
                    width: 150,
                    height: 150,
                    alignSelf: 'center'
                }}
                resizeMode='contain'
            />

            <View style={{
                marginVertical: 20,
                flex: 1,
                width: '90%',
                backgroundColor: 'rgba(222,226,209,1)',
                alignSelf: 'center',
                borderRadius: 3
            }}>
                <Text style={[styles.text, {fontSize: 15, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10}]}>Dados do Time</Text>
                <ItemDetail label={'Nome'} text={teamData.response[0]?.team?.name}/>
                <ItemDetail label={'País'} text={teamData.response[0]?.team?.country}/>
                <ItemDetail label={'Ano de Fundação'} text={teamData.response[0]?.team?.founded}/>

            </View>

            <View style={{
                marginVertical: 20,
                flex: 1,
                width: '90%',
                backgroundColor: 'rgba(222,226,209,1)',
                alignSelf: 'center',
                borderRadius: 3
            }}>
                <Text style={[styles.text, {fontSize: 15, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10}]}>Dados do Estádio</Text>
                <ItemDetail label={'Nome'} text={teamData.response[0]?.venue?.name}/>
                <ItemDetail label={'Endereço'} text={teamData.response[0]?.venue?.address}/>
                <ItemDetail label={'Cidade'} text={teamData.response[0]?.venue?.city}/>
                <ItemDetail label={'Capacidade'} text={teamData.response[0]?.venue?.capacity}/>
                <Image 
                    source={{
                        uri: teamData.response[0].venue.image
                    }}
                    style={{
                        width: 'auto',
                        height: 150,
                        margin: 10
                        // alignSelf: 'center'
                    }}
                    resizeMode='stretch'
                />
            </View>
            
            {/* <View style={{
                margin: 10,
                flex: 1
            }}>
                <ItemDetail label={'Descrição'} text={movieDetails.plot}/>
                <ItemDetail label={'Ano'} text={movieDetails.year}/>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ItemDetail label={'Duração'} text={movieDetails.length}/>
                    <ItemDetail label={'Nota'} text={movieDetails.rating}/>
                </View>

                <Text style={styles.label}>Elenco</Text>
                {movieDetails.cast?.map(castItem => {
                    return <View 
                        key={castItem.actor_id}
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={styles.text}>{castItem.actor}</Text>
                        <Text style={[styles.text, {fontWeight: '500', marginLeft: 10}]}>({castItem.character})</Text>
                    </View>
                })}
            </View> */}
                </ScrollView>
            </>}
        </View>
    )
}

export default TeamDetail

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgb(9, 92, 75)',
        flex: 1,
        padding: 10
    },
    label: {
        // color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
        marginHorizontal: 10
    },
    text: {
        // color: 'white',
        textAlign: 'justify',
        fontSize: 13
    },
})
