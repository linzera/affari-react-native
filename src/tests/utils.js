/**
 * @format
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import { IntlProvider } from 'react-intl';

export function renderWithReactIntl(component) {
  return render(<IntlProvider locale="en">{component}</IntlProvider>);
}
