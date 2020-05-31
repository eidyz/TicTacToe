import * as _ from "lodash"

export const wait = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(), ms))

export const arrayContainsArray = (arr: any[], target: any[]) => _.every(target, v => _.includes(arr, v));