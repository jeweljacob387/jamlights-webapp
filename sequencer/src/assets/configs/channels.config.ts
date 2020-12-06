export const groups: Array<Group> = [
    {
        name: 'group1',
        color: '#FF0000',
        nodes: [
            {
                name: 'channel1',
                isPWM: true,
                color: '#ff0000'
            },
            {
                name: 'channel2',
                color: '#ff0ff0'
            },
            {
                name: 'channel3',
                color: '#ffff00'
            },
            {
                name: 'channel4',
                color: '#00ff00'
            },
            {
                name: 'channel5',
                isPWM: true,
                color: '#f00f0f'
            }
        ]
    }
];


export type Channel = { name: string, isPWM?: boolean, color: string }

export type Group = { name: string, nodes: Array<Channel>, color: string }