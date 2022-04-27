function ss_to_s3() {
  var awsAccessKeyId = PropertiesService.getScriptProperties().getProperty("awsAccessKeyId");
  var awsSecretKey = PropertiesService.getScriptProperties().getProperty("awsSecretKey");

  // スプレッドシートを取得
  var SpreadsheetId = PropertiesService.getScriptProperties().getProperty("SpreadsheetId");
  var ss = SpreadsheetApp.openById(SpreadsheetId);
  // シートのオブジェクトを取得
  var sheet = ss.getSheetByName(Setting.targetSheetName);
  const lastRow = sheet.getLastRow();
  // データを取得
  var data = sheet.getRange('A:G').getValues();

  // 送信データ用の配列
  var csvString = '';
  for ( var i = 0; i < lastRow; i++ ) {
    if (data[i][Setting.amazonUrl] != '') {
      csvString += '"' + data[i][Setting.amazonUrl] + '","' + data[i][Setting.targetPrice] + '","' + data[i][Setting.tweetContent] + '","' + data[i][Setting.monitoringTarget] + '","' + data[i][Setting.lstTweetAt] + '","' + data[i][Setting.isTweetable] + '","' + data[i][Setting.maxWordCont] + '"' + "\n";
    }
  }

  csv = Utilities.newBlob(csvString, "text/csv", "UTF-8");
  
  var s3 = S3.getInstance(awsAccessKeyId, awsSecretKey);
  s3.putObject( 'crawl-amazon-url-job', 'spreadsheet-data/item_list.csv', csv, {logRequests:true} );
}