export interface IHeadcountReport {
  total?: number;
  rowNum?: number;
  divisionUnit?: string;
  rc?: string;
  dp?: string;
  dpName?: string;
  title?: string;
  titleDescription?: string;
  ctlBudgetHc?: number;
  ctlOnBoard?: number;
  ctlHcVacancies?: number;
  ctlBdgBaseSalary?: number;
  ctlTotalBaseSalary?: number;
  ctlVacancySalary?: number;
  ctlNewHireTickets?: number;
  ctlOtNewHireTickets?: number;
  ctlIncrementCost?: number;
  ctlAvail?: number;
  budgetHc?: number;
  staffOnBoard?: number;
  newHireTickets?: number;
  bdgBaseSalary?: number;
  totalBaseSalary?: number;
  vacancySalary?: number;
  otNewHireTickets?: number;
  hcVacancies?: number;
  incrementCost?: number;
  avail?: number;
  totalAvailVacancies?: number;
  totalAvail?: number;
  comments?: string;
}

export interface IHeadCountTitleSummaryReport {
  total?: number;
  rowNum?: number;
  titleCode?: string;
  title?: string;
  rc?: string;
  ctlBudgetHC?: number;
  ctlOnBoardHC?: number;
  ctlhcVacancies?: number;
  ctlNewHireTickets?: number;
  ctlotNewHireTickets?: number;
  ctlAvailHC?: number;
  budgetHC?: number;
  onBoardHC?: number;
  hcVacancies?: number;
  newHireTickets?: number;
  otNewHireTickets?: number;
  availHC?: number;
  totalAvailVacancies?: number;
}

export interface IHeadcountTitleAndBudgetReconciliationSummaryReport {
  total?: number;
  rowNum?: number;
  rc?: string;
  title?: string;
  titleDesc?: string;
  ctlBudgetHc?: number;
  ctlOnBoard?: number;
  ctlHcVacancies?: number;
  ctlBdgBaseSalary?: number;
  ctlOnboardSalary?: number;
  ctlVacancySalary?: number;
  ctlNewHireTickets?: number;
  ctlOtNewHireTickets?: number;
  ctlIncrementCost?: number;
  ctlAvailHc?: number;
  ctlAvail?: number;
  budgetHc?: number;
  staffOnBoard?: number;
  hcVacancies?: number;
  bdgBaseSalary?: number;
  onboardSalary?: number;
  vacancySalary?: number;
  new_HireTickets?: number;
  otNewHireTickets?: number;
  incrementCost?: number;
  availHc?: number;
  avail?: number;
  totalAvailVacancies?: number;
  totalAvail?: number;
}

export interface IHeadcountTitleAndBudgetSummaryReport {
  total?: number;
  rowNum?: number;
  rc?: string;
  title?: string;
  titleDesc?: string;
  ctlBudgetHc?: number;
  ctlOnBoard?: number;
  ctlHcVacancies?: number;
  ctlBdgBaseSalary?: number;
  ctlTotalBaseSalary?: number;
  ctlVacancySalary?: number;
  ctlNewHireTickets?: number;
  ctlOtNewHireTickets?: number;
  ctlIncrementCost?: number;
  ctlAvail?: number;
  budgetHc?: number;
  staffOnBoard?: number;
  hcVacancies?: number;
  bdgBaseSalary?: number;
  totalBaseSalary?: number;
  vacancySalary?: number;
  newHireTickets?: number;
  otNewHireTickets?: number;
  incrementCost?: number;
  avail?: number;
  totalAvailVacancies?: number;
  totalAvail?: number;
  totalBudgetHc?: number;
  totalOnboardHc?: number;
  totalBdgBaseSalary?: number;
  totalOnboardSalary?: number;
  totalVacancySalary?: number;
}

export interface IHeadcountPMSEmployeeDetailReport {
  total?: number;
  rowNum?: number;
  agency?: string;
  lName?: string;
  fName?: string;
  ein?: string;
  rc?: string;
  muCode?: string;
  disbCode?: string;
  dpCode?: string;
  dpName?: string;
  location?: string;
  titleNumber?: string;
  titleDesc?: string;
  backupTitle?: string;
  backupTitleName?: string;
  cityDate?: string;
  agencyDate?: string;
  titleDate?: string;
  civilServiceDate?: string;
  cSStatus?: string;
  budCode?: string;
  budLine?: string;
  salary?: number;
  addComps?: number;
  totalSalary?: number;
  perDime?: number;
  percent?: number;
  ctl?: number;
  lvStatus?: string;
}
