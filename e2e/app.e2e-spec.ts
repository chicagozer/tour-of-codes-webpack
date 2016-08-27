import { TourOfCodesWebpackPage } from './app.po';

describe('tour-of-codes-webpack App', function() {
  let page: TourOfCodesWebpackPage;

  beforeEach(() => {
    page = new TourOfCodesWebpackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
