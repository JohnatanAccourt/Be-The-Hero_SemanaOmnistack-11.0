import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList , Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';


export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1); // indicar em que página começamos no caso não existe página 0
    const [loading, setLoading] = useState(false); // armazenar informações, carregando uma por vez

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        //se ele estiver true vai garante com que não faça varios loadings de uma vez

        //ele está falso no state, vai passar pela estrutura de decisão e vai passar de false para true, quando ele passar novamente nessa estrutura ele vai garantir com que não faça loading novamente enquanto não terminar a requisição
        if (loading){
            return;
        }

        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });


        // Anexa os vales da pagina anterior com a próxima página, sem isso ele vai simplesmente trocar a página
        setIncidents([...incidents, ...response.data]);
        // setIncidents(response.data);
        setTotal(response.headers['x-total-count']); 
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
          <View style={styles.header}>
              <Image source={logoImg} />
              <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{ total } casos</Text>.
              </Text>
          </View>

          <Text style={styles.title}>Bem-Vindo!</Text>
          <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

          <FlatList
            style={styles.incidentList} 
            data={ incidents }
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>
                </View>
            )}
          />

        </View>
    );
}