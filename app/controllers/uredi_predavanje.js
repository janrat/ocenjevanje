$.uredi_predavanje.open();
$.uredi_predavanje.addEventListener('android:back', function (e) {
  Alloy.createController('uredi_predavanja').getView();
    
    $.uredi_predavanje.close();
});
function close(e)
{
  $.uredi_predavanje.close();
}

function clear()
{
  $.vprasanje.value = "";
}

function nazaj()
{
  var next = Alloy.createController('uredi_predavanja').getView();
    next.open();
    $.uredi_predavanje.close();
}

var args = arguments[0] || {};
var predavanje = args.id_predavanja;

function nalozi(e) 
{
  //naredimo nov httpcli objekt
  var client = Titanium.Network.createHTTPClient();
  
    client.open("POST","http://oceni.fulba.com/o_predavanju_1.php");
        var params = 
        {
          id: predavanje
        };
         
        client.send(params);
         
        client.onerror = function()
        {
          alert("Problem z nalaganjem dogodkov. Poskusite kasneje");
        };
          
     client.onload = function()
      {     
        var response = JSON.parse(this.responseText);
       
          $.name.value = response.ime;
            $.opis.value = response.opis;
            $.lokacija.value = response.lokacija;
            $.code.value = response.code;
            $.ura.value = response.ura;
            $.datum.value = response.datum;            
      };
     nalozi_vprasanja();
}
function dodaj(e)
{
	//naredimo nov httpcli objekt
 	var client = Titanium.Network.createHTTPClient();
  
    //če so textboxi prazni ne naredimo ničesar
    if ($.vprasanje.value != '')
    {
        client.open("POST","http://oceni.fulba.com/dodaj_vprasanja.php");
        var params = 
        {
          	id : predavanje,
            vprasanje : $.vprasanje.value         
        };
         
        client.send(params);
         
        client.onerror = function()
        {
            alert("Napaka v omrežju. Prosimo poskusite kasneje.");
        };
        
      client.onload = function()
      {
        alert("Uspešno ste vnesli vprašanje.");
        clear();
        Alloy.createController('uredi_predavanja',{"id_predavanja": predavanje}).getView();
    	
    	$.uredi_predavanje.close();             
      };
    }
    else
    {
        alert("Vpisati morate vprašanje.");
        clear();
    }
       
}
function nalozi_vprasanja(e) 
{
	//naredimo nov httpcli objekt
	var client = Titanium.Network.createHTTPClient();
  
    	client.open("POST","http://oceni.fulba.com/prenesi_vprasanja_vsa.php");
        var params = 
        {
        	id: predavanje
        };
         
        client.send(params);
         
        client.onerror = function()
        {
        	alert("Problem z nalaganjem vprašanj. Poskusite kasneje");
        };
        
   		client.onload = function()
   		{   		
    		var response = JSON.parse(this.responseText);
       
       		if ( response.length == 0 || response.length == null)
       		{
        		alert("Nimate vprašanj");
       		}
       		else
       		{
       			 for (var i=0;i<response.length;i++)
		          {
		          	$id_izbranega = response[i].id;          			
		           	var vprasanje = Ti.UI.createButton(
				    {
						my_id: response[i].id,
						title: response[i].vprasanje,
						top: "30dp" ,
						//textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
						width: Titanium.UI.FILL,
						//borderWidth: "1"   					
					});
				$.pogled.add(vprasanje);
				vprasanje.addEventListener('click', function(e){
					itemId = e.source.my_id;
    				aktivno_vprasanje(itemId);    					
					});				
			};
			
			}
		};
}
function aktivno_vprasanje(e)
{
	
	//naredimo nov httpcli objekt
 	var client = Titanium.Network.createHTTPClient();
   
        client.open("POST","http://oceni.fulba.com/aktivno_vprasanje.php");
        var params = 
        {
          	id : e                 
        };
         
        client.send(params);
        alert("Vprašanje bo aktivno 10 sekund."); 
        client.onerror = function()
        {
            alert("Napaka v omrežju. Prosimo poskusite kasneje.");
        };
        
      client.onload = function()
      {
        alert("Vprašanje ni več aktivno.");        
                     
      };   
}
function uredi(e) 
{
 //naredimo nov httpcli objekt
 var client = Titanium.Network.createHTTPClient();
  
    //če so textboxi prazni ne naredimo ničesar
    if ($.name.value != '' || $.opis.value != '' || $.lokacija.value != '' || $.ura.value != '' || $.datum.value != '')
    {
        client.open("POST","http://oceni.fulba.com/uredi_predavanje.php");
        var params = 
        {
          	id : predavanje,
            ime : $.name.value,
            code: $.code.value,
            datum : $.datum.value, 
            ura : $.ura.value,
            opis : $.opis.value,
            lokacija : $.lokacija.value           
        };
        client.send(params);
     }
}
        
