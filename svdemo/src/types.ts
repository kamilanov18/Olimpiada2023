import type { Position } from "@threlte/core"

export type StarData = {
    id: number,
    rightAscencion: number,
    declination: number,
    parallax: number,
    pseudocolor: number,
    coordinates: Position
}
