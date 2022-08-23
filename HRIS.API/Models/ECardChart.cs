using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class ECardChart
    {
        [Key]
        public string Created { get; set; }
        public int Data { get; set; }
        public DateTime Date { get; set; }
    }

    public class ECardChartDto
    {
        public string Labels { get; set; }
        public int Data { get; set; }
        //public string Date { get; set; }
    }

    //HRIS_ECards_ByRC
    public class ECardSendAndReceivedReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public int NumberOfCards { get; set; }
    }

    public class ECardSendAndReceivedReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public int NumberOfCards { get; set; }
    }
    //HRIS_ECards_ByRelationshipOfSender
    public class ECardByRelationshipReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string SenderEIN { get; set; }
        public string ReceiverEIN { get; set; }
        public string SendersLName { get; set; }
        public string SendersFName { get; set; }
        public string ReceiversFName { get; set; }
        public string ReceiversLName { get; set; }
        public string SenderRC { get; set; }
        public string ReceiverRC { get; set; }
        public string Relationship { get; set; }
        public int NumberOfCards { get; set; }
    }

    public class ECardByRelationshipReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string SenderEIN { get; set; }
        public string ReceiverEIN { get; set; }
        public string SendersLName { get; set; }
        public string SendersFName { get; set; }
        public string ReceiversFName { get; set; }
        public string ReceiversLName { get; set; }
        public string SenderRC { get; set; }
        public string ReceiverRC { get; set; }
        public string Relationship { get; set; }
        public int NumberOfCards { get; set; }
    }
    //HRIS_ECards_ByExcellenceProgram
    public class ECardByExcellenceReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string ID { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public int Service { get; set; }
        public int Respect { get; set; }
        public int Transparency { get; set; }
        public int Accountability { get; set; }
        public int CardCount { get; set; }
    }
    public class ECardByExcellenceReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string ID { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public int Service { get; set; }
        public int Respect { get; set; }
        public int Transparency { get; set; }
        public int Accountability { get; set; }
        public int CardCount { get; set; }
    }
}
