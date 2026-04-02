import type { Preview } from "@storybook/react"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "../src/theme"
import "remixicon/fonts/remixicon.css"

// Load Inter from Google Fonts
const interLink = document.createElement("link")
interLink.rel = "stylesheet"
interLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
document.head.appendChild(interLink)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={system}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
