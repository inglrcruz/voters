import { Text as DefaultText, useColorScheme, View as DefaultView, Pressable as DefaultButton, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Btn } from '../constants/Styles';
import { FontAwesome } from '@expo/vector-icons';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ThemeBtnProps = {
  onPress: () => void;
  title?: string;
  icon?: string;
  type?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeBtnProps & DefaultView['props'];

/**
 * Extracts the theme color based on the current color scheme and the provided color name.
 *
 * @param props An object containing the 'light' and 'dark' color values for the specified color name.
 * @param colorName The name of the color to extract.
 * @returns The corresponding color value based on the current color scheme and the provided color name.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];
  return (colorFromProps) ? colorFromProps : Colors[theme][colorName]
}

/**
 * Renders a text element with the appropriate theme color.
 *
 * @param props An object containing the text properties.
 * @returns The rendered text element.
 */
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

/**
 * Renders a view element with the appropriate background color based on the current theme.
 *
 * @param props An object containing the view properties.
 * @returns The rendered view element.
 */
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

/**
 * Renders a button element with a predefined style and the provided title and icon.
 *
 * @param props An object containing the button properties.
 * @returns The rendered button element.
 */
export function Button(props: ButtonProps) {
  const { onPress, title, icon, type } = props;
  let styleBtn = { backgroundColor: "#6c757d"}, color = "#fff"
  if (type === "success") color = "#fff"
  if (type === "success") styleBtn = { backgroundColor: "#198754" }

  return (
    <DefaultButton style={[Btn.base, styleBtn]} onPress={onPress}>
      <FontAwesome name={icon || "user"} size={15} color={color} />
      <Text style={[Btn.text, { color: color }]}>{title}</Text>
    </DefaultButton>
  )
}