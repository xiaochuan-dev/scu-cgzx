function getSign(dataStr: string) {
  const key =
    '58967e2beb6fffd3c96545eebd3000b39c10087d48faa0d41f9c7bf3720e0ea4';
  const res = window.sm2.doSignature(dataStr, key, {
    hash: true,
    der: true,
  });
  return res;
}

function s(e) {
  return e.split('').reverse().join('');
}

function t() {
  (this.mode = 1), (this.isPadding = !0), (this.sk = new Array(32));
}
function i() {
  (this.SM4_ENCRYPT = 1), (this.SM4_DECRYPT = 0);
  var e = [
      214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5,
      43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156,
      66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228,
      179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71,
      7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104,
      107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30,
      36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0,
      70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191,
      138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224,
      174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29,
      246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213,
      219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141,
      27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10,
      193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176,
      137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198,
      132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57,
      72,
    ],
    n = [2746333894, 1453994832, 1736282519, 2993693404],
    a = [
      462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617,
      2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825,
      1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337,
      4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545,
      2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753,
      1213159005, 1684763257,
    ];
  (this.GET_ULONG_BE = function (e, n) {
    return (
      ((255 & e[n]) << 24) |
      ((255 & e[n + 1]) << 16) |
      ((255 & e[n + 2]) << 8) |
      (255 & e[n + 3])
    );
  }),
    (this.PUT_ULONG_BE = function (e, n, a) {
      var r = 255 & (e >> 24),
        o = 255 & (e >> 16),
        t = 255 & (e >> 8),
        i = 255 & e;
      (n[a] = r > 128 ? r - 256 : r),
        (n[a + 1] = o > 128 ? o - 256 : o),
        (n[a + 2] = t > 128 ? t - 256 : t),
        (n[a + 3] = i > 128 ? i - 256 : i);
    }),
    (this.SHL = function (e, n) {
      return (4294967295 & e) << n;
    }),
    (this.ROTL = function (e, n) {
      this.SHL(e, n);
      return this.SHL(e, n) | (e >> (32 - n));
    }),
    (this.sm4Lt = function (e) {
      var n,
        a,
        r = new Array(4),
        o = new Array(4);
      return (
        this.PUT_ULONG_BE(e, r, 0),
        (o[0] = this.sm4Sbox(r[0])),
        (o[1] = this.sm4Sbox(r[1])),
        (o[2] = this.sm4Sbox(r[2])),
        (o[3] = this.sm4Sbox(r[3])),
        (n = this.GET_ULONG_BE(o, 0)),
        (a =
          n ^
          this.ROTL(n, 2) ^
          this.ROTL(n, 10) ^
          this.ROTL(n, 18) ^
          this.ROTL(n, 24)),
        a
      );
    }),
    (this.sm4F = function (e, n, a, r, o) {
      return e ^ this.sm4Lt(n ^ a ^ r ^ o);
    }),
    (this.sm4CalciRK = function (e) {
      var n,
        a,
        r = new Array(4),
        o = new Array(4);
      return (
        this.PUT_ULONG_BE(e, r, 0),
        (o[0] = this.sm4Sbox(r[0])),
        (o[1] = this.sm4Sbox(r[1])),
        (o[2] = this.sm4Sbox(r[2])),
        (o[3] = this.sm4Sbox(r[3])),
        (n = this.GET_ULONG_BE(o, 0)),
        (a = n ^ this.ROTL(n, 13) ^ this.ROTL(n, 23)),
        a
      );
    }),
    (this.sm4Sbox = function (n) {
      var a = 255 & n,
        r = e[a];
      return r > 128 ? r - 256 : r;
    }),
    (this.sm4_setkey_enc = function (e, n) {
      return null == e
        ? (alert('ctx is null!'), !1)
        : null == n || 16 !== n.length
        ? (alert('key error!'), !1)
        : ((e.mode = this.SM4_ENCRYPT), void this.sm4_setkey(e.sk, n));
    }),
    (this.sm4_setkey_dec = function (e, n) {
      null == e && Error('ctx is null!'),
        (null != n && 16 === n.length) || Error('key error!'),
        (e.mode = this.SM4_DECRYPT),
        this.sm4_setkey(e.sk, n),
        (e.sk = e.sk.reverse());
    }),
    (this.sm4_setkey = function (e, r) {
      var o = new Array(4),
        t = new Array(36);
      (o[0] = this.GET_ULONG_BE(r, 0)),
        (o[1] = this.GET_ULONG_BE(r, 4)),
        (o[2] = this.GET_ULONG_BE(r, 8)),
        (o[3] = this.GET_ULONG_BE(r, 12)),
        (t[0] = o[0] ^ n[0]),
        (t[1] = o[1] ^ n[1]),
        (t[2] = o[2] ^ n[2]),
        (t[3] = o[3] ^ n[3]);
      for (var i = 0; i < 32; i++)
        (t[i + 4] =
          t[i] ^ this.sm4CalciRK(t[i + 1] ^ t[i + 2] ^ t[i + 3] ^ a[i])),
          (e[i] = t[i + 4]);
    }),
    (this.padding = function (e, n) {
      if (null == e) return null;
      var a = null;
      if (n === this.SM4_ENCRYPT) {
        // @ts-ignore
        var r = parseInt(16 - (e.length % 16));
        a = e.slice(0);
        for (var o = 0; o < r; o++) a[e.length + o] = r;
      } else {
        var t = e[e.length - 1];
        a = e.slice(0, e.length - t);
      }
      return a;
    }),
    (this.sm4_one_round = function (e, n, a) {
      var r = 0,
        o = new Array(36);
      (o[0] = this.GET_ULONG_BE(n, 0)),
        (o[1] = this.GET_ULONG_BE(n, 4)),
        (o[2] = this.GET_ULONG_BE(n, 8)),
        (o[3] = this.GET_ULONG_BE(n, 12));
      while (r < 32)
        (o[r + 4] = this.sm4F(o[r], o[r + 1], o[r + 2], o[r + 3], e[r])), r++;
      this.PUT_ULONG_BE(o[35], a, 0),
        this.PUT_ULONG_BE(o[34], a, 4),
        this.PUT_ULONG_BE(o[33], a, 8),
        this.PUT_ULONG_BE(o[32], a, 12);
    }),
    (this.sm4_crypt_ecb = function (e, n) {
      null == n && alert('input is null!'),
        e.isPadding &&
          e.mode === this.SM4_ENCRYPT &&
          (n = this.padding(n, this.SM4_ENCRYPT));
      for (var a = 0, r = n.length, o = new Array(); r > 0; r -= 16) {
        var t = new Array(16),
          i = n.slice(16 * a, 16 * (a + 1));
        this.sm4_one_round(e.sk, i, t), (o = o.concat(t)), a++;
      }
      var s = o;
      e.isPadding &&
        e.mode === this.SM4_DECRYPT &&
        (s = this.padding(s, this.SM4_DECRYPT));
      for (var u = 0; u < s.length; u++) s[u] < 0 && (s[u] = s[u] + 256);
      return s;
    }),
    (this.sm4_crypt_cbc = function (e, n, a) {
      (null != n && 16 === n.length) || alert('iv error!'),
        null == a && alert('input is null!'),
        e.isPadding &&
          e.mode === this.SM4_ENCRYPT &&
          (a = this.padding(a, this.SM4_ENCRYPT));
      var r = 0,
        o = a.length,
        t = new Array();
      if (e.mode === this.SM4_ENCRYPT)
        for (var i = 0; o > 0; o -= 16) {
          var s = new Array(16),
            u = new Array(16),
            c = a.slice(16 * i, 16 * (i + 1));
          for (r = 0; r < 16; r++) s[r] = c[r] ^ n[r];
          this.sm4_one_round(e.sk, s, u),
            (n = u.slice(0, 16)),
            (t = t.concat(u)),
            i++;
        }
      else
        for (var d = [], g = 0; o > 0; o -= 16) {
          var l = new Array(16),
            f = new Array(16),
            _ = a.slice(16 * g, 16 * (g + 1));
          for (
            d = _.slice(0, 16), this.sm4_one_round(e.sk, _, l), r = 0;
            r < 16;
            r++
          )
            f[r] = l[r] ^ n[r];
          (n = d.slice(0, 16)), (t = t.concat(f)), g++;
        }
      var m = t;
      e.isPadding &&
        e.mode === this.SM4_DECRYPT &&
        (m = this.padding(m, this.SM4_DECRYPT));
      for (var p = 0; p < m.length; p++) m[p] < 0 && (m[p] = m[p] + 256);
      return m;
    });
}

