import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";
import TaskDetailsModal from "./components/TaskDetailsModal";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [detalhesModalVisible, setDetalhesModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState<any[]>([]); // Erro na linha 16
  const [tarefaSelecionada, setTarefaSelecionada] = useState<any>(null);

  const handleRemove = (id: number) => {
    setTarefas((prevTarefas) => prevTarefas.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            onRemove={() => handleRemove(item.id)}
            onPress={() => {
              setTarefaSelecionada(item);
              setDetalhesModalVisible(true);
            }}
            onCheck={() =>
              setTarefas((prev) =>
                prev.map((t) =>
                  t.id === item.id ? { ...t, checked: !t.checked } : t
                )
              )
            }
            checked={item.checked}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={(task) => setTarefas((prev) => [...prev, task])}
      />
      <TaskDetailsModal
        visible={detalhesModalVisible}
        onClose={() => setDetalhesModalVisible(false)}
        task={tarefaSelecionada}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DDD9CE",
  },
  title: {
    paddingTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#1C1E1F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
