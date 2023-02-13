import type { Position } from "@threlte/core"

export type StarData = {
    id: number,
    rightAscencion: number,
    declination: number,
    parallax: number,
    pseudocolor: string,
    mag: number,
    coordinates: Position
}

export type Connection = {
    startingStar: StarData | undefined,
    endingStar: StarData | undefined
}

export type ConstellationData = {
    name: string,
    discoverer: string,
    connections: Connection[],
    viewedFromStarId: number
}