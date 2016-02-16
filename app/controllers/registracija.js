$.registracija.addEventListener('android:back', function (e) {
  var next = Alloy.createController('index').getView();
    next.open();
    $.registracija.close();
});
function close(e)
{
 	$.registracija.close();
}

function clear()
{
 	$.username.value = "";
 	$.password.value = "";
 	$.ime.value = "";
 	$.priimek.value = "";
}

function nazaj()
{
	var next = Alloy.createController('index').getView();
    next.open();
    $.registracija.close();
}

function register(e) 
{
//naredimo nov httpcli objekt
var client = Titanium.Network.createHTTPClient();
  
  	//če so textboxi prazni ne naredimo ničesar
    if ($.username.value != '' && $.password.value != ''&& $.ime.value != ''&& $.priimek.value != '')
    {
        client.open("POST","http://oceni.fulba.com/register.php");
        var params = 
        {
            ime : $.ime.value,
            priimek : $.priimek.value,
            username: $.username.value,
            password: Ti.Utils.sha1($.password.value)            
        };
         
        client.send(params);
         
        client.onerror = function()
        {
           	alert("Napaka v povezavi. Poskusite ponovno kasneje.");
        };
        
   		client.onload = function()
   		{
    		var response = JSON.parse(this.responseText);
       
       		if (response.registriran == 'true')
       		{
       			Ti.App.Properties.setString('username', $.username.value);
       			alert("Registracija uspešna");
        	   	var next = Alloy.createController('domov').getView();
     	      	next.open();
      	     	$.registracija.close();
     	  	}
      	 	else
       		{
          	 	alert("Uporabnik že obstaja!");
       		}
   		};
    }
    else
    {
        alert("Vpisati morate vse elemente.");
        clear();
    }
}
