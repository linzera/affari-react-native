/* eslint-disable no-console */
/**
 * @flow
 * @format
 */

import { element, by } from 'detox';

const INFO_MESSAGE_MAPPING = {
  ELEMENT: 'Waiting for Element:',
  TAP: 'Tapping on element: ',
  TYPE: 'Typing on element: ',
};

export function elementById(testID: string) {
  console.info(INFO_MESSAGE_MAPPING.ELEMENT, testID);
  return element(by.id(testID));
}

export function elementByLabel(label: string) {
  console.info(INFO_MESSAGE_MAPPING.ELEMENT, label);
  return element(by.label(label));
}

export function elementByText(text: string) {
  console.info(INFO_MESSAGE_MAPPING.ELEMENT, text);
  return element(by.text(text));
}

export function tapByLabelAndType(label: string, type: string) {
  console.info(INFO_MESSAGE_MAPPING.TAP, label);
  return element(by.label(label).and(by.type(type))).tap();
}

export function tapById(testID: string) {
  console.info(INFO_MESSAGE_MAPPING.TAP, testID);
  return element(by.id(testID)).tap();
}

export function tapByLabel(label: string) {
  console.info(INFO_MESSAGE_MAPPING.TAP, label);
  return element(by.label(label)).tap();
}

export function tapByText(text: string) {
  console.info(INFO_MESSAGE_MAPPING.TAP, text);
  return element(by.label(text)).tap();
}

export function longPressById(testID: string) {
  console.info(INFO_MESSAGE_MAPPING.TAP, testID);
  return element(by.id(testID)).longPress();
}

export function typeTextById(testID: string, text: string) {
  console.info(INFO_MESSAGE_MAPPING.TYPE, testID);
  return element(by.id(testID)).typeText(text);
}
