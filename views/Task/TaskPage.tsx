import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { List, Title } from 'react-native-paper';
import TaskItem from '../../components/TaskItem';
type Task =
    {
        title: string,
        description: string
        isDone: boolean,
    }
const TaskPage = () => {
    const [tasks, setTasks] = useState<[Task] | null>(null)
    return (

        <SafeAreaView>
            <Title>Todo list</Title>
            <ScrollView>
                {tasks != null ? tasks.map(task => {
                    return (
                        <TaskItem />
                    );
                }) : null}
            </ScrollView>
            <List.Item
                title="First Item"
                description="Item description"
                left={props => <List.Icon {...props} icon="folder" />}
            />
        </SafeAreaView>
    )
}

export default TaskPage