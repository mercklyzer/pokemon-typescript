/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#B8C370'
        },
        'bug':      '#92BC2C',
        'dark':     '#595761',
        'dragon':   '#0C69C8',
        'electric': '#F2D94E',
        'fire':     '#f3a24e',
        'fairy':    '#EE90E6',
        'fighting': '#D3425F',
        'flying':   '#A1BBEC',
        'ghost':    '#5F6DBC',
        'grass':    '#5DB656',
        'ground':   '#DA7C4D',
        'ice':      '#75D0C1',
        'normal':   '#A0A29F',
        'poison':   '#B763CF',
        'psychic':  '#FA8581',
        'rock':     '#C9BB8A',
        'steel':    '#5695A3',
        'water':    '#539ddf'
      },   
      boxShadow: {
        'bug':      '0 0 20px #92BC2C',
        'dark':     '0 0 20px #595761',
        'dragon':   '0 0 20px #0C69C8',
        'electric': '0 0 20px #F2D94E',
        'fire':     '0 0 20px #f3a24e',
        'fairy':    '0 0 20px #EE90E6',
        'fighting': '0 0 20px #D3425F',
        'flying':   '0 0 20px #A1BBEC',
        'ghost':    '0 0 20px #5F6DBC',
        'grass':    '0 0 20px #5DB656',
        'ground':   '0 0 20px #DA7C4D',
        'ice':      '0 0 20px #75D0C1',
        'normal':   '0 0 20px #A0A29F',
        'poison':   '0 0 20px #B763CF',
        'psychic':  '0 0 20px #FA8581',
        'rock':     '0 0 20px #C9BB8A',
        'steel':    '0 0 20px #5695A3',
        'water':    '0 0 20px #539ddf'
      }   

    },
  },
  plugins: [],
}