function u() {
  (this.secretKey = s('Hw9U8FeJ') + s('8Y2sfMOF')),
    (this.iv = ''),
    (this.encryptData_ECB = function (n) {
      try {
        var a = new i(),
          r = new t();
        (r.isPadding = !0), (r.mode = a.SM4_ENCRYPT);
        var s = e(this.secretKey);
        a.sm4_setkey_enc(r, s);
        var u = a.sm4_crypt_ecb(r, e(n)),
          c = window.base64js.fromByteArray(u);
        return (
          null != c && c.trim().length > 0 && c.replace(/(\s*|\t|\r|\n)/g, ''),
          c
        );
      } catch (d) {
        return console.error(d), null;
      }
    }),
    (this.decryptData_ECB = function (n) {
      try {
        var a = new i(),
          r = new t();
        (r.isPadding = !0), (r.mode = a.SM4_DECRYPT);
        var s = e(this.secretKey);
        a.sm4_setkey_dec(r, s);
        var u = a.sm4_crypt_ecb(r, window.base64js.toByteArray(n));
        return (function (e) {
          for (var n = '', a = 0; a < e.length; ) {
            var r = e[a],
              o = 0;
            r >>> 7 === 0
              ? ((n += String.fromCharCode(e[a])), (a += 1))
              : 252 === (252 & r)
              ? ((o = (3 & e[a]) << 30),
                (o |= (63 & e[a + 1]) << 24),
                (o |= (63 & e[a + 2]) << 18),
                (o |= (63 & e[a + 3]) << 12),
                (o |= (63 & e[a + 4]) << 6),
                (o |= 63 & e[a + 5]),
                (n += String.fromCharCode(o)),
                (a += 6))
              : 248 === (248 & r)
              ? ((o = (7 & e[a]) << 24),
                (o |= (63 & e[a + 1]) << 18),
                (o |= (63 & e[a + 2]) << 12),
                (o |= (63 & e[a + 3]) << 6),
                (o |= 63 & e[a + 4]),
                (n += String.fromCharCode(o)),
                (a += 5))
              : 240 === (240 & r)
              ? ((o = (15 & e[a]) << 18),
                (o |= (63 & e[a + 1]) << 12),
                (o |= (63 & e[a + 2]) << 6),
                (o |= 63 & e[a + 3]),
                (n += String.fromCharCode(o)),
                (a += 4))
              : 224 === (224 & r)
              ? ((o = (31 & e[a]) << 12),
                (o |= (63 & e[a + 1]) << 6),
                (o |= 63 & e[a + 2]),
                (n += String.fromCharCode(o)),
                (a += 3))
              : 192 === (192 & r)
              ? ((o = (63 & e[a]) << 6),
                (o |= 63 & e[a + 1]),
                (n += String.fromCharCode(o)),
                (a += 2))
              : ((n += String.fromCharCode(e[a])), (a += 1));
          }
          return n;
        })(u);
      } catch (c) {
        return console.log(c), console.error(c), null;
      }
    }),
    (this.encryptData_CBC = function (n) {
      try {
        var a = new i(),
          r = new t();
        (r.isPadding = !0), (r.mode = a.SM4_ENCRYPT);
        var s = e(this.secretKey),
          u = e(this.iv);
        a.sm4_setkey_enc(r, s);
        var c = a.sm4_crypt_cbc(r, u, e(n)),
          d = window.base64js.fromByteArray(c);
        return (
          null != d && d.trim().length > 0 && d.replace(/(\s*|\t|\r|\n)/g, ''),
          d
        );
      } catch (g) {
        return console.error(g), null;
      }
    });
  var e = function (e) {
    var n,
      a,
      r = new Array();
    n = e.length;
    for (var o = 0; o < n; o++)
      (a = e.charCodeAt(o)),
        a >= 65536 && a <= 1114111
          ? (r.push(((a >> 18) & 7) | 240),
            r.push(((a >> 12) & 63) | 128),
            r.push(((a >> 6) & 63) | 128),
            r.push((63 & a) | 128))
          : a >= 2048 && a <= 65535
          ? (r.push(((a >> 12) & 15) | 224),
            r.push(((a >> 6) & 63) | 128),
            r.push((63 & a) | 128))
          : a >= 128 && a <= 2047
          ? (r.push(((a >> 6) & 31) | 192), r.push((63 & a) | 128))
          : r.push(255 & a);
    return r;
  };
}

