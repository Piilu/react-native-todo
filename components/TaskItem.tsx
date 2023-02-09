import { Text, View, StyleSheet } from "react-native"
import { Card, Button, IconButton } from "react-native-paper";
export type TaskItemProps =
    {
        title: string,
        id: string,
        removeItem: (id: string) => Promise<void>
    }
const TaskItem = (props: TaskItemProps) => {
    const { title, id, removeItem } = props
    return (
        <Card style={styles.item}>
            <Card.Content>
                <View style={styles.itemContent}>
                    <View style={{ flex: 1 }}>
                        <Text>{title}</Text>
                    </View>
                    <View style={styles.rightItem}>
                        <IconButton
                            icon="delete"
                            iconColor="red"
                            onPress={() => removeItem(id)}
                        />
                    </View>
                </View>
            </Card.Content>
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
    itemContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    rightItem: {
        justifyContent: "center",
    },

});

export default TaskItem