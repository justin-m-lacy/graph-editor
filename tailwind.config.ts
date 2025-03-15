import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config } */
export default {

  content: ['./src/**/*.{vue,js,ts,jsx,tsx,html}', 'index.html'],
  safelist: [
    /*{
      pattern: /bg-(rose-800|amber-950\/30|rose-900|amber-800|purple-700|purple-800|lime-900|\w+-700|vellum-700|blue-600|mana-\d*)/
    },
    {
      pattern: /border-t-(rose-800|rose-900|amber-800|purple-700|purple-800|lime-900|vellum-700|blue-600)/
    },*/

  ],
  theme: {

    extend: {

      gridTemplateColumns: {
        2: '1fr 1fr',
        5: 'repeat(5, minmax(72px,max-content))',
        'fit-60': 'repeat(auto-fit, minmax( 15em, 0.5fr))',
        'fill-56': 'repeat(auto-fill, minmax(min-content, 14em))',
        'fit-max': 'repeat(auto-fit, minmax(10em,max-content))'
      },
      gridTemplateRows: {
        'min': 'repeat(auto-fit, min-content)',
        'auto': 'repeat(auto-fit, auto)'
      },
      keyframes: {
        throb: {
          '0%,100%': {
            color: 'var(--throb-on-color)'
          },
          '50%': {
            color: 'var(--throb-off-color)'
          }
        },
        blink: {
          '0%,100%': {
            opacity: 1
          },
          '20%,50%': {
            opacity: 0
          },
          '19%,51%': {
            opacity: 1
          }
        },
        ping: {

          '70%': {
            transform: 'scale(1.15)',
            opacity: 0.5
          },
          '100%': {
            transform: 'scale(1.0)',
            opacity: 1
          }
        },
        'fade-in': {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        progress: {
          '0%': {
            left: '-100%'
          },
          '100%': {
            left: '100%'
          }
        }

      },
      animation: {
        'fade-in-slow': 'fade-in 1s ease-in',
        'fade-out-slow': 'fade-in 1s ease-out reverse',
        'fade-in': 'fade-in 0.2s ease-in',
        'fade-out': 'fade-in 0.1s ease-in 1 reverse',
        'fade-in-out': 'fade-in 1.5s ease-in-out 2 alternate',
        progress: 'progress 1s linear infinite',
        blink: 'blink 1.75s linear reverse infinite',
        flicker: 'flicker 1.5s linear',
        throb: 'throb 1.65s cubic-bezier(0.4,0,0.6,1) infinite',
        'ping-sm': 'ping 1s cubic-bezier(0, 0, 0.2, 1) reverse infinite'
      },

      spacing: {
        'xs': '0.2rem',
        'sm': '0.32rem',
        'md': '0.65rem'
      },
      borderWidth: {
        '10': '10px',
        14: '14px',
        lg: "12px"
      },

      blur: {
        line: '1px'
      },
      colors: {
        'hp': {
          '50': '#fff0f0',
          '100': '#ffdddd',
          '200': '#ffc1c1',
          '300': '#ff9595',
          '400': '#ff5858',
          '500': '#ff2525',
          '600': '#fd0505',
          '700': '#d60000',
          '800': '#ac0404',
          '900': '#910b0b',
          '950': '#500000',
        },

        'fire': {
          '50': '#fff3f1',
          '100': '#ffe3df',
          '200': '#ffccc5',
          '300': '#ffa89c',
          '400': '#ff7563',
          '500': '#ff4a32',
          '600': '#ef2d13',
          '700': '#ce230c',
          '800': '#a6200e',
          '900': '#892113',
          '950': '#4b0c04',
        },

        'mana': {
          '50': '#ecf4ff',
          '100': '#ddeaff',
          '200': '#c1d8ff',
          '300': '#9cbcff',
          '400': '#7596ff',
          '500': '#5471ff',
          '600': '#3648f5',
          '700': '#2936d9',
          '800': '#2531b3',
          '900': '#25308a',
          '950': '#161a50',
        },
        'water': {
          '50': '#f2f9fd',
          '100': '#e4f0fa',
          '200': '#c2e1f5',
          '300': '#8ccaed',
          '400': '#4faee1',
          '500': '#2994ce',
          '600': '#186da2',
          '700': '#165e8e',
          '800': '#165076',
          '900': '#184462',
          '950': '#102b41',
        },
        'air': {
          '50': '#f9f7f7',
          '100': '#f3eded',
          '200': '#e9dfdf',
          '300': '#dacbcb',
          '400': '#c1a8a8',
          '500': '#a98a8a',
          '600': '#917171',
          '700': '#795c5c',
          '800': '#654f4f',
          '900': '#574545',
          '950': '#2d2222',
        },
        'earth': {
          '50': '#f9f6ed',
          '100': '#efe7d2',
          '200': '#e1cea7',
          '300': '#d0ae74',
          '400': '#c39552',
          '500': '#b27e40',
          '600': '#996435',
          '700': '#7b4b2d',
          '800': '#683e2b',
          '900': '#5a3629',
          '950': '#331c15',
        },
        'light': {
          "50": "#fefae6f7",
          "100": "#fcf4cdf0",
          "200": "#f9e99ce0",
          "300": "#f6df6ad1",
          "400": "#f3d439c2",
          "500": "#f0c907b3",
          "600": "#c0a106c2",
          "700": "#907904d1",
          "800": "#605003e0",
          "900": "#302801f0"
        },

        'shadow': {
          '50': '#f9f6fe',
          '100': '#f2eafd',
          '200': '#e7d9fb',
          '300': '#d4bbf7',
          '400': '#b98ff1',
          '500': '#9f64e8',
          '600': '#8844d9',
          '700': '#7432be',
          '800': '#632d9c',
          '900': '#51267d',
          '950': '#300e53',
        },
        'poison': {
          '50': '#f9fbea',
          '100': '#f0f6d1',
          '200': '#e2efa7',
          '300': '#cde274',
          '400': '#b6d249',
          '500': '#a5c72e',
          '600': '#76921e',
          '700': '#5a701b',
          '800': '#49591b',
          '900': '#3d4c1b',
          '950': '#1f290a',
        },
        'nature': {
          '50': '#e9ffe4',
          '100': '#cfffc5',
          '200': '#a1ff92',
          '300': '#66ff53',
          '400': '#32fb20',
          '500': '#0fe200',
          '600': '#06b500',
          '700': '#068902',
          '800': '#0a6c08',
          '900': '#0b500b',
          '950': '#003302',
        },

        'spirit': {
          '50': '#f8f8f8',
          '100': '#f1efef',
          '200': '#e6e2e2',
          '300': '#d4cdcd',
          '400': '#b9b0b0',
          '500': '#9e9292',
          '600': '#877b7b',
          '700': '#706565',
          '800': '#5e5656',
          '900': '#514b4b',
          '950': '#2a2525',
        },

        'tempus': {
          '50': '#fdfce9',
          '100': '#fcfbc5',
          '200': '#faf58e',
          '300': '#f6e84e',
          '400': '#f1d71e',
          '500': '#e1bf11',
          '600': '#b88d0b',
          '700': '#9b6c0d',
          '800': '#805513',
          '900': '#6d4516',
          '950': '#402408',
        },

        "trickery": {
          '50': '#fff8eb',
          '100': '#fdebc8',
          '200': '#fbd68c',
          '300': '#f9bb50',
          '400': '#f7a228',
          '500': '#e6790e',
          '600': '#d55c0a',
          '700': '#b13d0c',
          '800': '#8f3011',
          '900': '#762911',
          '950': '#441104',
        },

        "chaos": {
          '50': '#fdf2fa',
          '100': '#fce7f6',
          '200': '#fad0ee',
          '300': '#f694d8',
          '400': '#f274c9',
          '500': '#ea4ab1',
          '600': '#d82a91',
          '700': '#bc1a75',
          '800': '#9b1961',
          '900': '#811a53',
          '950': '#4f082f',
        },

        'void': {
          '50': '#f6f5f5',
          '100': '#e7e6e6',
          '200': '#d2cfcf',
          '300': '#b2aeaf',
          '400': '#8b8586',
          '500': '#706a6b',
          '600': '#5f5b5b',
          '700': '#514d4d',
          '800': '#464445',
          '900': '#3e3b3b',
          '950': '#302e2e',
        },


        'red-faded': {
          500: 'rgb(223,189,162)',
          600: 'rgb(222,190,164)'
        },
        'wax': {
          '50': '#fff1f2',
          '100': '#ffe1e2',
          '200': '#ffc7c9',
          '300': '#ffa1a5',
          '400': '#ff6a70',
          '500': '#f83b43',
          '600': '#e51d26',
          '700': '#c1141c',
          '800': '#9f151b',
          '900': '#84181d',
          '950': '#330507',
        },

        'willow': {
          '50': '#f7f8ed',
          '100': '#ecefd8',
          '200': '#dae1b5',
          '300': '#c0cd89',
          '400': '#a6b760',
          '500': '#8a9d45',
          '600': '#6b7c34',
          '700': '#53602b',
          '800': '#434d27',
          '900': '#3b4324',
          '950': '#1d2310',
        },

        'maroon': {
          '50': '#fff4eb',
          '100': '#ffe7d0',
          '200': '#ffc9a1',
          '300': '#ffa165',
          '400': '#ff6e27',
          '500': '#ff4500',
          '600': '#ff2700',
          '700': '#d61700',
          '800': '#a91203',
          '900': '#841206',
          '950': '#4a0400',
        },

        'palm': {
          '50': '#edfee7',
          '100': '#d6fdca',
          '200': '#b1fa9c',
          '300': '#80f462',
          '400': '#56e833',
          '500': '#35ce14',
          '600': '#24a50b',
          '700': '#1e7d0e',
          '800': '#1c6311',
          '900': '#1a5413',
          '950': '#093305',
        },

        'matrix': {
          '50': '#f0fdf1',
          '100': '#dcfce0',
          '200': '#bbf7c2',
          '300': '#86ef93',
          '400': '#4ade5d',
          '500': '#22c538',
          '600': '#16a329',
          '700': '#158024',
          '800': '#166522',
          '900': '#14531e',
          '950': '#052e0c',
        },

        'tan': {

        },

        'paper': {
          '50': '#fcf8f0',
          '100': '#f7eedd',
          '200': '#eedaba',
          '300': '#e3bf8e',
          '400': '#d9a368',
          '500': '#ce8541',
          '600': '#c06f36',
          '700': '#a0572e',
          '800': '#80472c',
          '900': '#683c26',
          '950': '#381d12',
        },

        'serria': {
          '50': '#fcf8f0',
          '100': '#f7eedd',
          '200': '#eedaba',
          '300': '#e3bf8e',
          '400': '#d9a368',
          '500': '#ce8541',
          '600': '#c06f36',
          '700': '#a0572e',
          '800': '#80472c',
          '900': '#683c26',
          '950': '#381d12',
        },
        'iron': {
          '50': '#f6f6f7',
          '100': '#efeff0',
          '200': '#e1e2e4',
          '300': '#d0d1d4',
          '400': '#bababf',
          '500': '#a7a7ad',
          '600': '#929399',
          '700': '#7e7e84',
          '800': '#67676c',
          '900': '#565659',
          '950': '#323234',
        },
        'bombay': {
          '50': '#f6f7f8',
          '100': '#ebecee',
          '200': '#dbdfe2',
          '300': '#c2c9ce',
          '400': '#afb7be',
          '500': '#8e98a3',
          '600': '#7d8693',
          '700': '#707885',
          '800': '#5f636e',
          '900': '#4e525a',
          '950': '#323539',
        },
        'tea': {
          '50': '#f7f6f5',
          '100': '#edebe7',
          '200': '#dad5ce',
          '300': '#C3C4C9',
          '400': '#aa9d8d',
          '500': '#988777',
          '600': '#8c796a',
          '700': '#756359',
          '800': '#60534c',
          '900': '#4f443f',
          '950': '#292321',
        },

        'gray-blue': {
          '50': '#f6f6f7',
          '100': '#eeeff1',
          '200': '#e0e1e5',
          '300': '#cdced4',
          '400': '#b8b9c1',
          '500': '#9e9eaa',
          '600': '#908f9c',
          '700': '#7c7b87',
          '800': '#66656e',
          '900': '#54545b',
          '950': '#313135',
        },

        'matte': {
          100: "rgb(47 48 52 / <alpha-value>)",
          200: "rgb(32 33 36 / <alpha-value>)"
        },
        'sand': {
          '50': '#fbf8f1',
          '100': '#f6edde',
          '200': '#ecd9bc',
          '300': '#e2c298',
          '400': '#d39c64',
          '500': '#c98346',
          '600': '#bb6e3b',
          '700': '#9c5732',
          '800': '#7d462f',
          '900': '#663c28',
          '950': '#361d14',
        },
        "vellum": {
          "100": "rgb(216 208 189 / <alpha-value>)",
          "200": "rgb(195 168 118 / <alpha-value>)",
          "300": "rgb(224 170 59 / <alpha-value>)",
          "400": "rgb(183 130 20 / <alpha-value>)",
          "500": "rgb(183 130 20 / <alpha-value>)",
          "600": "rgb(183 130 20 / <alpha-value>)",
          "700": "rgb(126 91 18 / <alpha-value>)",
        },
        "bluez": {
          "100": "rgb(220 244 248 / <alpha-value>)",
          "200": "rgb(31 200 228 / <alpha-value>)",
          "300": "rgb(10 170 210 / <alpha-value>)",
          "400": "rgb(13 148 189 / <alpha-value>)",
          "500": "rgb(5 79 119 / <alpha-value>)",
          "600": "rgb(18 27 59 / <alpha-value>)",
        },
        "redwave": {
          "100": "rgb(255 25 44 / <alpha-value>)",
          "200": "rgb(235 12 31 / <alpha-value>)",
          "300": "rgb(191 7 22 / <alpha-value>)",
          "400": "rgb(172 6 19 / <alpha-value>)",
          "500": "rgb(133 5 16 / <alpha-value>)",
        },
        "cypurple": {
          100: "rgb(250 169 122 / <alpha-value>)",
          300: "rgb(116 12 68 / <alpha-value>)",
          400: "rgb(56 9 14 / <alpha-value>)",
          500: "rgb(32 20 16 / <alpha-value>)",
        },
        "grape": {
          100: "rgb(195 48 178 / <alpha-value>)",
          200: "rgb(115 17 108 / <alpha-value>)",
          300: "rgb(100 30 176 / <alpha-value>)",
          400: "rgb(30 6 45 / <alpha-value>)",
        },
        "lava": {
          100: 'rgb(235 166 47 )',
          200: "rgb(245 122 41 )",
          300: "rgb(217 68 45 )",
          400: 'rgb(191 54 33 )',
          500: 'rgb(158 46 27 )'
        }

      },
      fontSize: {

        xxs: 'var(--text-xxs)',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        md: 'var(--text-md)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)'
      },

      height: {
        line: '0.0625rem',
        xs: '2px',
        dialog: 771,
        lg: 686,
        xl: 850,
        "13": 52,
        "23": 92,
        "25": 100,
        "78": 312,

      },
      minHeight: {
        title: 80,
        sm: 100,
        13: 52,
        md: 256,
        lg: 686,
        xl: 1024
      },
      maxHeight: {
        "dialog-sm": 257,
        "dialog-lg": 663,
        lg: 686,
        xl: 850,
        dialog: 771,
      },
      lineHeight: {
        'snug': 1.375
      },
      zIndex: {
        100: 100,
        mask: 101,
        dialog: 1000
      },
      translate: {
        min: 1
      },
      transitionDuration: {
        '1500': '1.5s',
        '2000': '2s',
        '3000': '3s',
        '5000': '5s',
      },
      borderRadius: {
        'xs': '1px',
        'lg': '0.45rem',
        "xxl": "72px"
      },
      gap: {
        "sm": 5.5,
      },


      dropShadow: {
      },

      padding: {
        "4.5": "1.125rem",
      },
      margin: {
        "2.5": 10,
        "4.5": "1.125rem",
        "7.5": "1.975rem",
        "10.5": 42,
        "15": 60,
        "31": 124,

      },

      minWidth: {
        "10": 40,
        sm: 241,
        "70": '17.5rem',
        "120": '30rem',
        "button-md": 80,
      },
      width: {
        "4.5": "1.125rem",
        "13": 52,
        "25": 100,
        "70": '17.5rem',
        "74": 296,
        "76": 304,
        "92": 368,
        "120": '30rem',
        "md": 704,
        "xl": 1046
      },
      maxWidth: {
        "70": '17.5rem',
        "74": 296,
        "76": 304,
        xl: 1046,
        lg: 704,
        sm: 241,
        md: 387,
      },


      neonGlowSize: {
        xs: '0.015em',
        sm: '0.03em',
        md: '2px',
        lg: '4px'
      },


    },
  },
  plugins: [

    plugin(({ addComponents, theme }) => {

      addComponents({
        '.tea': {
          '@apply bg-tea-300 text-blue-950': {},
          '&[type=button], & button': {
            '@apply bg-bluez-500/20 flex justify-center items-center enabled:hover:bg-bluez-500/30 active:bg-bluez-500/30 px-2 py-0.5 disabled:opacity-50': {}
          }
        },

        '.tea .header': {
          '@apply bg-blue-800/20 text-center': {}
        },


      });

      addComponents({
        '.paper': {
          '@apply bg-amber-600/20 text-amber-950': {},
          '& button, &[type=button]': {
            '@apply text-amber-950 bg-amber-600/20 hover:enabled:bg-amber-700/30 border-amber-950 active:enabled:bg-amber-700/40 disabled:opacity-50': {}
          },
        },

        '.paper input': {
          '@apply placeholder:text-amber-950 text-amber-950 placeholder:text-opacity-60': {}
        },
        '.paper .header': {
          '@apply bg-amber-700/25 text-center': {}
        },


      });

      addComponents({
        '.paper-dark': {
          '@apply bg-amber-700/35 enabled:hover:bg-amber-700/60 disabled:hover:bg-amber-700/40 text-amber-950': {},
          '&.header': {
            '@apply bg-amber-700/45': {}
          },
          '& button, &[type=button]': {
            '@apply bg-amber-800/40 hover:enabled:bg-amber-800/50 active:enabled:bg-amber-800/60  disabled:opacity-50': {}
          },
        },

      });

      addComponents({
        '.vellum': {
          '@apply bg-vellum-700/20 text-amber-950': {},
          '&.header': {
            '@apply bg-vellum-700/40': {}
          },
          '& button, &[type=button]': {
            '@apply bg-vellum-700/45 enabled:hover:bg-vellum-700/60 disabled:opacity-50': {}
          },
        },

      });

      addComponents({
        '.willow': {
          '@apply bg-willow-400/50 text-amber-950 text-willow-900': {},
        },
        '.willow .item, willow.item': {
          '@apply hover:bg-willow-600/50': {}
        },
        'button.willow, .willow button': {
          '@apply hover:enabled:bg-willow-700/50 active:enabled:bg-willow-700/50 disabled:opacity-50': {}
        },
        '.willow .header': {
          '@apply bg-willow-700/50 text-center': {}
        },


      });

      addComponents({
        '.rosewood': {
          '@apply bg-rose-900/15': {},
          '& button, &[type=button]': {
            '@apply rounded-sm bg-rose-900/15 enabled:hover:bg-rose-900/30 enabled:active:bg-rose-900/40 disabled:opacity-50': {}
          }
        },

      });

      addComponents({

        '.btn-sm': {
          'min-width': '4em',
          'max-width': '7em',
          'min-height': '0.5em',
          'padding': `1px ${theme('padding.1')}`,
          '&:disabled': {
            opacity: '0.5',

          }
        }
      });

      addComponents({

        '.btn': {
          'min-width': '8em',
          'max-width': '13em',
          'min-height': '0.5em',
          'padding': `1px 4px 1px 6px`,
          '&:disabled': {
            opacity: '0.5',
          }
        }
      })

    }),

  ],
};
