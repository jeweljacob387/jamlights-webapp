export const groups: Array<Group> = [
    {
        name: 'frontLeft',
        color: '#FF0000',
        nodes: [
            {
                name: 'channel4',
                deviceIndex: 4,
                color: '#00ff00'
            },
            {
                name: 'channel5',
                deviceIndex: 5,
                isPWM: true,
                color: '#f00f0f'
            }
        ]
    },
    {
        name: 'frontRight',
        color: '#FF0000',
        nodes: [
            {
                name: 'channel1',
                deviceIndex: 1,
                isPWM: true,
                color: '#ff0000'
            },
            {
                name: 'channel2',
                deviceIndex: 2,
                color: '#ff0ff0'
            },
            {
                name: 'channel5',
                deviceIndex: 5,
                isPWM: true,
                color: '#f00f0f'
            }
        ]
    },
    {
        name: 'middleCenter',
        color: '#FF0000',
        nodes: [
            {
                name: 'channel3',
                deviceIndex: 3,
                color: '#ffff00'
            },
            {
                name: 'channel4',
                deviceIndex: 4,
                color: '#00ff00'
            },
            {
                name: 'channel5',
                deviceIndex: 5,
                isPWM: true,
                color: '#f00f0f'
            }
        ]
    },
    {
        name: 'rearLeft',
        color: '#FF0000',
        nodes: [
            {
                name: 'channel1',
                deviceIndex: 1,
                isPWM: true,
                color: '#ff0000'
            },
            {
                name: 'channel4',
                deviceIndex: 4,
                color: '#00ff00'
            },
            {
                name: 'channel5',
                deviceIndex: 5,
                isPWM: true,
                color: '#f00f0f'
            }
        ]
    },
    {
        name: 'rearRight',
        color: '#FF0000',
        nodes: [
            {
                name: 'channel1',
                deviceIndex: 1,
                isPWM: true,
                color: '#ff0000'
            },
            {
                name: 'channel2',
                deviceIndex: 2,
                color: '#ff0ff0'
            },
            {
                name: 'channel3',
                deviceIndex: 3,
                color: '#ffff00'
            }
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
