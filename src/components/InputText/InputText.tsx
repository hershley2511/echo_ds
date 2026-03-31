import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface InputTextProps extends Omit<HTMLChakraProps<"input">, "size" | "onChange"> {
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  size?: "sm" | "md" | "lg"
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const sizeStyles = {
  sm: { h: "32px", fontSize: "13px" },
  md: { h: "40px", fontSize: "14px" },
  lg: { h: "48px", fontSize: "16px" },
}

function FormField({
  label,
  helperText,
  errorMessage,
  isRequired,
  children,
}: {
  label?: string
  helperText?: string
  errorMessage?: string
  isRequired?: boolean
  children: React.ReactNode
}) {
  return (
    <chakra.div display="flex" flexDir="column" gap="4px" w="100%">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && (
            <chakra.span color="red.500" ml="2px">
              *
            </chakra.span>
          )}
        </chakra.label>
      )}
      {children}
      {errorMessage && (
        <chakra.span fontSize="12px" color="red.500">
          {errorMessage}
        </chakra.span>
      )}
      {!errorMessage && helperText && (
        <chakra.span fontSize="12px" color="slate.700">
          {helperText}
        </chakra.span>
      )}
    </chakra.div>
  )
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(
    {
      label,
      placeholder,
      helperText,
      errorMessage,
      isDisabled,
      isRequired,
      leftAddon,
      rightAddon,
      size = "md",
      value,
      onChange,
      ...rest
    },
    ref
  ) {
    const { h, fontSize } = sizeStyles[size]
    const hasError = !!errorMessage

    const inputEl = (
      <chakra.input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        bg="white"
        border="1px solid"
        borderColor={hasError ? "red.500" : "grey.100"}
        borderRadius={leftAddon || rightAddon ? "0" : "8px"}
        borderLeftRadius={leftAddon ? "0" : "8px"}
        borderRightRadius={rightAddon ? "0" : "8px"}
        h={h}
        px="12px"
        fontSize={fontSize}
        color="slate.800"
        w="100%"
        _placeholder={{ color: "grey.400" }}
        _focusVisible={{
          outline: "none",
          borderColor: "green.500",
          boxShadow: "0 0 0 2px #DDFBC6",
        }}
        _disabled={{ bg: "grey.100", color: "grey.400", cursor: "not-allowed" }}
        {...rest}
      />
    )

    const wrapped =
      leftAddon || rightAddon ? (
        <chakra.div display="flex" w="100%" alignItems="stretch">
          {leftAddon && (
            <chakra.div
              display="flex"
              alignItems="center"
              bg="slate.100"
              px="10px"
              h={h}
              border="1px solid"
              borderColor={hasError ? "red.500" : "grey.100"}
              borderRight="none"
              borderLeftRadius="8px"
              fontSize={fontSize}
              color="slate.700"
              whiteSpace="nowrap"
            >
              {leftAddon}
            </chakra.div>
          )}
          {inputEl}
          {rightAddon && (
            <chakra.div
              display="flex"
              alignItems="center"
              bg="slate.100"
              px="10px"
              h={h}
              border="1px solid"
              borderColor={hasError ? "red.500" : "grey.100"}
              borderLeft="none"
              borderRightRadius="8px"
              fontSize={fontSize}
              color="slate.700"
              whiteSpace="nowrap"
            >
              {rightAddon}
            </chakra.div>
          )}
        </chakra.div>
      ) : (
        inputEl
      )

    return (
      <FormField
        label={label}
        helperText={helperText}
        errorMessage={errorMessage}
        isRequired={isRequired}
      >
        {wrapped}
      </FormField>
    )
  }
)
