import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
        primary: {
            50: '#e3e8ea',
            100: '#b8c2c8',
            200: '#8d9ca6',
            300: '#627684',
            400: '#3a5163',
            500: '#2f4b5a', // Base color
            600: '#26404e',
            700: '#1d3542',
            800: '#142a36',
            900: '#0b1f2a',
        },
    },
    fonts: {
        body: `'DMSans', sans-serif !important`, // Set the custom font for the body text
        heading: `'DMSans', sans-serif !important`,
    },
    styles: {
        global: {
            body: {
                bg: 'rgb(146, 162, 164)',
            },
        },
    },
    components: {
        Input: {
            defaultProps: {
                // focusBorderColor: 'blue.500',
            },
        },
        Select: {
            defaultProps: {
                // focusBorderColor: 'blue.500',
            },
        },
        Button: {
            bg: 'primary.500', // Use the primary color 500 as the default background color
            color: 'white', // Set the default text color
        },
    }
});

export default customTheme;
