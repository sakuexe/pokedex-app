import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
// types
import { Dispatch, SetStateAction } from "react";
// constants
import { COLORS } from "../../constants";
import styles from "../../styles/common";

type FilterProps = {
  currentState: SetStateAction<string | number>;
  setState: Dispatch<SetStateAction<string | number>>;
  selection: any[];
  label?: string;
};

export default function PickerFilter(props: FilterProps) {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>{props.label ? props.label : ""}</Text>
      <View style={styles.filterPicker}>
        <Picker
          mode="dialog"
          style={{
            color: COLORS.white,
            fontWeight: "bold",
          }}
          selectedValue={props.currentState}
          onValueChange={(itemValue, itemIndex) => props.setState(itemValue)}
        >
          {props.selection.map((item: any, index: number) => (
            <Picker.Item
              key={index}
              label={
                `${index}. ${item.name} ` +
                (item.first && item.last ? `(${item.first}-${item.last})` : "")
              }
              value={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
