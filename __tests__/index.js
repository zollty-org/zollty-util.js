// import { a } from '../src/a'
// import { b } from '../src/b'
// import { c } from '../src/c'
// import { validateMobile } from '../src/validateMobile'
// import {
//   a,
//   b,
//   c
// } from '../src';
import isPhoneNum from '../src/validate/isPhoneNum';

describe('library', () => {
  const consoleLog = jest.spyOn(console, 'log');

  afterEach(() => {
    consoleLog.mockClear();
  });

  // describe('a', () => {
  //   it('console logs "a"', () => {
  //     a();
  //     expect(consoleLog).toHaveBeenCalledTimes(1);
  //     expect(consoleLog).toHaveBeenCalledWith('aaaa');
  //   });
  // });
  // describe('b', () => {
  //   it('console logs "b"', () => {
  //     b();
  //     expect(consoleLog).toHaveBeenCalledTimes(1);
  //     expect(consoleLog).toHaveBeenCalledWith('b');
  //   });
  // });
  // describe('c', () => {
  //   it('console logs "c"', () => {
  //     c();
  //     expect(consoleLog).toHaveBeenCalledTimes(1);
  //     expect(consoleLog).toHaveBeenCalledWith('c');
  //   });
  // });

  describe('validateMobile', () => {
    it('phone num validate success!', () => {
      expect(isPhoneNum('11111')).toBeFalsy();
      expect(isPhoneNum('13787655298')).toBeTruthy();
    });
  });

});
