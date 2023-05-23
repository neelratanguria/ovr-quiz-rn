import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Title from '../components/title'

const Home = ( { navigation }) => {
  return (
    <View style={styles.container}>
      <Title />
      <View
        style={styles.bannerContainer} >
        <Image
            source={{uri : 'https://cdni.iconscout.com/illustration/premium/thumb/giving-different-feedback-and-review-in-websites-2112230-1779230.png'}}
            style={styles.banner}
            resizeMode='cover'
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
        style={styles.button}>
        <Text
            style={styles.buttonText}
            >Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    banner: {
        height: 300,
        width: 300,
        borderRadius: 20
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 20
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 40,
        height: '100%'
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 16,
        borderRadius: 16,
        marginVertical: 20,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        // alignSelf: 'center'
    }
})