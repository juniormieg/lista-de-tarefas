import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg"; // Importando Svg e Path do react-native-svg

type TaskItemProps = {
  title: string;
  onPress: () => void;
  onCheck: () => void;
  checked: boolean;
  onRemove: () => void;
};

const TaskItem = ({
  title,
  onPress,
  onCheck,
  checked,
  onRemove,
}: TaskItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.buttonRemove} onPress={onRemove}>
        <Svg viewBox="0 0 24 24" fill="none">
          <Path
            d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
            stroke="#bf4040"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity
        style={checked ? styles.buttonCheck : styles.buttonUnCheck}
        onPress={onCheck}
      >
        <Svg viewBox="0 0 24 24" fill="none">
          <Path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#1C1E1F",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  buttonCheck: {
    backgroundColor: "#287233",
    width: 40,
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRemove: {
    width: 40,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonUnCheck: {
    backgroundColor: "#DDD9CE",
    width: 40,
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonsContainer: {
    gap: 20,
    flexDirection: "row",
  },
  remove: {
    color: "#B90E0A",
    backgroundColor: "#DDD9CE",
  },
});

export default TaskItem;
