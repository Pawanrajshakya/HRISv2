// action: "Rejected by HCU"
// asOfDate: "07/29/22"
// attr_Replace_Reason_desc: "-"
// attritionEin: "0240573"
// candidateEmplNo: "-"
// candidateFirstName: "BEALIAH"
// candidateLastName: "YISRAEL"
// candidateMIName: ""
// comment: null
// commisS_Remark: "-"
// commisS_appr_by: "-"
// commisS_approve: null
// commisS_approve_date: "-"
// commisS_approve_desc: "Rejected by HCU"
// cpD_Submitted_to_Processing: "-"
// cpD_released_to_Candidate: "-"
// cpsStatus: "Open Request"
// currentStatus: "Rejected by HCU"
// dateFlyerPosted: "-"
// dateFlyerRemoved: "-"
// daysatOMB: "7"
// effDate: "-"
// nos: 4
// nycaps: "402308"
// obA_analyst_appr_by: "Celine Duong"
// obA_analyst_approve: "X"
// obA_analyst_approve_date: "11/18/19"
// obA_analyst_approve_desc: "Rejected by HCU"
// obA_analyst_remark: "-"
// omB_Disposition: "a"
// omB_Disposition_desc: "Approved by OMB"
// omB_ShelfDate: "10/28/19"
// omBapproval: "07/30/19"
// ombSubmittedDate: "07/23/19"
// perC_Remark: "-"
// perC_appr_by: "-"
// perC_approve: null
// perC_approve_date: "-"
// perC_approve_desc: "Rejected by HCU"
// poolDate: "-"
// preferredFirstName: "-"
// preferredLastName: ""
// rC_code: "1958"
// rC_po_approve_date: "11/18/19"
// recruitmentStatus: "Candidate Selected"
// reqNumber: "069-20-0889"
// reqType: "TCN"
// reviewDate: "-"
// rowNum: 1
// sA_analyst_appr_by: "Marilynne Gamblin"
// sA_analyst_approve: "R"
// sA_analyst_approve_date: "11/18/19"
// sA_analyst_approve_desc: "Recommended by SA"
// sA_analyst_remark: "Recommend MG"
// scheduleDate: "01/01/00"
// screeningDate: "-"
// shelfOMBDays: -1005
// title: "CASEWORKER"
// titleCode: "5230400  "
// total: 4530
// trans_Desc: "Hire Off List"
// trans_code: "1"
// txtAttdate: "05/02/19"
// txtDPCode: "ESB7"
// txtDisReplace: "MONICA FEASTER                "
// txtFunCTitle: "CASEMANAGER                                                 "
// txtLoc: "1022"


export interface IPARReport {
    total: number,
    rowNum: number,
    reqNumber: string,
    reqType: string,
    rC_code: string,
    rC_po_approve_date: string,
    trans_code: string,
    trans_Desc: string,
    txtDisReplace: string,
    attritionEin: string,
    txtAttdate: string,
    attr_Replace_Reason_desc: string,
    titleCode: string,
    title: string,
    txtFunCTitle: string,
    txtDPCode: string,
    txtLoc: string,
    sA_analyst_approve: string,
    sA_analyst_approve_desc: string,
    sA_analyst_remark: string,
    sA_analyst_appr_by: string,
    sA_analyst_approve_date: string,
    obA_analyst_approve: string,
    obA_analyst_approve_desc: string,
    obA_analyst_remark: string,
    obA_analyst_appr_by: string,
    obA_analyst_approve_date: string,
    perC_approve: string,
    perC_approve_desc: string,
    perC_Remark: string,
    perC_appr_by: string,
    perC_approve_date: string,
    commisS_approve: string,
    commisS_approve_desc: string,
    commisS_Remark: string,
    commisS_appr_by: string,
    commisS_approve_date: string,
    nycaps: string,
    omB_Disposition: string,
    omB_Disposition_desc: string,
    ombSubmittedDate: string,
    omBapproval: string,
    daysatOMB: string,
    shelfOMBDays: number,
    omB_ShelfDate: string,
    cpsStatus: string,
    scheduleDate: string,
    action: string,
    comment: string,
    effDate: string,
    screeningDate: string,
    reviewDate: string,
    poolDate: string,
    candidateFirstName: string,
    candidateMIName: string,
    candidateLastName: string,
    candidateEmplNo: string,
    preferredFirstName: string,
    preferredLastName: string,
    cpD_released_to_Candidate: string,
    cpD_Submitted_to_Processing: string,
    dateFlyerPosted: string,
    dateFlyerRemoved: string,
    asOfDate: string,
    currentStatus: string,
    recruitmentStatus: string,
    nos: number
}


export interface IPARDetail {
    row: number,
    newRow: string,
    reqNumber: string,
    reqType: string,
    rC_Code: string,
    rC_po_appr_by: string,
    rC_po_approve_date: string,
    trans_code: string,
    trans_Desc: string,
    txtDisReplace: string,
    attritionEin: string,
    txtAttdate: string,
    attr_Replace_Reason_desc: string,
    titleCode: string,
    title: string,
    txtFunCTitle: string,
    txtDPCode: string,
    txtLoc: string,
    sA_analyst_approve: string,
    sA_analyst_approve_desc: string,
    sA_analyst_remark: string,
    sA_analyst_appr_by: string,
    sA_analyst_approve_date: string,
    obA_analyst_approve: string,
    obA_analyst_approve_desc: string,
    obA_analyst_remark: string,
    obA_analyst_appr_by: string,
    obA_analyst_approve_date: string,
    perC_approve: string,
    perC_approve_desc: string,
    perC_Remark: string,
    perC_appr_by: string,
    perC_approve_date: string,
    commisS_approve: string,
    commisS_approve_desc: string,
    commisS_Remark: string,
    commisS_appr_by: string,
    commisS_approve_date: string,
    nycaps: string,
    omB_Disposition: string,
    omB_Disposition_desc: string,
    omBapproval: string,
    omB_ShelfDate: string,
    cpsStatus: string,
    scheduleDate: string,
    action: string,
    comment: string,
    effDate: string,
    screeningDate: string,
    reviewDate: string,
    poolDate: string,
    candidateFirstName: string,
    candidateMIName: string,
    candidateLastName: string,
    candidateEmplNo: string,
    cpD_released_to_Candidate: string,
    cpD_Submitted_to_Processing: string,
    dateFlyerPosted: string,
    dateFlyerRemoved: string,
    asOfDate: string,
    currentStatus: string,
    recruitmentStatus: string
}