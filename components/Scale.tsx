import { View } from "react-native";
import { LogItem } from "../hooks/useLogs";
import useScale from "../hooks/useScale";
import { SettingsState } from "../hooks/useSettings";
import ScaleButton from "./ScaleButton";
import * as Haptics from 'expo-haptics';
import { useSegment } from "../hooks/useSegment";
import useHaptics from "../hooks/useHaptics";

export default function Scale({
  type,
  value,
  onPress = null,
}: {
  type: SettingsState['scaleType'];
  value?: LogItem['rating'];
  onPress?: any,
}) {
  let { colors, labels } = useScale(type)
  labels = labels.reverse()
  const segment = useSegment()
  const haptics = useHaptics()
  
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {Object.keys(colors).reverse().map((key, index) => (
        <ScaleButton 
          accessibilityLabel={labels[index]}
          key={key} 
          isFirst={index === 0}
          isSelected={key === value}
          onPress={onPress ? async () => {
            await haptics.selection()
            segment.track('log_rating_changed', {
              label: labels[index]
            })
            onPress(key) 
          }: null}
          color={colors[key].background}
        />
      ))}
    </View>
  )
}
