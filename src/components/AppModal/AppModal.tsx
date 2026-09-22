import { Modal, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

import { AppButton } from "../AppButton/AppButton";
import { AppText } from "../AppText/AppText";
import { _styles } from "./AppModal.styles";
import type { AppModalProps } from "./AppModal.types";

export const AppModal = ({ isVisible, title, onClose, contentStyle, children }: AppModalProps) => {
  const { styles } = useTheme(_styles);

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.panel} accessibilityViewIsModal>
          <AppText accessibilityRole="header" style={styles.title}>
            {title}
          </AppText>
          <ScrollView
            contentContainerStyle={[styles.content, contentStyle]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          <AppButton title="common.close" variant="secondary" onPress={onClose} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
