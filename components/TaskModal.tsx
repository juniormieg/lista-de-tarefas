import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

type TaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: {
    id: string;
    title: string;
    descricao: string;
    data: string;
    responsavel: string;
    checked: boolean;
  }) => void;
};

const TaskModal = ({ visible, onClose, onAddTask }: TaskModalProps) => {
  const [nomeAtividade, setNomeAtividade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleCadastro = () => {
    if (!nomeAtividade || !descricao || !data || !responsavel) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
      return;
    }
    onAddTask({
      id: Math.random().toString(),
      title: nomeAtividade,
      descricao,
      data,
      responsavel,
      checked: false,
    });

    setNomeAtividade("");
    setDescricao("");
    setData("");
    setResponsavel("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text>Nome da Tarefa:</Text>
          <TextInput
            style={styles.input}
            value={nomeAtividade}
            onChangeText={setNomeAtividade}
            placeholder="Nome da tarefa"
          />

          <Text>Data:</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
            placeholder="Data"
          />

          <Text>Responsável:</Text>
          <TextInput
            style={styles.input}
            value={responsavel}
            onChangeText={setResponsavel}
            placeholder="Responsável"
          />

          <Text>Descrição:</Text>
          <TextInput
            style={styles.textArea}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.ButtonText}>Cadastrar</Text>
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
  modal: {
    backgroundColor: "#DDD9CE",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  textArea: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    height: 80,
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
});

export default TaskModal;
