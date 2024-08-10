import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    breakpoints: {
        xs: '320px',  // Assuming 320px is your desired breakpoint for extra small devices
        sm: '480px',  // default is 30em (480px)
        md: '768px',  // default is 48em (768px)
        lg: '960px',  // default is 62em (992px)
        xl: '1200px', // default is 80em (1280px)
        '2xl': '1536px',  // default is 96em (1536px)
    },
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
        heading: "Ysabeau SC, sans-serif !important", // assuming you meant Playfair Display
        body: "Ysabeau SC, sans-serif !important",
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
            baseStyle: {
                field: {
                    fontSize: { base: 'sm', md: 'md', lg: 'lg' },  // Responsive font sizes
                },
            },
        },
        FormLabel: {
            baseStyle: {
                fontSize: { base: 'xs', md: 'sm', lg: 'md' },  // Responsive font sizes
                marginBottom: 2, // Consistent margin bottom
                color: 'gray.500', // Set the default label color
            },
        },
        Select: {
            defaultProps: {
                // focusBorderColor: 'blue.500',
            },
        },
        Button: {
            baseStyle: {
                fontWeight: 'bold', // Example static style
            },
            sizes: {
                sm: {
                    fontSize: '12px',
                    padding: '8px 12px',
                },
                md: {
                    fontSize: '16px',
                    padding: '10px 16px',
                },
                lg: {
                    fontSize: '18px',
                    padding: '12px 24px',
                },
            },
            variants: {
                primary: (props: any) => ({
                    bg: props.colorMode === 'dark' ? 'primary.300' : 'primary.500',
                    color: 'white',
                    _hover: {
                        bg: props.colorMode === 'dark' ? 'primary.400' : 'primary.600',
                    },
                }),
            },
            defaultProps: {
                size: 'md', // Ensures that 'md' is the default size if none is specified
                variant: 'primary', // Sets 'primary' as the default variant
            },
        },
        Text: {
            baseStyle: (props: any) => ({
                fontSize: props.as === 'span'
                    ? { xs: 'xs', sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' }
                    : { xs: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
                color: props.as === 'span'
                    ? 'gray.500'
                    : 'default'
            }),
        },
    }
});

export default customTheme;
