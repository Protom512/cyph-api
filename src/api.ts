function doGet() {
  let resData = [];
  var id: string;
  id = "1cYIdPhI9FWJ07JbT2QOpG4qv6q4e-yk0JOn92U85k1g";

  //スプレッドシート名指定 "シート1"
  var sheet = SpreadsheetApp.openById(id).getSheetByName("total");

  var lastcolumn: number;
  var lastrow: number;
  lastcolumn = sheet.getLastColumn();
  lastrow = sheet.getLastRow();
  Logger.log("lastcolumn:" + lastcolumn);
  Logger.log("lastrow:" + lastrow);
  var names: any[][];
  names = sheet.getRange(1, 1, lastrow, lastcolumn).getValues();
  var ret: { name: any; paid: number; };
  for (let col: number = 1; col < names.length-1; col++) {
    var total_cost: number = 0;
    ret={name:"",paid:0};
    ret.name = names[0][col];
    for (let index = 1; index < lastrow; index++) {
      total_cost += names[index][col];
    }
    ret.paid = total_cost;
    resData.push(ret);
  }
  Logger.log(resData);
  var result = JSON.stringify(resData);
  return ContentService.createTextOutput(result);

}
function doPut(e: { parameter: { who: string; }; }) {
  let resData: any;
  if (e.parameter == undefined) {
    resData = undefined;
  }
  let paid_by: string;
  paid_by = e.parameter.who;
}
