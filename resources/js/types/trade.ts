export interface Coaches {
    id: number,
    first_name: string,
    last_name: string,
    pivot?: {
        coach_id: number,
        player_id: number
    }
}

export interface Players {
    id: number,
    first_name: string,
    last_name: string,
    coaches: Coaches[]
}

export interface TradeProps {
    players: Players[]
}
