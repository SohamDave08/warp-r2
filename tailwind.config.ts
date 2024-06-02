/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'mobile-v': '320px',
            'mobile-h': '425px',
            'tablet': '768px',
            'laptop': '1024px',
            'desktop': '1280px',
        },
        fontFamily: {
            'sans': ['Macan, sans-serif', {
                fontFeatureSettings: '"ss13"',
            }],
            'mono': ['Macan, sans-serif', {
                fontFeatureSettings: '"lnum", "tnum", "zero"',
            }],
            signature: ['Corinthia', 'cursive'],
        },
        fontSize: {
            'h1': ['2rem', { fontWeight: '600' }], // 32px
            'h2': ['1.75rem', { fontWeight: '600' }], // 28px
            'h3': ['1.25rem', { fontWeight: '600' }], // 20px
            'h4': ['1rem', { fontWeight: '600' }], // 16px
            'subhead': ['1.0625rem', { fontWeight: '500' }], // 17px
            'tab': ['1.0625rem', { fontWeight: '600' }], // 17px
            'button-1': '1rem', // 16px
            'button-2': '0.9375rem', // 15px
            'input-1': '0.9375rem', // 15px
            'input-2': '0.875rem', // 14px
            'input-label': '0.75rem', // 12px
            'body-large': '1.0625rem', // 17px
            'body-1': '0.9375rem', // 15px
            'body-2': '0.875rem', // 14px
            'list-1': '0.9375rem', // 15px
            'list-2': '0.875rem', // 14px
            'list-3': '0.8125rem', // 13px
            'list-4': '0.6875rem', // 11px
            'status-1': ['0.9375rem', { fontWeight: '500' }], // 15px
            'status-2': ['0.75rem', { fontWeight: '500' }], // 12px
            'info': '0.875rem', // 14px
            'caption': '0.8125rem', // 13px
            'binding-1': ['0.8125rem', { fontWeight: '600' }], // 13px
            'binding-2': ['0.75rem', { fontWeight: '600' }], // 12px
            'placeholder-1': ['2.5rem', { fontWeight: '600' }], // 40px
            'placeholder-2': ['1.5rem', { fontWeight: '600' }], // 24px
            'placeholder-3': ['1rem', { fontWeight: '600' }], // 16px
            'signature-1': ['2.5rem', { fontWeight: '500' }], // 40px
            'signature-2': ['2rem', { fontWeight: '500' }], // 32px
            'signature-3': ['1.5rem', { fontWeight: '500' }], // 24px
            'tag': ['0.625rem', { fontWeight: '600' }] // 10px
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            red: {
                50: '#FFF1F1',
                100: '#FFDFDF',
                200: '#FFC5C5',
                300: '#FF9D9D',
                400: '#FF6464',
                500: '#FF2323',
                600: '#ED1515',
                700: '#C80D0D',
                800: '#A50F0F',
                900: '#881414',
                950: '#4B0404',
            },
            orange: {
                50: '#FFFCEA',
                100: '#FFF5C5',
                200: '#FFEB85',
                300: '#FFDA46',
                400: '#FFC71B',
                500: '#FFA500',
                600: '#E27C00',
                700: '#BB5502',
                800: '#984208',
                900: '#7C360B',
                950: '#481A00',
            },
            yellow: {
                50: '#FFFFE7',
                100: '#FEFFC1',
                200: '#FFFD86',
                300: '#FFF441',
                400: '#FFE60D',
                500: '#FFD700',
                600: '#D19E00',
                700: '#A67102',
                800: '#89580A',
                900: '#74480F',
                950: '#442604',
            },
            green: {
                50: '#F2FCF1',
                100: '#DEFADE',
                200: '#C0F3BF',
                300: '#8DE88D',
                400: '#54D454',
                500: '#32CD32',
                600: '#209920',
                700: '#1C791D',
                800: '#1B601C',
                900: '#184F1A',
                950: '#082B09',
            },
            sky: {
                50: '#EDFBFF',
                100: '#D7F5FF',
                200: '#B9EEFF',
                300: '#88E6FF',
                400: '#50D5FF',
                500: '#28BBFF',
                600: '#079CFF',
                700: '#0A86EB',
                800: '#0F6ABE',
                900: '#135A95',
                950: '#11375A',
            },
            blue: {
                50: '#EDF4FF',
                100: '#D7E5FF',
                200: '#B9D4FF',
                300: '#88B9FF',
                400: '#5093FF',
                500: '#286AFF',
                600: '#1F51FF',
                700: '#0A31EB',
                800: '#0F28BE',
                900: '#132995',
                950: '#111B5A',
            },
            purple: {
                50: '#F5F0FF',
                100: '#EDE4FF',
                200: '#DCCDFF',
                300: '#C5A6FF',
                400: '#AA73FF',
                500: '#933BFF',
                600: '#8B14FF',
                700: '#7F00FF',
                800: '#6B01D6',
                900: '#5903AF',
                950: '#360077',
            },
            pink: {
                50: '#FFF2FE',
                100: '#FFE3FE',
                200: '#FFC6FD',
                300: '#FF99F6',
                400: '#FF5DEF',
                500: '#FF21F2',
                600: '#FF00FF',
                700: '#CF00CA',
                800: '#A900A3',
                900: '#890682',
                950: '#5E005A',
            },
        },
        extend: {
            colors: {
                'g98': '#FAFAFA',
                'g96': '#F5F5F5',
                'g94': '#F0F0F0',
                'g92': '#EBEBEB',
                'g88': '#E0E0E0',
                'g84': '#D6D6D6',
                'g76': '#C2C2C2',
                'g64': '#A3A3A3',
                'g48': '#7A7A7A',
                'g44': '#707070',
                'g32': '#525252',
                'g8': '#141414'
            },
            brightness: {
                '80': '.80',
                '60': '.60',
                '40': '.40',
            },
            lineHeight: {
                'extra-loose': '2.5',
            },
            boxShadow: {
                'block': '0px 15px 30px -15px rgba(0, 0, 0, 0.12)',
                'button': '0 2px 5px 0 rgba(0, 0, 0, 0.04)',
                'main-button': '0px 2.5px 5px -2.5px rgba(0, 0, 0, 0.12), 0px 0px 5px 0px rgba(255, 255, 255, 0.60) inset',
                'input': '0 2px 15px 0 rgba(0, 0, 0, 0.04)',
                'tooltip': '0 2px 10px 0 rgba(0, 0, 0, 0.12)',
                'slider': '0 1px 10px 0 rgba(0, 0, 0, 0.24)',
            },
            backgroundImage: {
                'button-shine': 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
                'button-shine-approve': 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)',
                'indicator-shine': 'linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)'
            },
        }
    },
    plugins: [
        require('@headlessui/tailwindcss'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar-hide'),
    ],
    safelist: [{
        pattern: /(bg|text|border)-(green|red|yellow)/
    }]
}