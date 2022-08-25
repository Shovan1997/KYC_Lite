import {
  OfferCallPayload,
  HangupCallPayload,
  PollAnswerPayload,
  SendIcePayload,
} from '../../models/WebRTCModels';
import Axios from 'axios';
import {environment} from '../../environment';

export const OfferCall = (payload: OfferCallPayload) => {
  console.log('offer');

  return Axios.post(environment.OFFER_CALL_URL, payload);
};

export const HangupCall = (payload: HangupCallPayload) => {
  return Axios.post(environment.HANGUP_CALL_URL, payload);
};

export const PollAnswer = (payload: PollAnswerPayload) => {
  return Axios.post(environment.POLL_ANSWER_URL, payload);
};

export const SendIce = (payload: SendIcePayload) => {
  payload.type = 'offer_ice';
  return Axios.post(environment.SEND_ICE_URL, payload);
};
