function onOpen() { 
 var ui = SpreadsheetApp.getUi(); 
 var menu = ui.createMenu("スクリプト"); //メニュー名 
 menu.addItem('ssToS3','ssToS3'); //表示名、スクリプト名 
 menu.addToUi(); 
}