import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {decode} from 'html-entities';
import durstenfeldShuffle from '../utils/shuffle'


const Quiz = ({ navigation }) => {
    const [questions, setQuestions] = useState()
    const [ques, setQues] = useState(0)
    const [options, setOptions] = useState([])
    const [correctOptions, setCorrectOptions] = useState([])
    const [score, setScore] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)

    const getQuiz = async () => {
        const url = 'https://opentdb.com/api.php?amount=10&type=multiple'
        const res = await fetch(url)
        const data = await res.json();
        setQuestions(data.results)
        var optionsArray = data.results.map(generateOptionsAndShuffle)
        var correctOptions = data.results.map((data) => data.correct_answer)
        setCorrectOptions(correctOptions)
        setOptions(optionsArray)
    }

    useEffect(() => {
        getQuiz()
    }, [])

    const generateOptionsAndShuffle = (_question) => {
        var options = [..._question.incorrect_answers]
        options.push(_question.correct_answer)
        options = durstenfeldShuffle(options)
        return options
    }

    const handleNextPress = () => {
        if(selectedOption === null) {
            return
        }
        if(correctOptions[ques] === options[ques][selectedOption]) {
            setScore(score+1)
        }
        setQues(ques + 1)
        setSelectedOption(null)
    }

    const handleSelect = (index) => {
        setSelectedOption(index)
    }

    const handleShowResults = () => {
        navigation.navigate('Result', {
            score: score
        })
    }

    const getRender = () => {
        if (options.length != 0 && questions)
        return (<View style={styles.parent}>
            <View style={styles.top}>
                <Text style={styles.question}>Q. 
                    {decode(questions[ques].question)}
                </Text>
            </View>
            <View style={styles.options}>
                <TouchableOpacity style={{...styles.optionButton, backgroundColor: selectedOption===0 ? '#000004' : styles.optionButton.backgroundColor}}
                    onPress={() => handleSelect(0)}>
                    <Text style={styles.option}>{decode(options[ques][0])}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.optionButton, backgroundColor: selectedOption===1 ? '#000004' : styles.optionButton.backgroundColor}}
                    onPress={() => handleSelect(1)}>
                    <Text style={styles.option}>{decode(options[ques][1])}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.optionButton, backgroundColor: selectedOption===2 ? '#000004' : styles.optionButton.backgroundColor}}
                    onPress={() => handleSelect(2)}>
                    <Text style={styles.option}>{decode(options[ques][2])}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.optionButton, backgroundColor: selectedOption===3 ? '#000004' : styles.optionButton.backgroundColor}}
                    onPress={() => handleSelect(3)}>
                    <Text style={styles.option}>{decode(options[ques][3])}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
                {
                    ques !== 9 && <TouchableOpacity
                        style={styles.button}
                        onPress={handleNextPress}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                }
                {
                    ques === 9 && <TouchableOpacity
                        style={styles.button}
                        onPress={handleShowResults}>
                        <Text style={styles.buttonText}>SHOW RESULTS</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>)
    }

    return (
        <View style={styles.container}>
            {getRender()}
        </View>
    )
}
export default Quiz

const styles = StyleSheet.create({
    container: {
        padding: 12,
        height: '100%'
    },
    top: {
        marginVertical: 16
    },
    options: {
        marginVertical: 16,
        flex: 1
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#1A759F',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginVertical: 20,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    question: {
        fontSize: 28,
    },
    option: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white'
    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#34A0A4',
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    parent: {
        height: '100%'
    }
})