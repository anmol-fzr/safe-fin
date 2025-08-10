import { memo } from "react"
import type { TextStyle } from "react-native"
import { Text } from "@/components"
import type { TxKeyPath } from "@/i18n"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

type ScreenHeaderProps = {
  titleTx: TxKeyPath;
  tagLineTx: TxKeyPath
}

export const ScreenHeader = memo(({ titleTx, tagLineTx }: ScreenHeaderProps) => {
  const { themed } = useAppTheme()
  return (
    <>
      <Text preset="heading" tx={titleTx} style={themed($title)} />
      <Text tx={tagLineTx} style={themed($tagline)} />
    </>
  )
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})
