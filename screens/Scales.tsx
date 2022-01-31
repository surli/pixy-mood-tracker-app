import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Circle } from 'react-native-feather';
import TextInfo from '../components/TextInfo';
import useColors from '../hooks/useColors';
import { useSettings } from '../hooks/useSettings';
import { useTranslation } from '../hooks/useTranslation';

function ColorDot({
  color,
}: {
  color: string;
}) {
  return (
    <View
      style={{
        padding: 3,
        backgroundColor: color,
        flex: 1,
        borderRadius: 5,
        width: '100%',
        aspectRatio: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 50,
      }}
    />
  )
}

function Scale({
  type,
}: {
  type: string;
}) {
  const colors = useColors();
  const scaleColors = colors.scales[type];
  
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {Object.keys(scaleColors).reverse().map((key, index) => (
        <ColorDot 
          key={key} 
          color={scaleColors[key].background}
        />
      ))}
    </View>
  )
}

function Radio({
  onPress,
  children,
  isSelected = false,
}: {
  onPress: () => void;
  children: React.ReactNode;
  isSelected?: boolean;
}) {
  const colors = useColors()
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: colors.menuListItemBackground,
        padding: 10,
        borderRadius: 10,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View style={{ 
        width: '15%', 
        justifyContent: 'center', 
        flexDirection: 'row',
        position: 'relative',
      }}>
        <Circle width={24} color={colors.text} />
        {isSelected && 
          <View style={{ 
            width: 10, 
            height: 10, 
            backgroundColor: colors.text,
            position: 'absolute',
            borderRadius: 100,
            top: 7
          }}></View>
        }
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </Pressable>
  )
}

export default function SettingsScreen({ navigation }) {
  const { setSettings, settings } = useSettings()
  const i18n = useTranslation()
  const colors = useColors()
  
  const [scaleType, setScaleType] = useState(settings.scaleType)
  
  const typesNames = [
    `ColorBrew-RdYlGn`,
    `ColorBrew-PiYG`,
    'ColorBrew-BrBG',
  ]

  useEffect(() => {
    setSettings(settings => ({  ...settings, scaleType }))
  }, [scaleType])

  return (
    <View style={{ 
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    }}>
      <ScrollView
      style={{
        padding: 20,
      }}
      >
        {typesNames.map(type => (
            <Radio
              key={type}
              isSelected={type === scaleType}
              onPress={() => setScaleType(type)}
            >
              <Scale type={type} />
            </Radio>
          )
        )}
        <View
          style={{
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInfo>{i18n.t('scales_info')}</TextInfo>
        </View>
      </ScrollView>
    </View>
  );
}
