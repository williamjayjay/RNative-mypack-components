import * as React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  ViewStyle,
  Animated,
  Image,
  TouchableOpacity,
  View,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  KeyboardTypeOptions,
} from "react-native";

/**
 * ? Local Imports
 */
import styles, { _textInputStyle } from "./InteractiveTextInput.style";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const MAIN_COLOR = "#2a41cb";
const ORIGINAL_COLOR = "transparent";
const PLACEHOLDER_COLOR = "#757575";
const ORIGINAL_VALUE = 0;
const ANIMATED_VALUE = 1;

export interface IInteractiveTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconImageStyle?: StyleProp<ImageStyle>;
  iconImageSource?: ImageSourcePropType;
  enableIcon?: boolean;
  mainColor?: string;
  originalColor?: string;
  animatedPlaceholderTextColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onIconPress?: () => void;
  IconComponent?: React.ReactNode;
  keyboardType?: KeyboardTypeOptions;
}

interface IState {}

export default class InteractiveTextInput extends React.Component<
  IInteractiveTextInputProps,
  IState
> {
  interpolatedColor: Animated.Value;

  constructor(props: IInteractiveTextInputProps) {
    super(props);
    this.interpolatedColor = new Animated.Value(ORIGINAL_VALUE);
    this.state = {};
  }

  showOriginColor = () => {
    Animated.timing(this.interpolatedColor, {
      duration: 350,
      toValue: ORIGINAL_VALUE,
      useNativeDriver: false,
    }).start();
  };

  showFocusColor = () => {
    Animated.timing(this.interpolatedColor, {
      duration: 450,
      toValue: ANIMATED_VALUE,
      useNativeDriver: false,
    }).start();
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  renderIcon = () => {
    const { enableIcon, iconContainerStyle, onIconPress, IconComponent, keyboardType } =
      this.props;

    if (!enableIcon || !IconComponent) return null;

    return (
      <TouchableOpacity
        style={[styles.iconContainerStyle, iconContainerStyle]}
        onPress={onIconPress}
      >
        {IconComponent}
      </TouchableOpacity>
    );
  };

  renderAnimatedTextInput = () => {
    const mainColor = this.props.mainColor || MAIN_COLOR;
    const originalColor = this.props.originalColor || ORIGINAL_COLOR;
    const animatedPlaceholderTextColor =
      this.props.animatedPlaceholderTextColor || PLACEHOLDER_COLOR;

    let borderColor = this.interpolatedColor.interpolate({
      inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
      outputRange: [originalColor, mainColor],
    });
    let placeholderTextColor = this.interpolatedColor.interpolate({
      inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
      outputRange: [animatedPlaceholderTextColor, mainColor],
    });
    return (
      <AnimatedTextInput
        placeholderTextColor={placeholderTextColor}
        placeholder="Email"
        {...this.props}
        style={[
          _textInputStyle(borderColor),
          this.props.textInputStyle,
          { paddingRight: this.props.enableIcon ? 48 : 0 },
        ]}
        keyboardType={this.props.keyboardType}
        onFocus={() => {
          this.showFocusColor();
          this.props.onFocus && this.props.onFocus();
        }}
        onBlur={() => {
          this.showOriginColor();
          this.props.onBlur && this.props.onBlur();
        }}
      />
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderAnimatedTextInput()}
        {this.renderIcon()}
      </View>
    );
  }
}
