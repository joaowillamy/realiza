import { render } from '@testing-library/react';

import Theme from './theme';

describe('Theme', () => {
  it('should render successfully', () => {
    const Test = () => <>test</>
    const { baseElement } = render(<Theme><Test /></Theme>);
    expect(baseElement).toBeTruthy();
  });
});