function sm4Encrypt(e: string) {
  var n = new u();
  return n.encryptData_ECB(e);
}

function sm4Decrypt(e) {
  var n = new u();
  return n.decryptData_ECB(e);
}

function getSignAndData(dataOrParams) {
  const str = JSON.stringify(dataOrParams || {});
  const sign = getSign(str);
  const data = sm4Encrypt(str);
  return {
    sign,
    data,
  };
}

class ApiService {
  defaultHeaders = {
    Authorization: localStorage.getItem('accessToken'),
    'tenant-id': '1',
    terminal: '10',
    'X-Timestamp': `${Date.now()}`,
    'User-Agent':
      'mozilla/5.0 (linux; android 5.1.1; mi note pro build/lmy47v) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/37.0.0.0 mobile mqqbrowser/6.2 tbs/036215 safari/537.36 micromessenger/6.3.16.49_r03ae324.780 nettype/wifi language/zh_cn',
  };

  baseUrl = 'http://cgzx.scu.edu.cn';

  constructor() {}

  async get<T>({
    path,
    params,
  }: {
    path: string;
    params?: Record<string, string>;
  }): Promise<T> {
    const _params = params ?? {};

    const { sign, data } = getSignAndData(_params);
    const searchStr = new URLSearchParams({ sign, data }).toString();
    const req = await fetch(`${this.baseUrl}${path}?${searchStr}`, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
      },
    });

    const res = await req.json();
    const resData = res.data;
    const decodeStr = sm4Decrypt(resData);
    const _decodeStr = JSON.parse(decodeStr);
    const _res = JSON.parse(_decodeStr);
    return _res.data;
  }

  async post({
    path,
    data: _data
  }) {
    const { sign, data } = getSignAndData(_data);
    const req = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify({ data, sign }),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      },
    });
    const res = await req.json();
    const resData = res.data;
    const decodeStr = sm4Decrypt(resData);
    const _decodeStr = JSON.parse(decodeStr);
    const _res = JSON.parse(_decodeStr);
    return _res.data;

  }

}

export const apiService = new ApiService();
