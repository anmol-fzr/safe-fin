import { observer } from "mobx-react-lite"
import type { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "@/components"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { RegisterForm } from "@/components/forms"

export const RegistrationScreen = observer(function LoginScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="registerScreen:register" preset="heading" style={themed($logIn)} />
      <Text tx="registerScreen:enterDetails" preset="subheading" style={themed($enterDetails)} />

      <RegisterForm />
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})
