export interface RawCoinValue {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
  price_change_percentage_14d_in_currency: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_1y_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_30d_in_currency: number
  price_change_percentage_7d_in_currency: number
  asset_platform_id: any
  platforms: Platforms
  detail_platforms: DetailPlatforms
  block_time_in_minutes: number
  hashing_algorithm: string
  categories: string[]
  public_notice: any
  additional_notices: any[]
  description: Description
  links: Links
  image: string;
  country_origin: string
  genesis_date: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  watchlist_portfolio_users: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  community_data: CommunityData
  public_interest_stats: PublicInterestStats
  status_updates: any[]
}


export interface Platforms {
  "": string
}

export interface DetailPlatforms {
  "": GeneratedType
}

export interface GeneratedType {
  decimal_place: any
  contract_address: string
}

export interface Description {
  en: string
}

export interface Links {
  homepage: string[]
  blockchain_site: string[]
  official_forum_url: string[]
  chat_url: string[]
  announcement_url: string[]
  twitter_screen_name: string
  facebook_username: string
  bitcointalk_thread_identifier: any
  telegram_channel_identifier: string
  subreddit_url: string
  repos_url: ReposUrl
}

export interface ReposUrl {
  github: string[]
  bitbucket: any[]
}

export interface Image {
  thumb: string
  small: string
  large: string
}

export interface CommunityData {
  facebook_likes: any
  twitter_followers: number
  reddit_average_posts_48h: number
  reddit_average_comments_48h: number
  reddit_subscribers: number
  reddit_accounts_active_48h: number
  telegram_channel_user_count: any
}

export interface PublicInterestStats {
  alexa_rank: number
  bing_matches: any
}


