export const COVERAGERULE = {
  "COVERAGE_GROUP": {
    "COVRGROUP_ESCC_ESCCP_ALTER_SYARIAH": {
      "code": "COVRGROUP_ESCC_ESCCP_ALTER_SYARIAH",
      "COVERAGE": [
        "C108",
        "C1YR"
      ],
      "description": "Coverage Group ESCC & ESCC Plus Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage crisis cover sharia cannot be taken with PRUearly stage crisis cover plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESCC_ESCCP_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage crisis cover syariah tidak dapat diambil bersamaan dengan PRUearly stage crisis cover plus syariah",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "IAN COV GROUP": {
      "code": "IAN COV GROUP",
      "COVERAGE": [
        "H1VR"
      ],
      "description": "IAN COV GROUP tester",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "HIDE",
          "errorMessageEng": "-",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "IAN COV GROUP",
          "type": "Fix Value",
          "sequence": "2",
          "mainCoverage": "L1DR",
          "ruleCd": "MINCVT_PRUMEDIKA",
          "ruleShowType": "TERM",
          "errorMessageInd": "-",
          "negateNextRule": false,
          "category": "New Business",
          "value": "1000"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "SPOUSEWAIVER33_OLDWOP": {
      "code": "SPOUSEWAIVER33_OLDWOP",
      "COVERAGE": [
        "S101",
        "S111",
        "S1BR",
        "W103",
        "W1IR",
        "W1RR",
        "S1FR"
      ],
      "description": "PRUspouse waiver 33 with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse waiver 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "SPOUSEWAIVER33_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U10R, U1BR, U1ZR",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse waiver 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_PRO": {
      "code": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_PRO",
      "COVERAGE": [
        "C103",
        "C106",
        "C12R",
        "C143",
        "C14R",
        "C1WR",
        "D1DR",
        "H1TR",
        "H1VR",
        "H1X1",
        "H1X3",
        "H1X5",
        "H1Z3",
        "P1DR",
        "P1RD",
        "P1RR",
        "S1FR",
        "S1KR",
        "S1YD",
        "S1YR",
        "T1JD",
        "T1JR",
        "W1MR",
        "W1QR",
        "W1XD",
        "W1XR",
        "W3AD",
        "W3AR",
        "W3BD",
        "W3BR",
        "H1H3"
      ],
      "description": "Coverage Group Campaign Conversion PPH Plus Pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Only allowed to add PPH Plus Plan Pro",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_PRO",
          "type": "Fix Value",
          "sequence": "20",
          "mainCoverage": "U10R",
          "ruleCd": "CAMPAIGN29",
          "ruleShowType": null,
          "errorMessageInd": "Hanya diperbolehkan menambah Plan PPH Plus Pro",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PPAYOR_ALTER_SYARIAH": {
      "code": "COVRGROUP_PPAYOR_ALTER_SYARIAH",
      "COVERAGE": [
        "W109",
        "W111"
      ],
      "description": "Coverage Group Parent Payor & Payor Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor syariah 33 tidak dapat diambil bersamaan dengan PRUparent payor syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPAYOR_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U11R, U1SR, U1HR, U4GR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpayor syariah 33 tidak dapat diambil bersamaan dengan PRUparent payor syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PPWAIVER_ALTER": {
      "code": "COVRGROUP_PPWAIVER_ALTER",
      "COVERAGE": [
        "W1MR",
        "W1WR",
        "W1XR",
        "W2MR",
        "W1WD",
        "W1XD"
      ],
      "description": "Coverage Group Parent Payor & Waiver",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUwaiver 33 tidak dapat diambil bersamaan dengan PRUparent payor 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPWAIVER_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U10R, U1ZR, U1BR, U201, U20R, U2V1, U2V2, U1ZD",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUwaiver 33 tidak dapat diambil bersamaan dengan PRUparent payor 33.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE": {
      "code": "COVRGROUP_HEALTHCARE",
      "COVERAGE": [
        "H1TR",
        "H1X1",
        "H1X3",
        "H1X5",
        "H2TR"
      ],
      "description": "Coverage Group Hospital & Prime health care",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare cannot be taken with PRUhospital & surgical cover plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1BR, U1ZR, U1ZR-HEBAT, U2KR, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUprime healthcare tidak dapat diambil bersamaan dengan PRUhospital & surgical cover plus",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "ADDCC": {
      "code": "ADDCC",
      "COVERAGE": [
        "C1TR",
        "C1UR",
        "I1DR",
        "I1ER",
        "C1TD"
      ],
      "description": "Coverage Group Additional CC",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "WARNING",
          "errorMessageEng": "Total additional crisis cover sum assured is morethan 3 times total death sum assured, will require for additional medical by underwriter and will process as Facultative",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "ADDCC",
          "type": "Fix Value",
          "sequence": "12",
          "mainCoverage": "U4GR, U23R, U1ZD",
          "ruleCd": "MAXADCC03_USD",
          "ruleShowType": null,
          "errorMessageInd": "Total manfaat Kondisi Kritis Tambahan melebihi 3 kali uang pertanggungan manfaat meninggal, akan dimintakan pemeriksaan kesehatan tambahan dari underwriter dan akan diproses sebagai Facultative",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "WARNING",
          "errorMessageEng": "Total additional crisis cover sum assured is morethan 3 times total death sum assured, will require for additional medical by underwriter and will process as Facultative",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "ADDCC",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U2KR, U11R, U1HR, U1SR, U1SR-HEBAT, U10R, U1BR, U1ZR, U1ZR-HEBAT, U15R, U16R",
          "ruleCd": "MAXADCC03",
          "ruleShowType": null,
          "errorMessageInd": "Total manfaat Kondisi Kritis Tambahan melebihi 3 kali Santunan Asuransi manfaat meninggal, akan dimintakan pemeriksaan kesehatan tambahan dari underwriter dan akan diproses sebagai Facultative",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "WARNING",
          "errorMessageEng": "Total additional crisis cover sum assured is morethan 3 times total death sum assured, will require for additional medical by underwriter and will process as Facultative",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "ADDCC",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U4GR, U23R, U2V1, U2V2, U202, U201, U10R, U1BR, U1ZR-HEBAT, U1ZR, U15R",
          "ruleCd": "MAXADCC01",
          "ruleShowType": null,
          "errorMessageInd": "Total manfaat Kondisi Kritis Tambahan melebihi 3 kali santunan asuransi manfaat meninggal, akan dimintakan pemeriksaan kesehatan tambahan dari underwriter dan akan diproses sebagai Facultative",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE14_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE14_CERMAT",
      "COVERAGE": [
        "H161",
        "H1H3"
      ],
      "description": "Coverage Group Pru Well Healthcare & Pru Prime healthcare plus pro (cermat)",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PruWell Health cannot be taken with PRUPrime Healthcare Plus Pro (Cermat)",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE14_CERMAT",
          "type": "Fix Value",
          "sequence": "9",
          "mainCoverage": "U12R, U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PruWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro (Cermat)",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE11_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE11_CERMAT",
      "COVERAGE": [
        "H1G1",
        "H1GR",
        "H1MR",
        "H1QR",
        "H1H3"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus pro cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare Plus Pro Cermat cannot be taken with other HS",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE11_CERMAT",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U10R, U1BR, U1ZR, U201",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Plus Pro (Plan Cermat) tidak dapat diambil bersamaan dengan HS lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE13_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE13_CERMAT",
      "COVERAGE": [
        "H1X1",
        "H1X3",
        "H1X5",
        "H1H3"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus pro CERMAT",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare cannot be taken with PRUPrime Healthcare Plus Pro",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE13_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro (Plan Cermat)",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CCCC34": {
      "code": "COVRGROUP_CCCC34",
      "COVERAGE": [
        "C1HR",
        "C1MR",
        "C1GR",
        "C1PR",
        "C1KR"
      ],
      "description": "Coverage Group crisis cover and crisis cover 34",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUcrisis cover tidak bisa diambil bersamaan dengan PRUcrisis cover lainnya.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CCCC34",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1SR, U1ZR, U1BR, U1HR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUcrisis cover syariah tidak bisa diambil bersamaan dengan PRUcrisis cover syariah lainnya.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE02": {
      "code": "COVRGROUP_HEALTHCARE02",
      "COVERAGE": [
        "H1G1",
        "H1GR",
        "H1MR",
        "H1QR",
        "H1TR",
        "H2TR"
      ],
      "description": "Coverage Group Hospital & Other HSC",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUhospital & surgical cover plus tidak dapat diambil bersamaan dengan HS lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE02",
          "type": "Fix Value",
          "sequence": "12",
          "mainCoverage": "U1BR, U1ZR, U201",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUhospital & surgical cover plus tidak dapat diambil bersamaan dengan HS lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PPWAIVER_ALTER_SYARIAH": {
      "code": "COVRGROUP_PPWAIVER_ALTER_SYARIAH",
      "COVERAGE": [
        "W107",
        "W111"
      ],
      "description": "Coverage Group Parent Payor & Waiver Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUwaiver syariah 33 tidak dapat diambil bersamaan dengan PRUparent payor syariah 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPWAIVER_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U11R, U1SR, U1HR, U4GR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUwaiver syariah 33 tidak dapat diambil bersamaan dengan PRUparent payor syariah 33.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE05": {
      "code": "COVRGROUP_HEALTHCARE05",
      "COVERAGE": [
        "H1G1",
        "H1GR",
        "H1MR",
        "H1QR",
        "H1Z1",
        "H2TR"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cannot be taken with other HS",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE05",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U2V1, U2T1, U201, U10R, U251",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus tidak dapat diambil bersamaan dengan HS lainnya",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cannot be taken with other HS",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE05",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U10R, U1BR, U1ZR, U201",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus tidak dapat diambil bersamaan dengan HS lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE04": {
      "code": "COVRGROUP_HEALTHCARE04",
      "COVERAGE": [
        "H1TR",
        "H1Z1"
      ],
      "description": "Coverage Group Hospital cover plus & Prime health care plus",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus cannot be taken with PRUhospital & surgical cover plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE04",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus tidak dapat diambil bersamaan dengan PRUhospital & surgical cover plus",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE03": {
      "code": "COVRGROUP_HEALTHCARE03",
      "COVERAGE": [
        "H1X1",
        "H1X3",
        "H1X5",
        "H1Z1"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare cannot be taken with PRUprime healthcare plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE03",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare tidak dapat diambil bersamaan dengan PRUprime healthcare plus",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE09": {
      "code": "COVRGROUP_HEALTHCARE09",
      "COVERAGE": [
        "H1Z3",
        "H1H1"
      ],
      "description": "Coverage Group Prime healthcare plus cermat & Prime healthcare plus pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cannot be taken with PRUprime healthcare plus cermat.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE09",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE08": {
      "code": "COVRGROUP_HEALTHCARE08",
      "COVERAGE": [
        "H1Z1",
        "H1H1"
      ],
      "description": "Coverage Group Prime healthcare plus & Prime healthcare plus pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cannot be taken with PRUprime healthcare plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE08",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE07": {
      "code": "COVRGROUP_HEALTHCARE07",
      "COVERAGE": [
        "H1TR",
        "H1H1"
      ],
      "description": "Coverage Group Hospital cover plus & Prime healthcare plus pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cannot be taken with PRUhospital & surgical cover plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE07",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVERAGE ME": {
      "code": "COVERAGE ME",
      "COVERAGE": [],
      "description": "COVME",
      "RULE": [],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CAMPAIGN_CONV_PPHPLUS2": {
      "code": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS2",
      "COVERAGE": [
        "C102",
        "H1UR",
        "H1WR",
        "P1IR",
        "P1TR",
        "S1PR",
        "S1SR",
        "S1Z1",
        "T1KR",
        "W107",
        "W109",
        "W111",
        "W3C1",
        "D1ER",
        "C13R",
        "W3SR",
        "C108",
        "H1Y1",
        "H1Y3",
        "H1Y5",
        "C15R",
        "C153",
        "C11R",
        "H1Z7"
      ],
      "description": "Coverage Group Campaign Conversion PPH Plus Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Only allowed to add PPH Plus Plan Syariah",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS2",
          "type": "Fix Value",
          "sequence": "20",
          "mainCoverage": "U11R",
          "ruleCd": "CAMPAIGN29",
          "ruleShowType": null,
          "errorMessageInd": "Hanya diperbolehkan menambah Plan PPH Plus Syariah",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PPAYOR": {
      "code": "COVRGROUP_PPAYOR",
      "COVERAGE": [
        "W1XD",
        "W1XR",
        "W3AD",
        "W3AR",
        "W2XR"
      ],
      "description": "Coverage Group Parent Payor",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUparent payor 33 cannot be taken with PRUearly stage parent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPAYOR",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U4GR, U2V1, U2V2, U10R, U1ZR, U1ZR-HEBAT, U1BR, U2KD, U2KR, U201, U202, U1ZD",
          "ruleCd": "GCOVRAL2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUparent payor 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUparent payor 33 cannot be taken with PRUearly stage parent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPAYOR",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U4GR, U2V1, U2V2, U10R, U1BR, U1ZR, U1ZR-HEBAT, U2KD, U2KR, U201, U202, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUparent payor 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PRUMED_PRUMED_COVER_SYARIAH_ALTER": {
      "code": "COVRGROUP_PRUMED_PRUMED_COVER_SYARIAH_ALTER",
      "COVERAGE": [
        "H1WR",
        "H1IR"
      ],
      "description": "Coverage Group Prumed & Prumed Cover Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Manfaat Asuransi Tambahan PRUmed syariah tidak dapat diambil bersamaan dengan Asuransi Tambahan PRUmed cover syariah",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PRUMED_PRUMED_COVER_SYARIAH_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "Manfaat Asuransi Tambahan PRUmed syariah tidak dapat diambil bersamaan dengan Asuransi Tambahan PRUmed cover syariah",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE13": {
      "code": "COVRGROUP_HEALTHCARE13",
      "COVERAGE": [
        "H1X1",
        "H1X3",
        "H1X5",
        "H1H1"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare cannot be taken with PRUPrime Healthcare Plus Pro",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE13",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE11": {
      "code": "COVRGROUP_HEALTHCARE11",
      "COVERAGE": [
        "H1G1",
        "H1GR",
        "H1MR",
        "H1QR",
        "H1H1",
        "H2TR"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare Plus Sharia Pro cannot be taken with other HS",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE11",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U10R, U1BR, U1ZR, U201",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Plus Pro tidak dapat diambil bersamaan dengan HS lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE17": {
      "code": "COVRGROUP_HEALTHCARE17",
      "COVERAGE": [
        "H161",
        "H1TR"
      ],
      "description": "Coverage Group Hospital Cover Plus & PruWell Healthcare",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE17",
          "type": "Fix Value",
          "sequence": "16",
          "mainCoverage": "U10R, U1BR, U1ZR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE16": {
      "code": "COVRGROUP_HEALTHCARE16",
      "COVERAGE": [
        "H161",
        "H1QR"
      ],
      "description": "Coverage Group Hospital Cover & PruWell Healthcare",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover/PRUHospital & Surgical Cover Plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE16",
          "type": "Fix Value",
          "sequence": "16",
          "mainCoverage": "U1ZR, U1BR, U10R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover/PRUHospital & Surgical Cover Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE15": {
      "code": "COVRGROUP_HEALTHCARE15",
      "COVERAGE": [
        "H161",
        "H1G1",
        "H1GR",
        "H1MR"
      ],
      "description": "Coverage Group Hospital old & Hospital Cover Plus & PruWell Healthcare",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health tidak dapat diambil bersamaan dengan PRUHospital & Surgical/PRUHospital & Surgical 75/PRUHospital & Surgical Cover/PRUHospital & Surgical Cover Plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE15",
          "type": "Fix Value",
          "sequence": "16",
          "mainCoverage": "U1BR, U1ZR, U10R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health tidak dapat diambil bersamaan dengan PRUHospital & Surgical/PRUHospital & Surgical 75/PRUHospital & Surgical Cover/PRUHospital & Surgical Cover Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE14": {
      "code": "COVRGROUP_HEALTHCARE14",
      "COVERAGE": [
        "H161",
        "H1H1"
      ],
      "description": "Coverage Group Pru Well Healthcare & Pru Prime healthcare plus pro",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PruWell Health cannot be taken with PRUPrime Healthcare Plus Pro",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE14",
          "type": "Fix Value",
          "sequence": "9",
          "mainCoverage": "U12R, U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PruWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE03_SYARIAH_OBSOLETE": {
      "code": "COVRGROUP_SPOUSE03_SYARIAH_OBSOLETE",
      "COVERAGE": [
        "S1PR",
        "S1RR"
      ],
      "description": "Coverage Group Spouse Waiver & Spouse Payor Sharia Obsolete",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse waiver syariah 33 couldn't be taken with PRUspouse payor syariah 33",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE03_SYARIAH_OBSOLETE",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse waiver syariah 33 tidak dapat diambil bersamaan dengan PRUspouse payor syariah 33",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE19": {
      "code": "COVRGROUP_HEALTHCARE19",
      "COVERAGE": [
        "H161",
        "H1Z1"
      ],
      "description": "Coverage Group Prime Healthcare Plus & PruWell Healthcare",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare/PRUPrime Healthcare Plus/PRUPrime Healthcare Plus Pro.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE19",
          "type": "Fix Value",
          "sequence": "17",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare/PRUPrime Healthcare Plus/PRUPrime Healthcare Plus Pro.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE18": {
      "code": "COVRGROUP_HEALTHCARE18",
      "COVERAGE": [
        "H161",
        "H1X1",
        "H1X3",
        "H1X5"
      ],
      "description": "Coverage Group Prime Healthcare & PruWell Healthcare",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare/PRUPrime Healthcare Plus/PRUPrime Healthcare Plus Pro.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE18",
          "type": "Fix Value",
          "sequence": "17",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare/PRUPrime Healthcare Plus/PRUPrime Healthcare Plus Pro.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE07_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE07_CERMAT",
      "COVERAGE": [
        "H1TR",
        "H1H3"
      ],
      "description": "Coverage Group Hospital cover plus & Prime healthcare plus pro cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cermat cannot be taken with PRUhospital & surgical cover plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE07_CERMAT",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro (Plan Cermat) tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PADD_SYARIAH": {
      "code": "COVRGROUP_PADD_SYARIAH",
      "COVERAGE": [
        "P1TR",
        "P1IR"
      ],
      "description": "Coverage Group PADD Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death & disablement syariah tidak dapat diambil bersamaan dengan PRUpersonal accident death & disablement plus syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PADD_SYARIAH",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U1SR, U1SR-HEBAT, U23R, U4GR, U11R, U16R, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUpersonal accident death & disablement syariah tidak dapat diambil bersamaan dengan PRUpersonal accident death & disablement plus syariah.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death & disablement syariah cannot be taken with PRUpersonal accident death & disablement plus syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PADD_SYARIAH",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpersonal accident death & disablement syariah tidak dapat diambil bersamaan dengan PRUpersonal accident death & disablement plus syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE01": {
      "code": "COVRGROUP_SPOUSE01",
      "COVERAGE": [
        "S1FD",
        "S1FR",
        "S1YD",
        "S1YR"
      ],
      "description": "Coverage Group Spouse Waiver & ESSP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor cannot be taken with PRUspouse waiver 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE01",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U2V1, U2V2, U10R, U1BR, U1ZR, U1ZR-HEBAT, U201, U202, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor tidak dapat diambil bersamaan dengan PRUspouse waiver 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE02": {
      "code": "COVRGROUP_SPOUSE02",
      "COVERAGE": [
        "S1KD",
        "S1KR",
        "S1YD",
        "S1YR"
      ],
      "description": "Coverage Group Spouse Payor  & ESSP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor cannot be taken with PRUspouse payor 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE02",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U23R, U2V1, U2V2, U201, U202, U10R, U1BR, U1ZR, U1ZR-HEBAT, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor tidak dapat diambil bersamaan dengan PRUspouse payor 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ESPPWAIVER_ALTER": {
      "code": "COVRGROUP_ESPPWAIVER_ALTER",
      "COVERAGE": [
        "W1MR",
        "W1WR",
        "W2MR",
        "W3AR",
        "W1WD",
        "W3AD"
      ],
      "description": "Coverage Group ESPP & Waiver",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUwaiver 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESPPWAIVER_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U10R, U1ZR, U1BR, U201, U20R, U2V1, U2V2, U1ZD",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUwaiver 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PAD": {
      "code": "COVRGROUP_PAD",
      "COVERAGE": [
        "P1CD",
        "P1CR",
        "P1QD",
        "P1QR",
        "T1LR",
        "P2CR",
        "P2CD"
      ],
      "description": "Coverage Group PAD",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death tidak dapat diambil bersamaan dengan PRUpersonal accident death plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAD",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U4GR, U1BR, U1ZR, U1ZR-HEBAT, U10R, U2KR, U2KD, U1ZD, U1TR, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUpersonal accident death tidak dapat diambil bersamaan dengan PRUpersonal accident death plus.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death cannot be taken with PRUpersonal accident death plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAD",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U4GR, U1BR, U1ZR, U1ZR-HEBAT, U10R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpersonal accident death tidak dapat diambil bersamaan dengan PRUpersonal accident death plus.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CCB2_SYARIAH": {
      "code": "COVRGROUP_CCB2_SYARIAH",
      "COVERAGE": [
        "C1QR",
        "C11R"
      ],
      "description": "Coverage Group Crisis Cover Benefit Syariah",
      "RULE": [],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE04_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE04_CERMAT",
      "COVERAGE": [
        "H1TR",
        "H1Z3"
      ],
      "description": "Coverage Group Hospital cover plus & Prime health care plus cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus cermat cannot be taken with PRUhospital & surgical cover plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE04_CERMAT",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus (Plan Cermat) tidak dapat diambil bersamaan dengan PRUhospital & surgical cover plus",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE08_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE08_CERMAT",
      "COVERAGE": [
        "H1Z1",
        "H1H3"
      ],
      "description": "Coverage Group Prime healthcare plus & Prime healthcare plus pro cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cermat cannot be taken with PRUprime healthcare plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE08_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro (Plan Cermat) tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PAYOR": {
      "code": "COVRGROUP_PAYOR",
      "COVERAGE": [
        "W1QD",
        "W1QR",
        "W3BD",
        "W3BR",
        "W2QR"
      ],
      "description": "Coverage Group Payor & ESP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor cannot be taken with PRUpayor 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAYOR",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U4GR, U23R, U2V2, U2V1, U201, U202, U10R, U1BR, U1ZR, U1ZR-HEBAT, U1ZD, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUearly stage payor tidak dapat diambil bersamaan dengan PRUpayor 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE20": {
      "code": "COVRGROUP_HEALTHCARE20",
      "COVERAGE": [
        "H161",
        "H1Z3"
      ],
      "description": "Coverage Group Prime Healthcare Plus Cermat & PruWell Healthcare",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare/PRUPrime Healthcare Plus/PRUPrime Healthcare Plus Pro.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE20",
          "type": "Fix Value",
          "sequence": "17",
          "mainCoverage": "U10R, U1ZR, U1BR, U4L1, U4M1",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health tidak dapat diambil bersamaan dengan PRUPrime Healthcare/PRUPrime Healthcare Plus/PRUPrime Healthcare Plus Pro.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE10_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE10_CERMAT",
      "COVERAGE": [
        "H1H1",
        "H1H3"
      ],
      "description": "Coverage Group Prime healthcare plus pro & Prime healthcare plus pro cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cannot be taken with PRUprime healthcare plus pro cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE10_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1BR, U1ZR, U12R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Plus Pro tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro (Plan Cermat)",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH04_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH04_CERMAT",
      "COVERAGE": [
        "H1Z7",
        "H1UR"
      ],
      "description": "Coverage Group Hospital cover plus syariah & Prime health care plus cermat syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cermat cannot be taken with PRUhospital & surgical cover plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH04_CERMAT",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus (Plan Cermat) syariah tidak dapat diambil bersamaan dengan PRUhospital & surgical cover plus syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH08_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH08_CERMAT",
      "COVERAGE": [
        "H1Z5",
        "H1H7"
      ],
      "description": "Coverage Group Prime healthcare plus syariah & Prime healthcare plus pro syariah cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro sharia cermat cannot be taken with PRUprime healthcare plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH08_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah (Plan Cermat) tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ESP_PP_ALTER": {
      "code": "COVRGROUP_ESP_PP_ALTER",
      "COVERAGE": [
        "W1XR",
        "W3BR",
        "W2XR"
      ],
      "description": "Coverage Group Parent Payor & ESP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor tidak dapat diambil bersamaan dengan PRUparent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESP_PP_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U10R, U1ZR, U1BR, U20R, U2V1, U2V2",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage payor tidak dapat diambil bersamaan dengan PRUparent payor.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE03_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE03_CERMAT",
      "COVERAGE": [
        "H1X1",
        "H1X3",
        "H1X5",
        "H1Z3"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus CERMAT",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare cannot be taken with PRUprime healthcare plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE03_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare tidak dapat diambil bersamaan dengan PRUprime healthcare plus (Plan Cermat)",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "ESP_OLDWOP": {
      "code": "ESP_OLDWOP",
      "COVERAGE": [
        "W101",
        "W103",
        "W1FR",
        "W1KR",
        "W1RR",
        "W1ZR",
        "W3BR"
      ],
      "description": "PRUearly stage payor with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "ESP_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage payor tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CAMPAIGN_CONV_PPHPLUS": {
      "code": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS",
      "COVERAGE": [
        "C103",
        "C106",
        "C12R",
        "C143",
        "C14R",
        "C1WR",
        "D1DR",
        "H1TR",
        "H1VR",
        "H1X1",
        "H1X3",
        "H1X5",
        "H1Z3",
        "P1DR",
        "P1RD",
        "P1RR",
        "S1FR",
        "S1KR",
        "S1YD",
        "S1YR",
        "T1JD",
        "T1JR",
        "W1MR",
        "W1QR",
        "W1XD",
        "W1XR",
        "W3AD",
        "W3AR",
        "W3BD",
        "W3BR"
      ],
      "description": "Coverage Group Campaign Conversion PPH Plus",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Only allowed to add PPH Plus Plan",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS",
          "type": "Fix Value",
          "sequence": "20",
          "mainCoverage": "U10R",
          "ruleCd": "CAMPAIGN29",
          "ruleShowType": null,
          "errorMessageInd": "Hanya diperbolehkan menambah Plan PPH Plus",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CC34PFP": {
      "code": "COVRGROUP_CC34PFP",
      "COVERAGE": [
        "C1IR",
        "C1JR"
      ],
      "description": "COVRGROUP_CC34PFP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUcrisis cover 34 tidak dapat diambil bersamaan dengan PRUcrisis cover plus 34.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CC34PFP",
          "type": "Fix Value",
          "sequence": null,
          "mainCoverage": "U1ER",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUcrisis cover 34 tidak dapat diambil bersamaan dengan PRUcrisis cover plus 34.",
          "negateNextRule": false,
          "category": "New Business",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE03": {
      "code": "COVRGROUP_SPOUSE03",
      "COVERAGE": [
        "S1FD",
        "S1FR",
        "S1KD",
        "S1KR"
      ],
      "description": "Coverage Group Spouse Waiver & Spouse Payor",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse waiver 33 cannot be taken with PRUspouse payor 33",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE03",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U2V1, U2V2, U1BR, U1ZR, U1ZR-HEBAT, U10R, U2KD, U2KR, U201, U202, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse waiver 33 tidak dapat diambil bersamaan dengan PRUspouse payor 33",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE03_SYARIAH": {
      "code": "COVRGROUP_SPOUSE03_SYARIAH",
      "COVERAGE": [
        "S1PR",
        "S1SR"
      ],
      "description": "Coverage Group Spouse Waiver & Spouse Payor Sharia",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse waiver syariah 33 couldn't be taken with PRUspouse payor syariah 33",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE03_SYARIAH",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse waiver syariah 33 tidak dapat diambil bersamaan dengan PRUspouse payor syariah 33",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_WAIVER04_SYARIAH": {
      "code": "COVRGROUP_WAIVER04_SYARIAH",
      "COVERAGE": [
        "W107",
        "W109"
      ],
      "description": "Coverage Group Waiver & Payor Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor syariah 33 cannot be taken with PRUwaiver syariah 33",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_WAIVER04_SYARIAH",
          "type": "Fix Value",
          "sequence": "2",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R, U16R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUpayor syariah 33 tidak dapat diambil bersamaan dengan PRUwaiver syariah 33",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "COVRGROUP_ESP_PP_ALTER_SYARIAH": {
      "code": "COVRGROUP_ESP_PP_ALTER_SYARIAH",
      "COVERAGE": [
        "W3SR",
        "W111"
      ],
      "description": "Coverage Group Parent Payor & ESP SYARIAH",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor syariah tidak dapat diambil bersamaan dengan PRUparent payor syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESP_PP_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U11R, U1SR, U1HR, U4GR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage payor syariah tidak dapat diambil bersamaan dengan PRUparent payor syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "ESPP_OLDWOP": {
      "code": "ESPP_OLDWOP",
      "COVERAGE": [
        "W1ZR",
        "W3AR",
        "S101",
        "S111",
        "S1BR",
        "W101",
        "W103",
        "W1FR",
        "W1IR",
        "W1KR",
        "W1RR"
      ],
      "description": "PRUearly stage parent payor with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage parent payor tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "ESPP_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1ZR, U10R, U1BR",
          "ruleCd": "GCOVRAL2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage parent payor tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH17": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH17",
      "COVERAGE": [
        "H165",
        "H1UR"
      ],
      "description": "Coverage Group Hospital Cover Plus Syariah & PruWell Healthcare Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus Syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH17",
          "type": "Fix Value",
          "sequence": "16",
          "mainCoverage": "U11R, U1SR, U1HR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH16": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH16",
      "COVERAGE": [
        "H165",
        "H1RR"
      ],
      "description": "Coverage Group Hospital Cover Syariah & PruWell Healthcare Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus Syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH16",
          "type": "Fix Value",
          "sequence": "16",
          "mainCoverage": "U1SR, U1HR, U11R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH19": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH19",
      "COVERAGE": [
        "H165",
        "H1Z5"
      ],
      "description": "Coverage Group Prime Healthcare Plus Syariah & PruWell Healthcare Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Syariah/PRUPrime Healthcare Plus Syariah/PRUPrime Healthcare Plus Pro Syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH19",
          "type": "Fix Value",
          "sequence": "17",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Syariah/PRUPrime Healthcare Plus Syariah/PRUPrime Healthcare Plus Pro Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH18": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH18",
      "COVERAGE": [
        "H165",
        "H1Y1",
        "H1Y3",
        "H1Y5"
      ],
      "description": "Coverage Group Prime Healthcare Syariah & PruWell Healthcare Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Syariah/PRUPrime Healthcare Plus Syariah/PRUPrime Healthcare Plus Pro Syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH18",
          "type": "Fix Value",
          "sequence": "17",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Syariah/PRUPrime Healthcare Plus Syariah/PRUPrime Healthcare Plus Pro Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH13": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH13",
      "COVERAGE": [
        "H1Y1",
        "H1Y3",
        "H1Y5",
        "H1H5"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus pro syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare Sharia cannot be taken with PRUPrime Healthcare Plus Pro Sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH13",
          "type": "Fix Value",
          "sequence": "11",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH12": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH12",
      "COVERAGE": [
        "H1J1",
        "H1JR",
        "H1NR",
        "H1RR",
        "H1H5"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus pro syariah",
      "RULE": [],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_WAIVER01": {
      "code": "COVRGROUP_WAIVER01",
      "COVERAGE": [
        "W1MD",
        "W1MR",
        "W1WR",
        "W2MR",
        "W3BD",
        "W3BR",
        "W1WD"
      ],
      "description": "Coverage Group Waiver & ESP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor cannot be taken with PRUwaiver 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_WAIVER01",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U4GR, U2V1, U2V2, U10R, U1BR, U1ZR, U1ZR-HEBAT, U201, U202, U1ZD, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUearly stage payor tidak dapat diambil bersamaan dengan PRUwaiver 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH15": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH15",
      "COVERAGE": [
        "H165",
        "H1J1",
        "H1JR",
        "H1NR"
      ],
      "description": "Coverage Group Hospital old Syariah & Hospital Cover Plus Syariah & PruWell Healthcare Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Syariah/PRUHospital & Surgical Cover Syariah/PRUHospital & Surgical Cover Plus Syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH15",
          "type": "Fix Value",
          "sequence": "16",
          "mainCoverage": "U1HR, U1SR, U11R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Syariah/PRUHospital & Surgical Cover Syariah/PRUHospital & Surgical Cover Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_WAIVER02": {
      "code": "COVRGROUP_WAIVER02",
      "COVERAGE": [
        "W1MD",
        "W1MR",
        "W1QD",
        "W1QR",
        "W1WR",
        "W2MR",
        "W2QR",
        "W1WD"
      ],
      "description": "Coverage Group Waiver & Payor",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor 33 cannot be taken with PRUwaiver 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_WAIVER02",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U4GR, U2V1, U2V2, U10R, U1BR, U1ZR, U1ZR-HEBAT, U2KD, U2KR, U201, U202, U1ZD, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUpayor 33 tidak dapat diambil bersamaan dengan PRUwaiver 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH14": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH14",
      "COVERAGE": [
        "H165",
        "H1H5"
      ],
      "description": "Coverage Group Pru Well Healthcare Syariah & Pru Prime healthcare plus pro syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PruWell Health Syariah cannot be taken with PRUPrime Healthcare Plus Pro Syariah",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH14",
          "type": "Fix Value",
          "sequence": "9",
          "mainCoverage": "U13R, U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PruWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro Syariah",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PPAYOR_ALTER": {
      "code": "COVRGROUP_PPAYOR_ALTER",
      "COVERAGE": [
        "W1QR",
        "W1XR",
        "W2XR"
      ],
      "description": "Coverage Group Parent Payor & Payor",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor 33 tidak dapat diambil bersamaan dengan PRUparent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPAYOR_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U10R, U1ZR, U1BR, U20R",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpayor 33 tidak dapat diambil bersamaan dengan PRUparent payor.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH11": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH11",
      "COVERAGE": [
        "H1J1",
        "H1JR",
        "H1NR",
        "H1RR",
        "H1H5"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus pro syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare Plus Pro Sharia cannot be taken with other HS sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH11",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U11R, U1HR, U1SR, U4GR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah tidak dapat diambil bersamaan dengan HS syariah lainnya.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "SPOUSEPAYOR33_OLDWOP": {
      "code": "SPOUSEPAYOR33_OLDWOP",
      "COVERAGE": [
        "S101",
        "S111",
        "S1BR",
        "S1KR",
        "W103",
        "W1IR",
        "W1RR"
      ],
      "description": "PRUspouse payor 33 with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse payor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "SPOUSEPAYOR33_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1ZR, U10R, U1BR",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse payor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH09_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH09_CERMAT",
      "COVERAGE": [
        "H1Z7",
        "H1H7"
      ],
      "description": "overage Group Prime healthcare plus syariah cermat & Prime healthcare plus pro syariah cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro sharia cermat cannot be taken with PRUprime healthcare plus sharia cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH09_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah (Plan Cermat) tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Syariah (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH10_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH10_CERMAT",
      "COVERAGE": [
        "H1H5",
        "H1H7"
      ],
      "description": "Coverage Group Prime healthcare plus pro syariah & Prime healthcare plus pro syariah cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro sharia cannot be taken with PRUprime healthcare plus pro sharia cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH10_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U11R, U1HR, U1SR, U13R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro Syariah (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH11_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH11_CERMAT",
      "COVERAGE": [
        "H1J1",
        "H1JR",
        "H1NR",
        "H1H7",
        "H1RR"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus pro cermat syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare Plus Pro Sharia Cermat cannot be taken with other HS Sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH11_CERMAT",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U11R, U1HR, U1SR, U4GR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah (Plan Cermat) tidak dapat diambil bersamaan dengan HS Syariah lainnya.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH05_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH05_CERMAT",
      "COVERAGE": [
        "H1J1",
        "H1JR",
        "H1NR",
        "H1RR",
        "H1Z7"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus cermat syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cermat cannot be taken with other HS sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH05_CERMAT",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U11R, U1HR, U1SR, U4GR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus syariah (Plan Cermat) tidak dapat diambil bersamaan dengan HS syariah lainnya.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH14_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH14_CERMAT",
      "COVERAGE": [
        "H165",
        "H1H7"
      ],
      "description": "Coverage Group Pru Well Healthcare Syariah & Pru Prime healthcare plus pro syariah (cermat)",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PruWell Health Syariah cannot be taken with PRUPrime Healthcare Plus Pro Syariah Cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH14_CERMAT",
          "type": "Fix Value",
          "sequence": "9",
          "mainCoverage": "U13R, U11R, U1SR, U1HR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PruWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro Syariah (Cermat)",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH03_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH03_CERMAT",
      "COVERAGE": [
        "H1Y1",
        "H1Y3",
        "H1Y5",
        "H1Z7"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus cermat syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare sharia cannot be taken with PRUprime healthcare plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH03_CERMAT",
          "type": "Fix Value",
          "sequence": "11",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare syariah tidak dapat diambil bersamaan dengan PRUprime healthcare plus syariah (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE02_OBSOLETE": {
      "code": "COVRGROUP_SPOUSE02_OBSOLETE",
      "COVERAGE": [
        "S1JR",
        "S1YD",
        "S1YR"
      ],
      "description": "Coverage Group Spouse Payor Obsolete  & ESSP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor cannot be taken with PRUspouse payor 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE02_OBSOLETE",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U23R, U10R, U1BR, U1ZR, U1ZR-HEBAT, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor tidak dapat diambil bersamaan dengan PRUspouse payor 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH07_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH07_CERMAT",
      "COVERAGE": [
        "H1UR",
        "H1H7"
      ],
      "description": "Coverage Group Hospital cover plus syariah & Prime healthcare plus pro syariah cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro sharia cermat cannot be taken with PRUhospital & surgical cover plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH07_CERMAT",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U11R, U1SR, U1HR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah (Plan Cermat) tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_WAIVER03_SYARIAH": {
      "code": "COVRGROUP_WAIVER03_SYARIAH",
      "COVERAGE": [
        "W107",
        "W3SR"
      ],
      "description": "Coverage Group Waiver & ESP Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUwaiver syariah 33 cannot be taken with PRUearly stage payor syariah",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_WAIVER03_SYARIAH",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R, U16R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUwaiver syariah 33 tidak dapat diambil bersamaan dengan PRUearly stage payor syariah",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "PARENTPAYOR33_OLDWOP": {
      "code": "PARENTPAYOR33_OLDWOP",
      "COVERAGE": [
        "S101",
        "S111",
        "S1BR",
        "W101",
        "W103",
        "W1FR",
        "W1IR",
        "W1KR",
        "W1RR",
        "W1XR",
        "W1ZR",
        "W2XR"
      ],
      "description": "PRUparent payor 33 with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUparent payor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "PARENTPAYOR33_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1ZR, U1BR, U10R, U20R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUparent payor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PAYOR_ALTER_SYARIAH": {
      "code": "COVRGROUP_PAYOR_ALTER_SYARIAH",
      "COVERAGE": [
        "W109",
        "W3C1"
      ],
      "description": "Coverage Group ESPP & Payor Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor syariah 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAYOR_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U11R, U1SR, U1HR, U4GR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpayor syariah 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH20": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH20",
      "COVERAGE": [
        "H165",
        "H1Z7"
      ],
      "description": "Coverage Group Prime Healthcare Plus Cermat Syariah & PruWell Healthcare Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Syariah/PRUPrime Healthcare Plus Syariah/PRUPrime Healthcare Plus Pro Syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH20",
          "type": "Fix Value",
          "sequence": "17",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUWell Health Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Syariah/PRUPrime Healthcare Plus Syariah/PRUPrime Healthcare Plus Pro Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE03_OBSOLETE": {
      "code": "COVRGROUP_SPOUSE03_OBSOLETE",
      "COVERAGE": [
        "S1FD",
        "S1FR",
        "S1JR"
      ],
      "description": "Coverage Group Spouse Waiver & Spouse Payor Obsolete",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse waiver 33 cannot be taken with PRUspouse payor 33",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE03_OBSOLETE",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U23R, U10R, U1BR, U1ZR, U1ZR-HEBAT, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse waiver 33 tidak dapat diambil bersamaan dengan PRUspouse payor 33",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH",
      "COVERAGE": [
        "H1UR",
        "H1Y1",
        "H1Y3",
        "H1Y5"
      ],
      "description": "Coverage Group Hospital & Prime health care syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare sharia cannot be taken with other HS sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH",
          "type": "Fix Value",
          "sequence": "11",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R, U16R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUprime healthcare syariah tidak dapat diambil bersamaan dengan HS syariah lainnya.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PADD": {
      "code": "COVRGROUP_PADD",
      "COVERAGE": [
        "P1DD",
        "P1DR",
        "P1G1",
        "P1G2",
        "P1RD",
        "P1RR",
        "P2GR",
        "P2DD",
        "P2DR"
      ],
      "description": "Coverage Group PADD",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death & disablement tidak dapat diambil bersamaan dengan PRUpersonal accident death & disablement plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PADD",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U4GR, U1BR, U1ZR, U1ZR-HEBAT, U10R, U201, U202, U2T1, U2T2, U2KD, U2KR, U2V1, U2V2, U251, U252, U1ZD, U1TR, U15R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUpersonal accident death & disablement tidak dapat diambil bersamaan dengan PRUpersonal accident death & disablement plus.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death & disablement cannot be taken with PRUpersonal accident death & disablement plus.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PADD",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U4GR, U2V1, U2V2, U1BR, U1ZR, U1ZR-HEBAT, U10R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpersonal accident death & disablement tidak dapat diambil bersamaan dengan PRUpersonal accident death & disablement plus.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE_PAYOR": {
      "code": "COVRGROUP_SPOUSE_PAYOR",
      "COVERAGE": [
        "S1JR",
        "S1KR",
        "S1KD"
      ],
      "description": "Coverage Group Spouse Payor",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse payor 33 tidak dapat diambil bersamaan dengan PRUspouse payor lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE_PAYOR",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U2V1, U2V2, U10R, U1BR, U1ZR, U1ZR-HEBAT, U2KD, U2KR, U201, U202, U1ZD",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse payor 33 tidak dapat diambil bersamaan dengan PRUspouse payor lainnya",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE02_SYARIAH": {
      "code": "COVRGROUP_SPOUSE02_SYARIAH",
      "COVERAGE": [
        "S1SR",
        "S1Z1"
      ],
      "description": "Coverage Group Spouse Payor & ESSP Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor syariah cannot be taken with PRUspouse payor syariah 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE02_SYARIAH",
          "type": "Fix Value",
          "sequence": "10",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor syariah tidak dapat diambil bersamaan dengan PRUspouse payor syariah 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE02_SYARIAH_OBSOLETE": {
      "code": "COVRGROUP_SPOUSE02_SYARIAH_OBSOLETE",
      "COVERAGE": [
        "S1RR",
        "S1Z1"
      ],
      "description": "Coverage Group Spouse Payor Obsolete & ESSP Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor syariah cannot be taken with PRUspouse payor syariah 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE02_SYARIAH_OBSOLETE",
          "type": "Fix Value",
          "sequence": "10",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor syariah tidak dapat diambil bersamaan dengan PRUspouse payor syariah 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "PAYOR33_OLDWOP": {
      "code": "PAYOR33_OLDWOP",
      "COVERAGE": [
        "W101",
        "W103",
        "W1FR",
        "W1KR",
        "W1QR",
        "W1RR",
        "W1ZR",
        "W2QR"
      ],
      "description": "PRUpayor 33 with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "PAYOR33_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1ZR, U10R, U1BR, U20R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpayor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_PRO_BASIC": {
      "code": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_PRO_BASIC",
      "COVERAGE": [
        "H1H1",
        "H1H5",
        "U10R",
        "U11R"
      ],
      "description": "Coverage Group Campaign Conversion PPH Plus Pro for Basic",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Only allowed to add PPH Plus Pro Plan (BASIC)",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_PRO_BASIC",
          "type": "Logic",
          "sequence": "20",
          "mainCoverage": "U10R, U11R",
          "ruleCd": "GCOVR_LIMITED",
          "ruleShowType": null,
          "errorMessageInd": "Hanya diperbolehkan menambah Plan PPH Plus Pro (BASIC)",
          "negateNextRule": null,
          "category": "New Business",
          "value": "FRML_CAMPAIGN37_BASIC"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_BASIC": {
      "code": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_BASIC",
      "COVERAGE": [
        "H1Z1",
        "U10R",
        "U11R",
        "H1Z5"
      ],
      "description": "Coverage Group Campaign Conversion PPH Plus for Basic",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Only allowed to add PPH Plus Plan (BASIC)",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CAMPAIGN_CONV_PPHPLUS_BASIC",
          "type": "Logic",
          "sequence": "20",
          "mainCoverage": "U10R, U11R",
          "ruleCd": "GCOVR_LIMITED",
          "ruleShowType": null,
          "errorMessageInd": "Hanya diperbolehkan menambah Plan PPH Plus (BASIC)",
          "negateNextRule": null,
          "category": "New Business",
          "value": "FRML_CAMPAIGN34_BASIC"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "ESSP_OLDWOP": {
      "code": "ESSP_OLDWOP",
      "COVERAGE": [
        "S101",
        "S111",
        "S1BR",
        "W103",
        "W1IR",
        "W1RR",
        "S1YR"
      ],
      "description": "PRUearly stage spouse payor with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "ESSP_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PRUMED_PRUMED_COVER_ALTER": {
      "code": "COVRGROUP_PRUMED_PRUMED_COVER_ALTER",
      "COVERAGE": [
        "H1BR",
        "H1VR",
        "H2BR"
      ],
      "description": "Coverage Group Prumed & Prumed Cover",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Manfaat Asuransi Tambahan PRUmed tidak dapat diambil bersamaan dengan Asuransi Tambahan PRUmed cover",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PRUMED_PRUMED_COVER_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U1ZR, U1BR, U201",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "Manfaat Asuransi Tambahan PRUmed tidak dapat diambil bersamaan dengan Asuransi Tambahan PRUmed cover",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "WAIVER33_OLDWOP": {
      "code": "WAIVER33_OLDWOP",
      "COVERAGE": [
        "W101",
        "W103",
        "W1FR",
        "W1KR",
        "W1MR",
        "W1RR",
        "W1WR",
        "W1ZR",
        "W2MR"
      ],
      "description": "PRUwaiver 33 with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUwaiver 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "WAIVER33_OLDWOP",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1ZR, U10R, U1BR, U201, U20R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUwaiver 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ACCIDENT03": {
      "code": "COVRGROUP_ACCIDENT03",
      "COVERAGE": [
        "P1HR",
        "P1IR",
        "P1SR",
        "P1TR"
      ],
      "description": "Coverage Group Accident for Syariah IDR",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Maximum Total Sum Assured for PAD syariah, PADD syariah, PAD plus syariah dan PADD plus syariah is {0}.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ACCIDENT03",
          "type": "Logic",
          "sequence": "3",
          "mainCoverage": "U1SR-HEBAT, U1SR, U1HR, U23R, U16R",
          "ruleCd": "MAXSA_TOTALACCIDENT",
          "ruleShowType": null,
          "errorMessageInd": "Maksimum Total Santunan Asuransi PAD syariah, PADD syariah, PAD plus syariah dan PADD plus syariah adalah {0}.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "FRM_MAXSA_ACCIDENT"
        }
      ],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "COVRGROUP_ACCIDENT01": {
      "code": "COVRGROUP_ACCIDENT01",
      "COVERAGE": [
        "P1CR",
        "P1DR",
        "P1QR",
        "P1RR"
      ],
      "description": "Coverage Group Accident for Konvensional IDR",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Maximum Total Sum Assured for PAD, PADD, PAD plus dan PADD plus is {0}.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ACCIDENT01",
          "type": "Logic",
          "sequence": "6",
          "mainCoverage": "U1ZR, U1ZR-HEBAT, U1BR, U15R",
          "ruleCd": "MAXSA_TOTALACCIDENT",
          "ruleShowType": null,
          "errorMessageInd": "Maksimum Total Uang Pertanggungan PAD, PADD, PAD plus dan PADD plus adalah {0}.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "FRM_MAXSA_ACCIDENT"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Maximum total sum assured of AD/ADD/AD plus/ADD plus  is Rp. {0}",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ACCIDENT01",
          "type": "Logic",
          "sequence": null,
          "mainCoverage": "U1TR",
          "ruleCd": "MAXSA_TOTALACCIDENT",
          "ruleShowType": "SA",
          "errorMessageInd": "Maksimum total uang pertanggungan AD/ADD/AD plus/ADD plus adalah Rp. {0}",
          "negateNextRule": false,
          "category": "New Business",
          "value": "FRM_MAXSA_ACCIDENT02"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ACCIDENT02": {
      "code": "COVRGROUP_ACCIDENT02",
      "COVERAGE": [
        "P1CD",
        "P1DD",
        "P1QD",
        "P1RD"
      ],
      "description": "Coverage Group Accident for Konvensional USD",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "Maximum Total Sum Assured for PAD, PADD, PAD plus dan PADD plus is {0}.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ACCIDENT02",
          "type": "Logic",
          "sequence": "11",
          "mainCoverage": "U1ZD",
          "ruleCd": "MAXSA_TOTALACCIDENT",
          "ruleShowType": "SA",
          "errorMessageInd": "Maksimum Total Uang Pertanggungan PAD, PADD, PAD plus dan PADD plus adalah {0}.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "FRM_MAXSA_ACCIDENT01"
        }
      ],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "COVRGROUP_HEALTHCARE05_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE05_CERMAT",
      "COVERAGE": [
        "H1G1",
        "H1GR",
        "H1MR",
        "H1QR",
        "H2TR",
        "H1Z3"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus cermat cannot be taken with other HS",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE05_CERMAT",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U10R, U1BR, U1ZR, U201",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus (Plan Cermat) tidak dapat diambil bersamaan dengan HS lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE09_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE09_CERMAT",
      "COVERAGE": [
        "H1Z3",
        "H1H3"
      ],
      "description": "Coverage Group Prime healthcare plus cermat & Prime healthcare plus pro cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro cermat cannot be taken with PRUprime healthcare plus cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE09_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro (Plan Cermat) tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE06_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE06_CERMAT",
      "COVERAGE": [
        "H1Z1",
        "H1Z3"
      ],
      "description": "Coverage Group Prime health care plus & Prime health care plus cermat",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus cannot be taken with PRUprime healthcare plus cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE06_CERMAT",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U10R, U1ZR, U1ZR-HEBAT, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus tidak dapat diambil bersamaan dengan PRUprime healthcare plus (Plan Cermat)",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "SPOUSEPAYOR33_OLDWOP_OBSOLETE": {
      "code": "SPOUSEPAYOR33_OLDWOP_OBSOLETE",
      "COVERAGE": [
        "S101",
        "S111",
        "S1BR",
        "S1JR",
        "W103",
        "W1IR",
        "W1RR"
      ],
      "description": "PRUspouse payor 33 Obsolete with old WOP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse payor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "SPOUSEPAYOR33_OLDWOP_OBSOLETE",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "U1ZR, U10R, U1BR",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse payor 33 tidak bisa diambil bersamaan dengan manfaat bebas premi lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PPAYOR01": {
      "code": "COVRGROUP_PPAYOR01",
      "COVERAGE": [
        "W111",
        "W3C1"
      ],
      "description": "Coverage Group Parent payor Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUparent payor 33 cannot be taken with PRUearly stage parent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPAYOR01",
          "type": "Fix Value",
          "sequence": "12",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUparent payor syariah 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage parent payor syariah cannot be taken with PRUparent payor syariah 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PPAYOR01",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage parent payor syariah tidak dapat diambil bersamaan dengan PRUparent payor syariah 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "COVRGROUP_SPOUSE_PAYOR_SYARIAH": {
      "code": "COVRGROUP_SPOUSE_PAYOR_SYARIAH",
      "COVERAGE": [
        "S1RR",
        "S1SR"
      ],
      "description": "Coverage Group Spouse Payor Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUspouse payor syariah 33 tidak dapat diambil bersamaan dengan PRUspouse payor syariah lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE_PAYOR_SYARIAH",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUspouse payor syariah 33 tidak dapat diambil bersamaan dengan PRUspouse payor syariah lainnya",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ESP_ESPP_ALTER": {
      "code": "COVRGROUP_ESP_ESPP_ALTER",
      "COVERAGE": [
        "W3BR",
        "W3AR"
      ],
      "description": "Coverage Group ESP & ESPP",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESP_ESPP_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage payor tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH13_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH13_CERMAT",
      "COVERAGE": [
        "H1Y1",
        "H1Y3",
        "H1Y5",
        "H1H7"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus pro cermat syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUPrime Healthcare Sharia cannot be taken with PRUPrime Healthcare Plus Pro Sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH13_CERMAT",
          "type": "Fix Value",
          "sequence": "11",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUPrime Healthcare Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Pro Syariah (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PAYOR01": {
      "code": "COVRGROUP_PAYOR01",
      "COVERAGE": [
        "W3SR",
        "W109"
      ],
      "description": "Coverage Group Payor & ESP Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor syariah cannot be taken with PRUpayor syariah 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAYOR01",
          "type": "Fix Value",
          "sequence": "4",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R, U16R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUearly stage payor syariah tidak dapat diambil bersamaan dengan PRUpayor syariah 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "COVRGROUP_ESCC_ESCCP_ALTER": {
      "code": "COVRGROUP_ESCC_ESCCP_ALTER",
      "COVERAGE": [
        "C106",
        "C1XR"
      ],
      "description": "Coverage Group ESCC & ESCC Plus",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage crisis cover cannot be taken with PRUearly stage crisis cover plus",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESCC_ESCCP_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U1ZR, U1BR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage crisis cover tidak dapat diambil bersamaan dengan PRUearly stage crisis cover plus",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH09": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH09",
      "COVERAGE": [
        "H1Z7",
        "H1H5"
      ],
      "description": "Coverage Group Prime healthcare plus syariah cermat & Prime healthcare plus pro syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro sharia cannot be taken with PRUprime healthcare plus sharia cermat",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH09",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Syariah (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH06_CERMAT": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH06_CERMAT",
      "COVERAGE": [
        "H1Z5",
        "H1Z7"
      ],
      "description": "Coverage Group Prime health care plus syariah & Prime health care plus cermat syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cannot be taken with PRUprime healthcare plus cermat sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH06_CERMAT",
          "type": "Fix Value",
          "sequence": "11",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus syariah tidak dapat diambil bersamaan dengan PRUprime healthcare plus syariah (Plan Cermat).",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CCB": {
      "code": "COVRGROUP_CCB",
      "COVERAGE": [
        "C1KD",
        "C1KR",
        "C1WR",
        "C1WD"
      ],
      "description": "Coverage Group CCB",
      "RULE": [],
      "FORMULA": [],
      "type": "Coverage Group"
    },
    "COVRGROUP_CCB2": {
      "code": "COVRGROUP_CCB2",
      "COVERAGE": [
        "C1LR",
        "C1WR"
      ],
      "description": "Coverage Group Crisis Cover Benefit",
      "RULE": [],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ESPPWAIVER_ALTER_SYARIAH": {
      "code": "COVRGROUP_ESPPWAIVER_ALTER_SYARIAH",
      "COVERAGE": [
        "W107",
        "W3C1"
      ],
      "description": "Coverage Group ESPP & Waiver Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUwaiver syariah 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESPPWAIVER_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U11R, U1SR, U1HR, U4GR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUwaiver syariah 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH05": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH05",
      "COVERAGE": [
        "H1J1",
        "H1JR",
        "H1NR",
        "H1RR",
        "H1Z5"
      ],
      "description": "Coverage Group Hospital old & Prime health care plus syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cannot be taken with other HS sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH05",
          "type": "Fix Value",
          "sequence": "15",
          "mainCoverage": "U11R, U1HR, U1SR, U4GR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus syariah tidak dapat diambil bersamaan dengan HS syariah lainnya.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH08": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH08",
      "COVERAGE": [
        "H1Z5",
        "H1H5"
      ],
      "description": "Coverage Group Prime healthcare plus syariah & Prime healthcare plus pro syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro sharia cannot be taken with PRUprime healthcare plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH08",
          "type": "Fix Value",
          "sequence": "8",
          "mainCoverage": "U11R, U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah tidak dapat diambil bersamaan dengan PRUPrime Healthcare Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH07": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH07",
      "COVERAGE": [
        "H1UR",
        "H1H5"
      ],
      "description": "Coverage Group Hospital cover plus syariah & Prime healthcare plus pro syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus pro syariah cannot be taken with PRUhospital & surgical cover plus syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH07",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U11R, U1SR, U1HR",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUPrime Healthcare Plus Pro Syariah tidak dapat diambil bersamaan dengan PRUHospital & Surgical Cover Plus Syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH02": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH02",
      "COVERAGE": [
        "H1J1",
        "H1JR",
        "H1NR",
        "H1RR",
        "H1UR"
      ],
      "description": "Coverage Group Hospital & Other HSC syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUhospital & surgical cover plus syariah tidak dapat diambil bersamaan dengan HS syariah lainnya",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH02",
          "type": "Fix Value",
          "sequence": "12",
          "mainCoverage": "U1HR, U1SR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUhospital & surgical cover plus syariah tidak dapat diambil bersamaan dengan HS syariah lainnya",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PAYOR_ALTER": {
      "code": "COVRGROUP_PAYOR_ALTER",
      "COVERAGE": [
        "W1QR",
        "W3AR"
      ],
      "description": "Coverage Group ESPP & Payor",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpayor 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAYOR_ALTER",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U10R, U1ZR, U1BR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpayor 33 tidak dapat diambil bersamaan dengan PRUearly stage parent payor.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH04": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH04",
      "COVERAGE": [
        "H1UR",
        "H1Z5"
      ],
      "description": "Coverage Group Hospital cover plus syariah & Prime health care plus syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare plus sharia cannot be taken with PRUhospital & surgical cover plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH04",
          "type": "Fix Value",
          "sequence": "14",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare plus syariah tidak dapat diambil bersamaan dengan PRUhospital & surgical cover plus syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_HEALTHCARE_SYARIAH03": {
      "code": "COVRGROUP_HEALTHCARE_SYARIAH03",
      "COVERAGE": [
        "H1Y1",
        "H1Y3",
        "H1Y5",
        "H1Z5"
      ],
      "description": "Coverage Group Prime health care & Prime health care plus syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUprime healthcare sharia cannot be taken with PRUprime healthcare plus sharia",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_HEALTHCARE_SYARIAH03",
          "type": "Fix Value",
          "sequence": "11",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUprime healthcare syariah tidak dapat diambil bersamaan dengan PRUprime healthcare plus syariah.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_SPOUSE01_SYARIAH": {
      "code": "COVRGROUP_SPOUSE01_SYARIAH",
      "COVERAGE": [
        "S1PR",
        "S1Z1"
      ],
      "description": "Coverage Group Spouse Waiver & ESSP Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage spouse payor syariah couldn't be taken with PRUspouse waiver syariah 33.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_SPOUSE01_SYARIAH",
          "type": "Fix Value",
          "sequence": "7",
          "mainCoverage": "U4GR, U23R, U11R, U1HR, U1SR, U1SR-HEBAT",
          "ruleCd": "GCOVRAL1",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage spouse payor syariah tidak dapat diambil bersamaan dengan PRUspouse waiver syariah 33.",
          "negateNextRule": null,
          "category": "Both",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_CCPAYOR_TRAD": {
      "code": "COVRGROUP_CCPAYOR_TRAD",
      "COVERAGE": [
        "C1CR",
        "W1UR",
        "C1CD",
        "W1UD"
      ],
      "description": "Coverage Group crisis cover",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUcrisis cover cannot be taken with PRUpayor",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_CCPAYOR_TRAD",
          "type": "Fix Value",
          "sequence": "1",
          "mainCoverage": "T1GR, T1GD, U1ZD",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUcrisis cover tidak dapat diambil bersamaan dengan PRUpayor",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_ESP_ESPP_ALTER_SYARIAH": {
      "code": "COVRGROUP_ESP_ESPP_ALTER_SYARIAH",
      "COVERAGE": [
        "W3SR",
        "W3C1"
      ],
      "description": "Coverage Group ESP & ESPP SYARIAH",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUearly stage payor syariah tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_ESP_ESPP_ALTER_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U11R, U1SR, U1HR, U4GR",
          "ruleCd": "GCOVR2",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUearly stage payor syariah tidak dapat diambil bersamaan dengan PRUearly stage parent payor syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    },
    "COVRGROUP_PAD_SYARIAH": {
      "code": "COVRGROUP_PAD_SYARIAH",
      "COVERAGE": [
        "P1HR",
        "P1SR"
      ],
      "description": "Coverage Group PAD Syariah",
      "RULE": [
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death syariah tidak dapat diambil bersamaan dengan PRUpersonal accident death plus syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAD_SYARIAH",
          "type": "Fix Value",
          "sequence": "5",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR, U23R, U16R",
          "ruleCd": "GCOVR",
          "ruleShowType": null,
          "errorMessageInd": "PRUpersonal accident death syariah tidak dapat diambil bersamaan dengan PRUpersonal accident death plus syariah.",
          "negateNextRule": null,
          "category": "New Business",
          "value": "1"
        },
        {
          "itemType": "Coverage Group",
          "errorType": "BLOCKED",
          "errorMessageEng": "PRUpersonal accident death syariah cannot be taken with PRUpersonal accident death plus syariah.",
          "forSpecificRider": null,
          "alterProcessStatus": null,
          "itemCd": "COVRGROUP_PAD_SYARIAH",
          "type": "Fix Value",
          "sequence": "6",
          "mainCoverage": "U1SR, U1SR-HEBAT, U11R, U1HR, U4GR",
          "ruleCd": "GCOVR",
          "ruleShowType": "SA",
          "errorMessageInd": "PRUpersonal accident death syariah tidak dapat diambil bersamaan dengan PRUpersonal accident death plus syariah.",
          "negateNextRule": null,
          "category": "Alter",
          "value": "1"
        }
      ],
      "FORMULA": [],
      "type": "Coverage_Group"
    }
  }
} as any