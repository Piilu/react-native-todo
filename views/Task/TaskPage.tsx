import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Button, FAB, List, TextInput, Title } from 'react-native-paper';
import TaskItem from '../../components/TaskItem';
import NoItems from '../../constants/NoItems';
import { Task } from '../../constants/types';

const TaskPage = ({ navigation }) => {
    const [tasks, setTasks] = useState<Task[] | []>([])

    const handleAddTask = (): void => {
        setTasks((currentTasks) => [
            { description: "message.user", title: "message.message", isDone: false }, ...currentTasks
        ]); // find a way to fix the type safety 
    }
    return (

        <SafeAreaView style={styles.container}>
            <View style={{ padding: 10 }}>
                <Title style={styles.sectionTitle}>Today's Tasks</Title>
            </View>
            <View style={styles.items}>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={<NoItems />}
                    data={tasks}
                    renderItem={({ item }) => <TaskItem title={item.title} description={item.description} isDone={item.isDone} />
                    }
                />
            </View>
            <View style={styles.bottomIsland}>

                <TextInput mode='outlined' label="Task ..." style={{ flexGrow: 1 }} />

                <FAB
                    style={{ marginLeft: 20, backgroundColor: "lightgreen" }}
                    icon="plus"
                    onPress={() => handleAddTask()}
                />
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8EAED',
        flex: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    items: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
    },
    bottomIsland: {
        display: "flex",
        flexDirection: "row",
        position: 'absolute',
        bottom: 20,
        right: 0,
        left: 0,
        margin: 20,
        padding: 10,
    },
});

export default TaskPage