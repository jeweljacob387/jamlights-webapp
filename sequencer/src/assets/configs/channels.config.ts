export const groups: Array<Group> = [
    {
        name: 'frontLeft',
        color: '#FF0000',
        nodes: [
            {
                name: 'channe 1',
                deviceIndex: 1,
                color: '#00000F'
            },
            {
                name: 'channe 2',
                deviceIndex: 2,
                color: '#0000F0'
            },
            {
                name: 'channe 3',
                deviceIndex: 3,
                color: '#000F00'
            },
            {
                name: 'channe 4',
                deviceIndex: 4,
                color: '#00F000'
            },
            {
                name: 'channe 5',
                deviceIndex: 5,
                color: '#0F0000'
            },
            {
                name: 'channe 6',
                deviceIndex: 6,
                color: '#F00000'
            },
            {
                name: 'channe 7',
                deviceIndex: 7,
                color: '#F0000F'
            },
            {
                name: 'channe 8',
                deviceIndex: 8,
                color: '#F000F0'
            },
            {
                name: 'channe 9',
                deviceIndex: 9,
                color: '#F00F00'
            },
            {
                name: 'channe 10',
                deviceIndex: 10,
                color: '#F0F000'
            },

        ]
    },
    {
        name: 'frontRight',
        color: '#FF0000',
        nodes: [
            {
                name: 'channe 1',
                deviceIndex: 1,
                color: '#00000F'
            },
            {
                name: 'channe 2',
                deviceIndex: 2,
                color: '#0000F0'
            },
            {
                name: 'channe 3',
                deviceIndex: 3,
                color: '#000F00'
            },
            {
                name: 'channe 4',
                deviceIndex: 4,
                color: '#00F000'
            },
            {
                name: 'channe 5',
                deviceIndex: 5,
                color: '#0F0000'
            },
            {
                name: 'channe 6',
                deviceIndex: 6,
                color: '#F00000'
            },
            {
                name: 'channe 7',
                deviceIndex: 7,
                color: '#F0000F'
            },
            {
                name: 'channe 8',
                deviceIndex: 8,
                color: '#F000F0'
            },
            {
                name: 'channe 9',
                deviceIndex: 9,
                color: '#F00F00'
            },
            {
                name: 'channe 10',
                deviceIndex: 10,
                color: '#F0F000'
            },

        ]
    },
    {
        name: 'middleCenter',
        color: '#FF0000',
        nodes: [
            {
                name: 'channe 1',
                deviceIndex: 1,
                color: '#00000F'
            },
            {
                name: 'channe 2',
                deviceIndex: 2,
                color: '#0000F0'
            },
            {
                name: 'channe 3',
                deviceIndex: 3,
                color: '#000F00'
            },
            {
                name: 'channe 4',
                deviceIndex: 4,
                color: '#00F000'
            },
            {
                name: 'channe 5',
                deviceIndex: 5,
                color: '#0F0000'
            },
            {
                name: 'channe 6',
                deviceIndex: 6,
                color: '#F00000'
            },
            {
                name: 'channe 7',
                deviceIndex: 7,
                color: '#F0000F'
            },
            {
                name: 'channe 8',
                deviceIndex: 8,
                color: '#F000F0'
            },
            {
                name: 'channe 9',
                deviceIndex: 9,
                color: '#F00F00'
            },
            {
                name: 'channe 10',
                deviceIndex: 10,
                color: '#F0F000'
            },

        ]
    },
    {
        name: 'rearLeft',
        color: '#FF0000',
        nodes: [
            {
                name: 'channe 1',
                deviceIndex: 1,
                color: '#00000F'
            },
            {
                name: 'channe 2',
                deviceIndex: 2,
                color: '#0000F0'
            },
            {
                name: 'channe 3',
                deviceIndex: 3,
                color: '#000F00'
            },
            {
                name: 'channe 4',
                deviceIndex: 4,
                color: '#00F000'
            },
            {
                name: 'channe 5',
                deviceIndex: 5,
                color: '#0F0000'
            },
            {
                name: 'channe 6',
                deviceIndex: 6,
                color: '#F00000'
            },
            {
                name: 'channe 7',
                deviceIndex: 7,
                color: '#F0000F'
            },
            {
                name: 'channe 8',
                deviceIndex: 8,
                color: '#F000F0'
            },
            {
                name: 'channe 9',
                deviceIndex: 9,
                color: '#F00F00'
            },
            {
                name: 'channe 10',
                deviceIndex: 10,
                color: '#F0F000'
            },

        ]
    }
];


export interface Node {
    name: string;
    color: string;
    deviceIndex: number;
    isPWM?: boolean;
}

export interface Group {
    name: string;
    nodes: Array<Node>;
    color: string;
}
