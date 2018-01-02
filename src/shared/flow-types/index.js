// @flow

export type PredictionOutcomeType = {
  predictionId: string,
  outcome: string,
  title: string,
  isDisabled: boolean
}

export type PredictionType = {
  id: string,
  title: string,
  type: string,
  publishedAt: Date,
  visibleStartsAt: Date,
  votingEndsAt: Date,
  votingStartsAt: Date,
  outcome: string,
  winAt: Date,
  isDisabled: boolean,
  userPrediction: string,
  outcomes: PredictionOutcomeType[]
}
