const defaultValue = [
  {
    "domain": ".facebook.com",
    "expirationDate": 1722508076.446321,
    "hostOnly": false,
    "httpOnly": true,
    "name": "datr",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "KwucZJiuV6Pt7QvDSvWv_1c8",
  },
  {
    "domain": ".facebook.com",
    "expirationDate": 1695724114.799501,
    "hostOnly": false,
    "httpOnly": true,
    "name": "fr",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "0s7rBxBMZUf9o7kcD.AWUsDE85TrtSNf4EZQIz8kWwIDI.BknAsr.ga.AAA.0.0.BknAtT.AWWVByPWVPc",
  },
  {
    "domain": ".facebook.com",
    "expirationDate": 1719482742.508386,
    "hostOnly": false,
    "httpOnly": true,
    "name": "xs",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "43%3A3zNSD0qCtCm1Rg%3A2%3A1687704269%3A-1%3A6154",
  },
  {
    "domain": ".facebook.com",
    "expirationDate": 1719482742.508271,
    "hostOnly": false,
    "httpOnly": false,
    "name": "c_user",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "100026384723345",
  },
  {
    "domain": ".facebook.com",
    "hostOnly": false,
    "httpOnly": false,
    "name": "presence",
    "path": "/",
    "sameSite": null,
    "secure": true,
    "session": true,
    "storeId": null,
    "value": "C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1687948126804%2C%22v%22%3A1%7D",
  },
  {
    "domain": ".facebook.com",
    "expirationDate": 1688552875,
    "hostOnly": false,
    "httpOnly": false,
    "name": "dpr",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "1",
  },
  {
    "domain": ".facebook.com",
    "expirationDate": 1722508075.472815,
    "hostOnly": false,
    "httpOnly": true,
    "name": "sb",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "KwucZIRfATX7Pc0VjAfP9_U9",
  },
  {
    "domain": ".facebook.com",
    "expirationDate": 1688552919,
    "hostOnly": false,
    "httpOnly": false,
    "name": "wd",
    "path": "/",
    "sameSite": "lax",
    "secure": true,
    "session": false,
    "storeId": null,
    "value": "832x430",
  },
];

function getCUserAndXS(data) {
  const c_user = data.c_user.value;
  const xs = data.xs.value;
  return { c_user, xs };
}

const data = {
  "c_user": {
    "domain": null,
    "httpOnly": false,
    "name": "c_user",
    "path": null,
    "secure": false,
    "value": "100026384723345",
  },
  "datr": {
    "domain": null,
    "httpOnly": false,
    "name": "datr",
    "path": null,
    "secure": false,
    "value": "v1KYZLJMvqJOoAWxQww_AMST",
  },
  "fbl_ci": {
    "domain": null,
    "httpOnly": false,
    "name": "fbl_ci",
    "path": null,
    "secure": false,
    "value": "611376313908674",
  },
  "fbl_cs": {
    "domain": null,
    "httpOnly": false,
    "name": "fbl_cs",
    "path": null,
    "secure": false,
    "value": "AhCmODjJcVedR3HyQcukppdkGGZhUz01T21TQWgvS0FxN3dRQks0eDFPYg",
  },
  "fbl_st": {
    "domain": null,
    "httpOnly": false,
    "name": "fbl_st",
    "path": null,
    "secure": false,
    "value": "100636702%3BT%3A28128416",
  },
  "fr": {
    "domain": null,
    "httpOnly": false,
    "name": "fr",
    "path": null,
    "secure": false,
    "value": "0uDvaBFgNYxNq0ADn.AWWRitim9JBGYXpyqpPQ0baeLoY.BkmFK_.lT.AAA.0.0.BkmFLN.AWUPXXn-rfU",
  },
  "locale": { "domain": null, "httpOnly": false, "name": "locale", "path": null, "secure": false, "value": "vi_VN" },
  "m_page_voice": {
    "domain": null,
    "httpOnly": false,
    "name": "m_page_voice",
    "path": null,
    "secure": false,
    "value": "100026384723345",
  },
  "m_pixel_ratio": {
    "domain": null,
    "httpOnly": false,
    "name": "m_pixel_ratio",
    "path": null,
    "secure": false,
    "value": "2.75",
  },
  "sb": {
    "domain": null,
    "httpOnly": false,
    "name": "sb",
    "path": null,
    "secure": false,
    "value": "v1KYZJ-WiM7t9DmVD7LVFF3o",
  },
  "vpd": {
    "domain": null,
    "httpOnly": false,
    "name": "vpd",
    "path": null,
    "secure": false,
    "value": "v1%3B704x361x2.75",
  },
  "wd": { "domain": null, "httpOnly": false, "name": "wd", "path": null, "secure": false, "value": "361x429" },
  "wl_cbv": {
    "domain": null,
    "httpOnly": false,
    "name": "wl_cbv",
    "path": null,
    "secure": false,
    "value": "v2%3Bclient_version%3A2278%3Btimestamp%3A1687704962",
  },
  "xs": {
    "domain": null,
    "httpOnly": false,
    "name": "xs",
    "path": null,
    "secure": false,
    "value": "43%3A3zNSD0qCtCm1Rg%3A2%3A1687704269%3A-1%3A6154",
  },
};

const {c_user,xs}= getCUserAndXS(data)
console.log('c_user',c_user,'xs',xs)
