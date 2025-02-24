import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type ItemProps = {
  title: string;
  onPress: () => void;
  onCheck: () => void;
  checked: boolean;
};

const Item = ({ title, onPress, onCheck, checked }: ItemProps) => (
  <TouchableOpacity
    style={[styles.item, { marginBottom: 10 }]}
    onPress={onPress}
  >
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity style={styles.buttonCheck} onPress={onCheck}>
      <Text style={checked ? styles.checkedText : styles.uncheckedText}>
        Check
      </Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [detalhesModalVisible, setDetalhesModalVisible] = useState(false);
  const [nomeAtividade, setNomeAtividade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<any>(null);

  const handleCadastro = () => {
    if (!nomeAtividade || !descricao || !data || !responsavel) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!", [
        { text: "OK" },
      ]);
      return;
    }
    const newTarefa = {
      id: Math.random().toString(),
      title: nomeAtividade,
      descricao,
      data,
      responsavel,
      checked: false, // Adicionando o estado de 'checked' (se a tarefa foi marcada como concluída)
    };

    setTarefas((prevTarefas) => [...prevTarefas, newTarefa]);
    setModalVisible(false);
    setNomeAtividade("");
    setDescricao("");
    setData("");
    setResponsavel("");
  };

  const handleItemPress = (item: any) => {
    setTarefaSelecionada(item);
    setDetalhesModalVisible(true);
  };

  const handleCheck = (id: string) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, checked: !tarefa.checked } : tarefa
      )
    );
  };

  return (
    <View style={styles.viewPai}>
      <Text style={styles.titleMain}> Lista De Tarefas </Text>
      <View style={styles.divPai}>
        <FlatList
          data={tarefas}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              onPress={() => handleItemPress(item)}
              onCheck={() => handleCheck(item.id)}
              checked={item.checked}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity
        style={styles.cadastrarButton}
        onPress={() => setModalVisible(true)}
      >
        <Text>Adicionar tarefa</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.overlayStyle}>
          <View style={styles.modalStyle}>
            <Text>
              <strong>Nome da Tarefa:</strong>
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="digite o nome da atividade"
              value={nomeAtividade}
              onChangeText={(text) => setNomeAtividade(text)}
            />
            <Text>
              <strong>Data da tarefa:</strong>
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="digite a data da atividade"
              value={data}
              onChangeText={(text) => setData(text)}
            />
            <Text>
              <strong>Responsavel da Tarefa:</strong>
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="digite o responsável da atividade"
              value={responsavel}
              onChangeText={(text) => setResponsavel(text)}
            />
            <Text>
              <strong>Descreva a tarefa:</strong>
            </Text>
            <TextInput
              style={styles.textAreaStyle}
              multiline={true}
              numberOfLines={4}
              placeholder="digite a descrição da atividade"
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
            />
            <TouchableOpacity
              style={styles.cadastrarButton}
              onPress={handleCadastro}
            >
              <Text>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={detalhesModalVisible}
        onRequestClose={() => setDetalhesModalVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.overlayStyleCenter}>
          <View style={styles.modalStyleInfo}>
            {tarefaSelecionada && (
              <>
                <Text style={styles.modalText}>Nome da Tarefa:</Text>
                <Text style={styles.modalContent}>
                  {tarefaSelecionada.title}
                </Text>

                <Text style={styles.modalText}>Data:</Text>
                <Text style={styles.modalContent}>
                  {tarefaSelecionada.data}
                </Text>

                <Text style={styles.modalText}>Responsável:</Text>
                <Text style={styles.modalContent}>
                  {tarefaSelecionada.responsavel}
                </Text>

                <Text style={styles.modalText}>Descrição:</Text>
                <Text style={styles.modalContent}>
                  {tarefaSelecionada.descricao}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDetalhesModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPai: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "plum",
    gap: 10,
  },
  divPai: {
    width: 350,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: "left",
  },
  modalStyle: {
    flex: 1,
    backgroundColor: "lightblue", // cor do fundo do modal
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: "70%", // Limita a altura para 50% da tela
    width: "100%", // A largura pode ser 100%, ou um valor específico se preferir
    position: "absolute", // Faz o modal ficar fixo na tela
    bottom: 0, // Coloca o modal na parte de baixo
    borderTopLeftRadius: 20, // Arredondar os cantos do modal, caso queira
    borderTopRightRadius: 20,
  },

  overlayStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Garante que o fundo semitransparente fique atrás do modal
  },
  inputStyle: {
    width: 250,
    backgroundColor: "plum",
    paddingLeft: 20,
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
  },
  textAreaStyle: {
    width: 250,
    backgroundColor: "plum",
    paddingLeft: 20,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
    paddingTop: 20,
  },
  buttonCheck: {
    backgroundColor: "lightblue",
    width: 60,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedText: {
    color: "green",
    fontWeight: "bold",
  },
  uncheckedText: {
    color: "white",
    fontWeight: "bold",
  },
  cadastrarButton: {
    backgroundColor: "#e4e2cf",
    width: 250,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
  },
  titleMain: {
    fontSize: 35,
    position: "absolute",
    top: 20,
  },
  descTarefa: {
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  modalStyleInfo: {
    width: "80%",
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  overlayStyleCenter: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#e4e2cf",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
