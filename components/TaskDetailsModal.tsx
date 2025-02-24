import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type TaskDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  task: any;
};

const TaskDetailsModal = ({
  visible,
  onClose,
  task,
}: TaskDetailsModalProps) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>
            <strong>Nome da Tarefa:</strong> {task?.title}
          </Text>

          <Text style={styles.text}>
            <strong>data:</strong> {task?.data}
          </Text>

          <Text style={styles.text}>
            <strong>Responsável:</strong> {task?.responsavel}
          </Text>

          <Text style={styles.text}>
            <strong>Descrição:</strong>
          </Text>
          <ScrollView style={styles.textDescContainer}>
            <Text style={styles.textDesc}>{task?.descricao}</Text>
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.ButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    height: 30,
  },
  textDesc: {
    height: 50,
    width: 200,
  },
  modal: {
    backgroundColor: "#DDD9CE",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#1C1E1F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  ButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textDescContainer: {
    maxHeight: 150,
    width: "100%",
  },
});

export default TaskDetailsModal;
