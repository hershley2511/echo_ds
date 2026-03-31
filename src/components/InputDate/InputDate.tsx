import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface InputDateProps extends Omit<HTMLChakraProps<"input">, "onChange" | "type"> {
  label?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: string
  max?: string
}

export const InputDate = forwardRef<HTMLInputElement, InputDateProps>(function InputDate(
  {
    label,
    helperText,
    errorMessage,
    isDisabled,
    isRequired,
    value,
    onChange,
    min,
    max,
    ...rest
  },
  ref
) {
  const hasError = !!errorMessage

  return (
    <chakra.div display="flex" flexDir="column" gap="4px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && <chakra.span color="red.500" ml="2px">*</chakra.span>}
        </chakra.label>
      )}
      <chakra.input
        ref={ref}
        type="date"
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        min={min}
        max={max}
        bg="white"
        border="1px solid"
        borderColor={hasError ? "red.500" : "grey.100"}
        borderRadius="8px"
        h="40px"
        px="12px"
        fontSize="14px"
        color="slate.800"
        w="100%"
        _focusVisible={{
          outline: "none",
          borderColor: "green.500",
          boxShadow: "0 0 0 2px #DDFBC6",
        }}
        _disabled={{ bg: "grey.100", color: "grey.400", cursor: "not-allowed" }}
        {...rest}
      />
      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
