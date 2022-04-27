function onOpen() { 
 var ui = SpreadsheetApp.getUi(); 
 var menu = ui.createMenu("スクリプト"); //メニュー名 
 menu.addItem('ss_to_s3','ss_to_s3'); //表示名、スクリプト名 
 menu.addToUi(); 
}