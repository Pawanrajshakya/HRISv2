using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{

    public class HeadcountReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string DivisionUnit { get; set; }
        public string RC { get; set; }
        public string DP { get; set; }
        public string DPName { get; set; }
        public string Title { get; set; }
        public string TitleDescription { get; set; }
        public int CTLBudgetHc { get; set; }
        public int CTLOnBoard { get; set; }
        public int CTLHcVacancies { get; set; }
        public decimal CTLBdgBaseSalary { get; set; }
        public decimal CTLTotalBaseSalary { get; set; }
        public decimal CTLVacancySalary { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOtNewHireTickets { get; set; }
        public int CTLIncrementCost { get; set; }
        public decimal CTLAvail { get; set; }
        public int BudgetHc { get; set; }
        public int StaffOnBoard { get; set; }
        public int NewHireTickets { get; set; }
        public decimal BdgBaseSalary { get; set; }
        public decimal TotalBaseSalary { get; set; }
        public decimal VacancySalary { get; set; }
        public int OtNewHireTickets { get; set; }
        public int HcVacancies { get; set; }
        public int IncrementCost { get; set; }
        public decimal Avail { get; set; }
        public int TotalAvailVacancies { get; set; }
        public decimal TotalAvail { get; set; }
        public string Comments { get; set; }
    }

    public class HeadcountReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string DivisionUnit { get; set; }
        public string RC { get; set; }
        public string DP { get; set; }
        public string DPName { get; set; }
        public string Title { get; set; }
        public string TitleDescription { get; set; }
        public int CTLBudgetHc { get; set; }
        public int CTLOnBoard { get; set; }
        public int CTLHcVacancies { get; set; }
        public decimal CTLBdgBaseSalary { get; set; }
        public decimal CTLTotalBaseSalary { get; set; }
        public decimal CTLVacancySalary { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOtNewHireTickets { get; set; }
        public int CTLIncrementCost { get; set; }
        public decimal CTLAvail { get; set; }
        public int BudgetHc { get; set; }
        public int StaffOnBoard { get; set; }
        public int NewHireTickets { get; set; }
        public decimal BdgBaseSalary { get; set; }
        public decimal TotalBaseSalary { get; set; }
        public decimal VacancySalary { get; set; }
        public int OtNewHireTickets { get; set; }
        public int HcVacancies { get; set; }
        public int IncrementCost { get; set; }
        public decimal Avail { get; set; }
        public int TotalAvailVacancies { get; set; }
        public decimal TotalAvail { get; set; }
        public string Comments { get; set; }
    }

    public class HeadCountTitleSummaryReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string TitleCode { get; set; }
        public string Title { get; set; }
        public string RC { get; set; }
        public int CTLBudgetHC { get; set; }
        public int CTLOnBoardHC { get; set; }
        public int CTLHCVacancies { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOTNewHireTickets { get; set; }
        public int CTLAvailHC { get; set; }
        public int BudgetHC { get; set; }
        public int OnBoardHC { get; set; }
        public int HCVacancies { get; set; }
        public int NewHireTickets { get; set; }
        public int OTNewHireTickets { get; set; }
        public int AvailHC { get; set; }
        public int TotalAvailVacancies { get; set; }
    }
    public class HeadcountTitleSummaryReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string TitleCode { get; set; }
        public string Title { get; set; }
        public string RC { get; set; }
        public int CTLBudgetHC { get; set; }
        public int CTLOnBoardHC { get; set; }
        public int CTLHCVacancies { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOTNewHireTickets { get; set; }
        public int CTLAvailHC { get; set; }
        public int BudgetHC { get; set; }
        public int OnBoardHC { get; set; }
        public int HCVacancies { get; set; }
        public int NewHireTickets { get; set; }
        public int OTNewHireTickets { get; set; }
        public int AvailHC { get; set; }
        public int TotalAvailVacancies { get; set; }
    }

    public class HeadcountTitleAndBudgetReconciliationSummaryReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string Title { get; set; }
        public string TitleDesc { get; set; }
        public int CTLBudgetHc { get; set; }
        public int CTLOnBoard { get; set; }
        public int CTLHcVacancies { get; set; }
        public decimal CTLBdgBaseSalary { get; set; }
        public decimal CTLOnboardSalary { get; set; }
        public decimal CTLVacancySalary { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOtNewHireTickets { get; set; }
        public decimal CTLIncrementCost { get; set; }
        public int CTLAvailHc { get; set; }
        public decimal CTLAvail { get; set; }
        public int BudgetHc { get; set; }
        public int StaffOnBoard { get; set; }
        public int HcVacancies { get; set; }
        public decimal BdgBaseSalary { get; set; }
        public decimal OnboardSalary { get; set; }
        public decimal VacancySalary { get; set; }
        public int NewHireTickets { get; set; }
        public int OtNewHireTickets { get; set; }
        public decimal IncrementCost { get; set; }
        public int AvailHc { get; set; }
        public decimal Avail { get; set; }
        public int TotalAvailVacancies { get; set; }
        public int TotalAvail { get; set; }
    }

    public class HeadcountTitleAndBudgetReconciliationSummaryReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string Title { get; set; }
        public string TitleDesc { get; set; }
        public int CTLBudgetHc { get; set; }
        public int CTLOnBoard { get; set; }
        public int CTLHcVacancies { get; set; }
        public decimal CTLBdgBaseSalary { get; set; }
        public decimal CTLOnboardSalary { get; set; }
        public decimal CTLVacancySalary { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOtNewHireTickets { get; set; }
        public decimal CTLIncrementCost { get; set; }
        public int CTLAvailHc { get; set; }
        public decimal CTLAvail { get; set; }
        public int BudgetHc { get; set; }
        public int StaffOnBoard { get; set; }
        public int HcVacancies { get; set; }
        public decimal BdgBaseSalary { get; set; }
        public decimal OnboardSalary { get; set; }
        public decimal VacancySalary { get; set; }
        public int NewHireTickets { get; set; }
        public int OtNewHireTickets { get; set; }
        public decimal IncrementCost { get; set; }
        public int AvailHc { get; set; }
        public decimal Avail { get; set; }
        public int TotalAvailVacancies { get; set; }
        public int TotalAvail { get; set; }
    }

    public class HeadcountTitleAndBudgetSummaryReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string Title { get; set; }
        public string TitleDesc { get; set; }
        public int CTLBudgetHc { get; set; }
        public int CTLOnBoard { get; set; }
        public int CTLHcVacancies { get; set; }
        public decimal CTLBdgBaseSalary { get; set; }
        public decimal CTLTotalBaseSalary { get; set; }
        public decimal CTLVacancySalary { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOtNewHireTickets { get; set; }
        public decimal CTLIncrementCost { get; set; }
        public decimal CTLAvail { get; set; }
        public int BudgetHc { get; set; }
        public int StaffOnBoard { get; set; }
        public int HcVacancies { get; set; }
        public decimal BdgBaseSalary { get; set; }
        public decimal TotalBaseSalary { get; set; }
        public decimal VacancySalary { get; set; }
        public int NewHireTickets { get; set; }
        public int OtNewHireTickets { get; set; }
        public decimal IncrementCost { get; set; }
        public decimal Avail { get; set; }
        public int TotalAvailVacancies { get; set; }
        public int TotalAvail { get; set; }
        public int TotalBudgetHc { get; set; }
        public int TotalOnboardHc { get; set; }
        public decimal TotalBdgBaseSalary { get; set; }
        public decimal TotalOnboardSalary { get; set; }
        public decimal TotalVacancySalary { get; set; }
    }

    public class HeadcountTitleAndBudgetSummaryReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string Title { get; set; }
        public string TitleDesc { get; set; }
        public int CTLBudgetHc { get; set; }
        public int CTLOnBoard { get; set; }
        public int CTLHcVacancies { get; set; }
        public decimal CTLBdgBaseSalary { get; set; }
        public decimal CTLTotalBaseSalary { get; set; }
        public decimal CTLVacancySalary { get; set; }
        public int CTLNewHireTickets { get; set; }
        public int CTLOtNewHireTickets { get; set; }
        public decimal CTLIncrementCost { get; set; }
        public decimal CTLAvail { get; set; }
        public int BudgetHc { get; set; }
        public int StaffOnBoard { get; set; }
        public int HcVacancies { get; set; }
        public decimal BdgBaseSalary { get; set; }
        public decimal TotalBaseSalary { get; set; }
        public decimal VacancySalary { get; set; }
        public int NewHireTickets { get; set; }
        public int OtNewHireTickets { get; set; }
        public decimal IncrementCost { get; set; }
        public decimal Avail { get; set; }
        public int TotalAvailVacancies { get; set; }
        public int TotalAvail { get; set; }
        public int TotalBudgetHc { get; set; }
        public int TotalOnboardHc { get; set; }
        public decimal TotalBdgBaseSalary { get; set; }
        public decimal TotalOnboardSalary { get; set; }
        public decimal TotalVacancySalary { get; set; }
    }

    public class HeadcountPMSEmployeeDetailReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string Agency { get; set; }
        public string LName { get; set; }
        public string FName { get; set; }
        public string Ein { get; set; }
        public string RC { get; set; }
        public string MUCode { get; set; }
        public string DisbCode { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string Location { get; set; }
        public string TitleNumber { get; set; }
        public string TitleDesc { get; set; }
        public string BackupTitle { get; set; }
        public string BackupTitleName { get; set; }
        public string CityDate { get; set; }
        public string AgencyDate { get; set; }
        public string TitleDate { get; set; }
        public string CivilServiceDate { get; set; }
        public string CSStatus { get; set; }
        public string BudCode { get; set; }
        public string BudLine { get; set; }
        public double Salary { get; set; }
        public decimal AddComps { get; set; }
        public double TotalSalary { get; set; }
        public int PerDime { get; set; }
        public int Percent { get; set; }
        public int Ctl { get; set; }
        public string LVStatus { get; set; }
    }

    public class HeadcountPMSEmployeeDetailReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string Agency { get; set; }
        public string LName { get; set; }
        public string FName { get; set; }
        public string Ein { get; set; }
        public string RC { get; set; }
        public string MUCode { get; set; }
        public string DisbCode { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string Location { get; set; }
        public string TitleNumber { get; set; }
        public string TitleDesc { get; set; }
        public string BackupTitle { get; set; }
        public string BackupTitleName { get; set; }
        public string CityDate { get; set; }
        public string AgencyDate { get; set; }
        public string TitleDate { get; set; }
        public string CivilServiceDate { get; set; }
        public string CSStatus { get; set; }
        public string BudCode { get; set; }
        public string BudLine { get; set; }
        public float Salary { get; set; }
        public decimal AddComps { get; set; }
        public float TotalSalary { get; set; }
        public int PerDime { get; set; }
        public int Percent { get; set; }
        public int Ctl { get; set; }
        public string LVStatus { get; set; }
    }
}