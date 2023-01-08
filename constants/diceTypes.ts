import IDiceType from "../interfaces/IDiceType";

const diceTypes: IDiceType[] = [
    {
        type: 'dots',
        label: 'Dots',
        enabled: true,
        image: require('../assets/dice-dots.png'),
        faceType: 'image',
        faces: [
            'dice-six-faces-one.png',
            'dice-six-faces-two.png',
            'dice-six-faces-three.png',
            'dice-six-faces-four.png',
            'dice-six-faces-five.png',
            'dice-six-faces-six.png'
        ]
    },
    {
        type: 'num',
        enabled: false,
        label: 'Numbers',
        faceType: 'image',
        image: require('../assets/dice-num.png'),
        faces: [
            'dice-num-six-faces-one.png',
            'dice-num-six-faces-two.png',
            'dice-num-six-faces-three.png',
            'dice-num-six-faces-four.png',
            'dice-num-six-faces-five.png',
            'dice-num-six-faces-six.png'
        ]
    },
    {
        type: 'colors',
        label: 'Colors',
        enabled: true,
        faceType: 'color',
        image: require('../assets/dice-colors.png'),
        faces: ['red', 'yellow', 'green', 'blue', 'magenta', 'cyan']
    }
];


export default diceTypes;