export interface RawRates {
  btc: RawRateItem,
  eth: RawRateItem,
  ltc: RawRateItem,
  bch: RawRateItem,
  bnb: RawRateItem,
  eos: RawRateItem,
  xrp: RawRateItem,
  xlm: RawRateItem,
  link: RawRateItem,
  dot: RawRateItem,
  yfi: RawRateItem,
  usd: RawRateItem,
  aed: RawRateItem,
  ars: RawRateItem,
  aud: RawRateItem,
  bdt: RawRateItem,
  bhd: RawRateItem,
  bmd: RawRateItem,
  brl: RawRateItem,
  cad: RawRateItem,
  chf: RawRateItem,
  clp: RawRateItem,
  cny: RawRateItem,
  czk: RawRateItem,
  dkk: RawRateItem,
  eur: RawRateItem,
  gbp: RawRateItem,
  hkd: RawRateItem,
  huf: RawRateItem,
  idr: RawRateItem,
  ils: RawRateItem,
  inr: RawRateItem,
  jpy: RawRateItem,
  krw: RawRateItem,
  kwd: RawRateItem,
  lkr: RawRateItem,
  mmk: RawRateItem,
  mxn: RawRateItem,
  myr: RawRateItem,
  ngn: RawRateItem,
  nok: RawRateItem,
  nzd: RawRateItem,
  php: RawRateItem,
  pkr: RawRateItem,
  pln: RawRateItem,
  rub: RawRateItem,
  sar: RawRateItem,
  sek: RawRateItem,
  sgd: RawRateItem,
  thb: RawRateItem,
  try: RawRateItem,
  twd: RawRateItem,
  uah: RawRateItem,
  vef: RawRateItem,
  vnd: RawRateItem,
  zar: RawRateItem,
  xdr: RawRateItem,
  xag: RawRateItem,
  xau: RawRateItem,
  bits: RawRateItem,
  sats: RawRateItem,
}
export interface RawRateItem {
  name: string
  unit: string
  value: number
  type: string
}
export const defaultRawRates: RawRates =
{
  btc: {
  name: "Bitcoin",
    unit: "BTC",
    value: 1,
    type: "crypto"
},
  eth: {
  name: "Ether",
    unit: "ETH",
    value: 14.857,
    type: "crypto"
},
  ltc: {
  name: "Litecoin",
    unit: "LTC",
    value: 315.602,
    type: "crypto"
},
  bch: {
  name: "Bitcoin Cash",
    unit: "BCH",
    value: 228.404,
    type: "crypto"
},
  bnb: {
  name: "Binance Coin",
    unit: "BNB",
    value: 83.213,
    type: "crypto"
},
  eos: {
  name: "EOS",
    unit: "EOS",
    value: 26141.607,
    type: "crypto"
},
  xrp: {
  name: "XRP",
    unit: "XRP",
    value: 59585.29,
    type: "crypto"
},
  xlm: {
  name: "Lumens",
    unit: "XLM",
    value: 291955.882,
    type: "crypto"
},
  link: {
  name: "Chainlink",
    unit: "LINK",
    value: 3860.157,
    type: "crypto"
},
  dot: {
  name: "Polkadot",
    unit: "DOT",
    value: 4637.289,
    type: "crypto"
},
  yfi: {
  name: "Yearn.finance",
    unit: "YFI",
    value: 3.358,
    type: "crypto"
},
  usd: {
  name: "US Dollar",
    unit: "$",
    value: 27328.566,
    type: "fiat"
},
  aed: {
  name: "United Arab Emirates Dirham",
    unit: "DH",
    value: 100353.64,
    type: "fiat"
},
  ars: {
  name: "Argentine Peso",
    unit: "$",
    value: 5971674.447,
    type: "fiat"
},
  aud: {
  name: "Australian Dollar",
    unit: "A$",
    value: 40896.462,
    type: "fiat"
},
  bdt: {
  name: "Bangladeshi Taka",
    unit: "৳",
    value: 2899608.872,
    type: "fiat"
},
  bhd: {
  name: "Bahraini Dinar",
    unit: "BD",
    value: 10303.662,
    type: "fiat"
},
  bmd: {
  name: "Bermudian Dollar",
    unit: "$",
    value: 27328.566,
    type: "fiat"
},
  brl: {
  name: "Brazil Real",
    unit: "R$",
    value: 137987.399,
    type: "fiat"
},
  cad: {
  name: "Canadian Dollar",
    unit: "CA$",
    value: 37006.705,
    type: "fiat"
},
  chf: {
  name: "Swiss Franc",
    unit: "Fr.",
    value: 24347.129,
    type: "fiat"
},
  clp: {
  name: "Chilean Peso",
    unit: "CLP$",
    value: 21862853.445,
    type: "fiat"
},
  cny: {
  name: "Chinese Yuan",
    unit: "¥",
    value: 188506.988,
    type: "fiat"
},
  czk: {
  name: "Czech Koruna",
    unit: "Kč",
  value: 582752.554,
    type: "fiat"
},
  dkk: {
  name: "Danish Krone",
    unit: "kr.",
    value: 185300.746,
    type: "fiat"
},
  eur: {
  name: "Euro",
    unit: "€",
    value: 24866.645,
    type: "fiat"
},
  gbp: {
  name: "British Pound Sterling",
    unit: "£",
    value: 21979.218,
    type: "fiat"
},
  hkd: {
  name: "Hong Kong Dollar",
    unit: "HK$",
    value: 214494.132,
    type: "fiat"
},
  huf: {
  name: "Hungarian Forint",
    unit: "Ft",
    value: 9369052.558,
    type: "fiat"
},
  idr: {
  name: "Indonesian Rupiah",
    unit: "Rp",
    value: 408861321.563,
    type: "fiat"
},
  ils: {
  name: "Israeli New Shekel",
    unit: "₪",
    value: 99876.756,
    type: "fiat"
},
  inr: {
  name: "Indian Rupee",
    unit: "₹",
  value: 2240078.731,
    type: "fiat"
},
  jpy: {
  name: "Japanese Yen",
    unit: "¥",
    value: 3672194.178,
    type: "fiat"
},
  krw: {
  name: "South Korean Won",
    unit: "₩",
    value: 36474075.432,
    type: "fiat"
},
  kwd: {
  name: "Kuwaiti Dinar",
    unit: "KD",
    value: 8372.926,
    type: "fiat"
},
  lkr: {
  name: "Sri Lankan Rupee",
    unit: "Rs",
    value: 8804471.833,
    type: "fiat"
},
  mmk: {
  name: "Burmese Kyat",
    unit: "K",
    value: 57240789.245,
    type: "fiat"
},
  mxn: {
  name: "Mexican Peso",
    unit: "MX$",
    value: 492916.341,
    type: "fiat"
},
  myr: {
  name: "Malaysian Ringgit",
    unit: "RM",
    value: 121270.515,
    type: "fiat"
},
  ngn: {
  name: "Nigerian Naira",
    unit: "₦",
    value: 12585624.871,
    type: "fiat"
},
  nok: {
  name: "Norwegian Krone",
    unit: "kr",
    value: 289608.228,
    type: "fiat"
},
  nzd: {
  name: "New Zealand Dollar",
    unit: "NZ$",
    value: 44497.902,
    type: "fiat"
},
  php: {
  name: "Philippine Peso",
    unit: "₱",
    value: 1524073.15,
    type: "fiat"
},
  pkr: {
  name: "Pakistani Rupee",
    unit: "₨",
    value: 7727669.894,
    type: "fiat"
},
  pln: {
  name: "Polish Zloty",
    unit: "zł",
    value: 114635.767,
    type: "fiat"
},
  rub: {
  name: "Russian Ruble",
    unit: "₽",
    value: 2222085.548,
    type: "fiat"
},
  sar: {
  name: "Saudi Riyal",
    unit: "SR",
    value: 102542.33,
    type: "fiat"
},
  sek: {
  name: "Swedish Krona",
    unit: "kr",
    value: 281719.701,
    type: "fiat"
},
  sgd: {
  name: "Singapore Dollar",
    unit: "S$",
    value: 36491.042,
    type: "fiat"
},
  thb: {
  name: "Thai Baht",
    unit: "฿",
    value: 940854.261,
    type: "fiat"
},
  try: {
  name: "Turkish Lira",
    unit: "₺",
    value: 530450.241,
    type: "fiat"
},
  twd: {
  name: "New Taiwan Dollar",
    unit: "NT$",
    value: 837442.909,
    type: "fiat"
},
  uah: {
  name: "Ukrainian hryvnia",
    unit: "₴",
    value: 1006668.746,
    type: "fiat"
},
  vef: {
  name: "Venezuelan bolívar fuerte",
    unit: "Bs.F",
    value: 2736.409,
    type: "fiat"
},
  vnd: {
  name: "Vietnamese đồng",
    unit: "₫",
    value: 641741697.702,
    type: "fiat"
},
  zar: {
  name: "South African Rand",
    unit: "R",
    value: 496066.696,
    type: "fiat"
},
  xdr: {
  name: "IMF Special Drawing Rights",
    unit: "XDR",
    value: 20212.727,
    type: "fiat"
},
  xag: {
  name: "Silver - Troy Ounce",
    unit: "XAG",
    value: 1093.777,
    type: "commodity"
},
  xau: {
  name: "Gold - Troy Ounce",
    unit: "XAU",
    value: 13.785,
    type: "commodity"
},
  bits: {
  name: "Bits",
    unit: "μBTC",
    value: 1000000,
    type: "crypto"
},
  sats: {
  name: "Satoshi",
    unit: "sats",
    value: 100000000,
    type: "crypto"
}
}

