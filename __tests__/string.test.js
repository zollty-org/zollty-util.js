import strTemplate from '../src/string/strTemplate';

describe('string', () => {

  it('strTemplate!', () => {
    const s = '<span id="aaa">{{a}}</span>'
    const val = [{
      a: 111
    }, {
      a: 222
    }]
    const split = '<br/>'
    const ret = '<span id="aaa">111</span><br/><span id="aaa">222</span>'
    expect(strTemplate(s, val, split)).toEqual(ret);

    const s1 = '<span id="aaa">{{ a }}</span>---<span id="bbb">{{ b }}</span>'
    const val1 = {
      a: 111,
      b: 222
    }
    const ret1 = '<span id="aaa">111</span>---<span id="bbb">222</span>'
    expect(strTemplate(s1, val1)).toEqual(ret1);
  });


});
