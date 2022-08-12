export interface IRc {
  code?: string;
  description?: string;
}

export interface IDp {
  dpCode?: string;
  dpName?: string;
  rcCode?: string;
}

export interface IDpGroup {
  rcCode?: string;
  dpCodes?: IDp[];
}

export interface IRcDp {
  RC?: IRc[];
  DP?: IDp[];
  IDpGroup?: IDpGroup[];
}
