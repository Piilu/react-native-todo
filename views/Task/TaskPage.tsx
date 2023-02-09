import { async } from '@firebase/util';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Modal, Pressable, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, FAB, List, TextInput, Title, TouchableRipple } from 'react-native-paper';
import TaskItem from '../../components/TaskItem';
import NoItems from '../../constants/NoItems';
import { Task } from '../../constants/types';
import { auth, db } from '../../firebase';

const TaskPage = ({ navigation }) => {
    const [tasks, setTasks] = useState<Task[] | []>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [addErrorVisible, setAddErrorVisible] = useState<"none" | "flex">("none");
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async (): Promise<void> => {
        const colRef = collection(db, "tasks")
        const q = query(colRef, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ title: doc.data().name, id: doc.id })
        });
        setTasks(data);
    }

    const handleAddTask = async (): Promise<void> => {
        if (taskTitle.trim() !== "") {
            setAddErrorVisible("none");
            await addDoc(collection(db, "tasks"), {
                name: "test",
                userId: auth.currentUser.uid
            }).then(res => {
                setTasks((currentTasks) => [
                    { title: taskTitle, isDone: false, id: res.id }, ...currentTasks
                ]);
                setErrorMessage("");
                setAddErrorVisible("none")
                setTaskTitle("");
                setModalVisible(false);
            }).catch((err) => {
                setErrorMessage(err.message)
                setAddErrorVisible("flex")
            })
        }
        else {

            setErrorMessage("Can't add empty task")
            setAddErrorVisible("flex")
        }
    }

    const closeModal = (): void => {
        setModalVisible(false);
        setErrorMessage("");
        setAddErrorVisible("none");
        setTaskTitle("");
    }

    const removeItem = async (id: string): Promise<void> => {
        // @ts-ignore
        const filteredData = tasks.filter(item => item.id !== id);
        await deleteDoc(doc(db, "tasks", id))
        setTasks(filteredData)
    }
    return (

        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(false)
                }}>
                <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPressOut={() => closeModal()}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <Text style={{ display: addErrorVisible, color: "red", marginBottom: 15 }}>{errorMessage}</Text>
                            <TextInput autoFocus={true} value={taskTitle} onChangeText={(text) => { setTaskTitle(text) }} style={{ width: 300 }} label="Task name"></TextInput>
                            <Button onPress={() => handleAddTask()} mode='contained' style={{ marginTop: 15, backgroundColor: "lightgreen" }}>Add</Button>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>

            </Modal>
            <View style={{ padding: 10 }}>
                <Title style={styles.sectionTitle}>My tasks</Title>
                <Text style={{ paddingHorizontal: 20 }}>{auth.currentUser?.email}</Text>
            </View>
            <View style={styles.items}>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={<NoItems />}
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TaskItem removeItem={removeItem} id={item.id} title={item.title} />
                    }
                />
            </View>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setModalVisible(true)}
            />
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
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        margin: 20,
        backgroundColor: "lightgreen",
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.35)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default TaskPage