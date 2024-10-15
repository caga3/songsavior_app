import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultButton,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../constants/Colors';
import IconSvg from './IconsSvg';
import EyeIcon from '../constants/icons/EyeIcon';
import ButtonArrow from '../constants/icons/ButtonArrow';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ThemeButtonProps = {
  label: string;
  styleText?: any;
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
};

type ThemeInputIconProps = {
  iconPath: string;
  iconColor?: string;
  lightColor?: string;
  darkColor?: string;
  secureTextEntry?: boolean;
};

type ThemeSelectProps = {
  options: Array<{label: string; value: string; color?: string}>;
  lightColor?: string;
  darkColor?: string;
};

type ThemeCheckBoxProps = {
  style: any;
  checked: boolean;
  onPress: () => void;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type TextInputIconProps = ThemeInputIconProps &
  DefaultTextInput['props'];
export type ButtonProps = ThemeButtonProps & DefaultButton['props'];
export type CheckBoxProps = ThemeCheckBoxProps;
export type SelectProps = ThemeSelectProps;

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'dark';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const styles = StyleSheet.create({
    text: {
      color: color,
      fontSize: 12,
      lineHeight: 24,
      fontWeight: '500',
    },
  });
  return <DefaultText style={[styles.text, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, ...otherProps} = props;
  return <DefaultView style={[style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const borderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'field',
  );
  const mutedColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );
  const styles = StyleSheet.create({
    textInput: {
      fontSize: 16,
      height: 56,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 15,
      marginBottom: 20,
      color: color,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
  });
  return (
    <DefaultTextInput
      style={[styles.textInput, style]}
      placeholderTextColor={mutedColor}
      {...otherProps}
    />
  );
}

export function TextInputIcon(props: TextInputIconProps) {
  const {
    style,
    iconPath,
    iconColor,
    lightColor,
    secureTextEntry,
    darkColor,
    ...otherProps
  } = props;
  const [isSecure, setIsSecure] = useState(true);
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const borderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'field',
  );
  const mutedColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );
  const styles = StyleSheet.create({
    textInput: {
      flex: 1,
      fontSize: 16,
      color: color,
      marginLeft: 10,
      padding: 0,
      marginTop: 14,
      justifyContent: 'center',
    },
    inputGroup: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      marginBottom: 15,
    },
  });
  const showPassword = () => {
    setIsSecure(prevState => !prevState);
  };
  return (
    <View style={styles.inputGroup}>
      <IconSvg path={iconPath} width="24" height="24" color={iconColor} />
      {secureTextEntry ? (
        <>
          <DefaultTextInput
            style={[styles.textInput, style]}
            placeholderTextColor={mutedColor}
            secureTextEntry={isSecure}
            {...otherProps}
          />
          <TouchableOpacity onPress={showPassword}>
            {!isSecure ? (
              <EyeIcon />
            ) : (
              <IconSvg path="M3 3L21 21M10.584 10.587C10.2087 10.962 9.99778 11.4708 9.99759 12.0013C9.99741 12.5318 10.208 13.0407 10.583 13.416C10.958 13.7913 11.4668 14.0022 11.9973 14.0024C12.5278 14.0026 13.0367 13.792 13.412 13.417M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659" />
            )}
          </TouchableOpacity>
        </>
      ) : (
        <DefaultTextInput
          style={[styles.textInput, style]}
          placeholderTextColor={mutedColor}
          {...otherProps}
        />
      )}
    </View>
  );
}

export function SelectOption(props: SelectProps) {
  const {options, lightColor, darkColor, ...otherProps} = props;
  const [selectedValue, setSelectedValue] = useState<string>('');
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  const borderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );

  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'field',
  );

  // Define the type for the items in the dropdown
  const styles = StyleSheet.create({
    container: {
      height: 56,
      borderWidth: 1,
      borderRadius: 16,
      marginBottom: 20,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
    picker: {
      fontSize: 16,
    },
    selectedValue: {
      flex: 1,
      fontSize: 16,
      color: color,
    },
  });
  return (
    <View style={styles.container} {...otherProps}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        selectionColor="red"
        onValueChange={(value: string | null) => setSelectedValue(value || '')}>
        {options.map(item => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
            color={item.color ? item.color : 'gray'}
          />
        ))}
      </Picker>
      {selectedValue ? (
        <Text style={styles.selectedValue}>{selectedValue}</Text>
      ) : null}
    </View>
  );
}

export function Button(props: ButtonProps) {
  const {
    style,
    label,
    styleText,
    lightColor,
    darkColor,
    onPress,
    ...otherProps
  } = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const borderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );
  const styles = StyleSheet.create({
    button: {
      height: 56,
      borderWidth: 0,
      borderRadius: 16,
      paddingHorizontal: 15,
      justifyContent: 'center',
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
    buttonText: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '700',
      color: color,
    },
  });
  return (
    <DefaultButton
      style={[styles.button, style]}
      {...otherProps}
      onPress={onPress}>
      <Text style={[styles.buttonText, styleText]}>{label}</Text>
    </DefaultButton>
  );
}

export function ButtonIcon(props: ButtonProps) {
  const {
    style,
    label,
    styleText,
    lightColor,
    darkColor,
    onPress,
    ...otherProps
  } = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const borderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'muted',
  );
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      borderWidth: 0,
      borderRadius: 16,
      paddingHorizontal: 15,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
    buttonText: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '700',
      color: color,
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <DefaultButton
      style={[styles.button, style]}
      {...otherProps}
      onPress={onPress}>
      <Text style={[styles.buttonText, styleText]}>{label}</Text>
      <ButtonArrow />
    </DefaultButton>
  );
}

export function CheckBox(props: CheckBoxProps) {
  const {style, checked, onPress, ...otherProps} = props;
  const styles = StyleSheet.create({
    checkBox: {
      position: 'relative',
      width: 16,
      height: 16,
      borderColor: '#fff',
      borderRadius: 4,
      borderWidth: 1,
    },
    check: {
      position: 'absolute',
      top: -5,
      left: -3,
    },
  });
  return (
    <DefaultButton
      style={[styles.checkBox, style]}
      onPress={onPress}
      {...otherProps}>
      {checked && (
        <View style={styles.check}>
          <IconSvg
            width="24"
            height="24"
            path="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
          />
        </View>
      )}
    </DefaultButton>
  );
}
