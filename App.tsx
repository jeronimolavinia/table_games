import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import TableItens from './src/table_itens';


export default function App() {

  const [departures, setDeparture] = useState<TableItens[]>([]);

  useEffect(() => {
    // O useEffect vai acessar a API
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer test_2d6a35cfcb7c41a923e4146efe9cce");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    let departuresList: TableItens[] = [];

    fetch("https://api.api-futebol.com.br/v1/ao-vivo", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(dataJson => {
        // console.log(dataJson)
        dataJson.map((departure: any) => {
          const dataDeparture: TableItens = {
            partida_id: departure['partida_id'],
            placar: departure['placar'],
            time_mandante: {
              time_id: departure['time_mandante']['time_id'],
              nome_popular: departure['time_mandante']['nome_popular'],
              sigla: departure['time_mandante']['sigla'],
              escudo: departure['time_mandante']['escudo']
            },
            time_visitante: {
              time_id: departure['time_visitante']['time_id'],
              nome_popular: departure['time_visitante']['nome_popular'],
              sigla: departure['time_visitante']['sigla'],
              escudo: departure['time_visitante']['escudo']
            },
            placar_mandante: departure['placar_mandante'],
            placar_visitante: departure['placar_visitante']
          };

          departuresList.push(dataDeparture);
        });
        setDeparture(departuresList);
        console.log(departuresList);
      })
      .catch(error => console.log('error', error));
  }, []);

  const renderDeparture = ({ item }: { item:TableItens }) => (

      <View style={styles.card}>
        
        <View style={styles.item}>

        <View style={styles.team_shieldContainer}>
          <Image contentFit="fill" style={styles.team_shield} source={{ uri: item.time_mandante.escudo }} />
          <Text style={styles.text}>{item.time_mandante.nome_popular}</Text>
        </View>

          <Text style={styles.text}>{item.placar_mandante}</Text>
          <Text style={styles.text}>x</Text>
          <Text style={styles.text}>{item.placar_visitante}</Text>
        
        <View style={styles.team_shieldContainer}>
          <Image contentFit="fill" style={styles.team_shield} source={{ uri: item.time_visitante.escudo.toString() }} />
          <Text style={styles.text}>{item.time_visitante.nome_popular}</Text>
        </View>
        </View>
      </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>COPA DO BRASIL</Text>
      <FlatList
        data={departures}
        keyExtractor={(item) => item.partida_id.toString()}
        renderItem={renderDeparture}
      />
      <StatusBar style="auto" />
      <Text style={styles.title2}>LIBERTADORES</Text>
      <Text style={styles.title3}>BRASILEIRÃO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#663399',

  },
  title1: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    alignItems: 'center',
    marginTop: 35,
    top: 15,

  },

  title2:{
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    alignItems: 'center',
   top:-405,
},
  title3:{
      color: '#fff',
      fontSize: 12,
      fontWeight: '700',
      alignItems: 'center',
     top:-225,
  },

  card: {
    backgroundColor: '#fff',
    width: 350,
    height: 150,
    borderRadius: 10,
    margin:25,
    alignItems: 'center',
    marginTop:20,
  },

  item: {
    flexDirection: 'row',
    alignItems:'center',
    
  },
  team_shield: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    margin:10
  },
  team_shieldContainer: {
    alignItems:'center',
    margin:5
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    margin:5
  }

});
 