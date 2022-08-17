export interface IECardChart {
  labels?: string;
  data: number;
  date?: string;
}

export interface IECardSendAndReceivedReport {
  total?: number;
  rowNum?: number;
  rc?: string;
  rcName?: string;
  numberOfCards?: number;
}

export interface IECardByRelationshipReport {
  total?: number;
  rowNum?: number;
  senderEIN?: string;
  receiverEIN?: string;
  sendersLName?: string;
  sendersFName?: string;
  receiversFName?: string;
  receiversLName?: string;
  senderRC?: string;
  receiverRC?: string;
  relationship?: string;
  numberOfCards?: number;
}

export interface IECardByExcellenceReport {
  total?: number;
  rowNum?: number;
  fName?: string;
  lName?: string;
  id?: string;
  rc?: string;
  rcName?: string;
  service?: number;
  respect?: number;
  transparency?: number;
  accountability?: number;
  cardCount?: number;
}
