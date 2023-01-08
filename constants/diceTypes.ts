import IDiceType from "../interfaces/IDiceType";

const diceTypes: IDiceType[] = [
    {
        type: 'dots',
        label: 'Dots',
        enabled: true,
        image: require('../assets/dice-dots.png'),
        faceType: 'image',
        faces: [
            require(`../assets/dice-six-faces-one.png`),
            require(`../assets/dice-six-faces-two.png`),
            require(`../assets/dice-six-faces-three.png`),
            require(`../assets/dice-six-faces-four.png`),
            require(`../assets/dice-six-faces-five.png`),
            require(`../assets/dice-six-faces-six.png`),
        ]
    },
    {
        type: 'num',
        enabled: false,
        label: 'Numbers',
        faceType: 'image',
        image: require('../assets/dice-num.png'),
        faces: [
            require(`../assets/dice-six-faces-six.png`),
            require(`../assets/dice-six-faces-six.png`),
            require(`../assets/dice-six-faces-six.png`),
            require(`../assets/dice-six-faces-six.png`),
            require(`../assets/dice-six-faces-six.png`),
            require(`../assets/dice-six-faces-six.png`)
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