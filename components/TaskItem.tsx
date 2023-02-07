import { Text, View, StyleSheet } from "react-native"
import { Card, Button } from "react-native-paper";
import { Task } from "../constants/types"

const TaskItem = (props: Task) => {
    const { title, description, isDone } = props
    return (
        <Card style={styles.item}>
            <Card.Title title={title} subtitle={description}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default TaskItem