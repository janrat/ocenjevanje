//če ne najde index.html pol je projekt pokvarjen - preseli kodo v novega
//če naloži logo pol projekt dela sam ne nek error - najverjetneje pri 
//povezavi controler-view npr da kličeš en view , ki se imenuje drugače
//če se naloži stara aplikacija, ki je ni več v kodi - rešite še ni znana
//aplikacija dela ampak ker browser ne more sprejemati takšnih raw requestov 
//če te zavrne in potem je json NULL in ne spusti naprej
//če aplikacija ni registrirana nov projekt + prekopiraj kodo ker je projekt uničen
//če nisi validen user potem se prijavi z drugim accjem, ker je trenutno nekaj narobe z računom
//če ni oranžno ali pa se ne da pisat je zato ker je barva napačna in se ne vidi -> .tss
//error exited with code 1 - appc ti config android.buildTools.selectedVersion 23.0.1 v konzolo 
//(verzijo pogledaš v android sdk)
//DELA samo na androidu ker drugače ne dobi sploh nč nazaj v browserju

$.index.open();

function close(e)
{
	$.index.close();
}

function naregistracijo(e)
{
	var next = Alloy.createController('registracija').getView();
	next.open();
	$.index.close();
}

function clear()
{
	$.username.value = "";
	$.password.value = "";
}

function nextScreenLogin(e) 
{
 
	//naredimo nov httpcli objekt
	var client = Titanium.Network.createHTTPClient();
  
	//če so textboxi prazni ne naredimo ničesar
	if ($.username.value != '' && $.password.value != '')
	{
    	client.open("POST","http://oceni.fulba.com/login.php");
        var params = 
        {
        	username: $.username.value,
            password: Ti.Utils.sha1($.password.value)            
        };
         
        client.send(params);
         
        client.onerror = function()
        {
        	alert("Napaka v omrežju. Prosimo poskusite kasneje.");
        };
          
   		client.onload = function()
   		{
   			var response = JSON.parse(this.responseText);
       
       		if (response.prijavljen == 'true')
       		{
        		Ti.App.Properties.setString('username', $.username.value);
        		clear();
        		
           		var next = Alloy.createController('domov').getView();
     			next.open();
     			$.index.close();
       		}
       		else
       		{
           		alert("Napačno uporabniško ime ali geslo!");
       		}
   		};
   	}
    else
    {
    	alert("Vpišite uporabniško ime in  geslo.");
        clear();
    }
}

function loginOpened(e)
{
 	//$.login.activity.actionBar.hide();
 	if(Ti.App.Properties.hasProperty('username'))
 	{ 
  		if(Ti.App.Properties.getString('username') != '')
  		{
   			var next = Alloy.createController('domov').getView();
   			next.open();
   			$.index.close();
  		}
 	}
}