import {
  COLLECT_DETAILS,
  COLLECT_MEASUREMENTS,
  COLLECT_FARM_IMAGE,
  COLLECT_LOCATION,
} from '../types'

export const collectDetails = details => ({
  type: COLLECT_DETAILS,
  details,
})

export const collectMeasurements = measurements => ({
  type: COLLECT_MEASUREMENTS,
  measurements,
})

export const collectFarmImage = buffer => ({
  type: COLLECT_FARM_IMAGE,
  buffer,
})

export const collectLocation = location => ({
  type: COLLECT_LOCATION,
  location,
})

