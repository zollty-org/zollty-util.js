import isPhoneNum from '../src/validate/isPhoneNum';
import isIdCard from '../src/validate/isIdCard';
import isBankCard from '../src/validate/isBankCard';

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
      expect(isPhoneNum('137876552981')).toBeFalsy();
      expect(isPhoneNum('10787655298')).toBeFalsy();

      expect(isPhoneNum('13787655298')).toBeTruthy();
      expect(isPhoneNum('19910141605')).toBeTruthy();
      expect(isPhoneNum('17810141605')).toBeTruthy();
      expect(isPhoneNum('16610141605')).toBeTruthy();
    });
  });

  it('Id Card validate success!', () => {
    expect(isIdCard('1217002710000684874')).toBeFalsy();
    expect(isIdCard('10787655298')).toBeFalsy();

    expect(isIdCard('500112189908123451')).toBeTruthy();
    expect(isIdCard('990112189908123451')).toBeTruthy();
  });

  it('Bank Card validate success!', () => {
    expect(isBankCard('1217002710000684874')).toBeFalsy();
    expect(isBankCard('137876552981')).toBeFalsy();
    expect(isBankCard('500112189908123451')).toBeFalsy();

    expect(isBankCard('4816990008469381')).toBeTruthy();
    expect(isBankCard('5201528811118888')).toBeTruthy();
    expect(isBankCard('4816990008469381')).toBeTruthy();
    expect(isBankCard('6270613301000030449')).toBeTruthy();
    expect(isBankCard('6217002710000684874')).toBeTruthy();
  });

});
