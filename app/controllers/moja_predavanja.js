//naredimo nov httpcli objekt
var client = Titanium.Network.createHTTPClient();
  
client.open("POST","http://oceni.fulba.com/prenesi_predavanja_username_prijavljen.php");
var params = 
{
	username: Ti.App.Properties.getString('username')
};
 
client.send(params);
 
client.onerror = function()
{
	alert("Problem z nalaganjem dogodkov. Poskusite kasneje");
};
      
client.onload = function()
{   		
	var response = JSON.parse(this.responseText);
	
	if ( response.length == 0 || response.length == null)
   	{
    	alert("Niste prijavljeni na nobeno predavanje. Lahko pa ustvarite svojega.");
	}
	else
	{       			
		var odmik=100;
   		for (var i=0;i<response.length;i++)
   		{
   			
   			var ime = Ti.UI.createButton(
   			    {
					my_id: response[i].id,
					title: "Ime:"+response[i].ime+" |Koda:"+response[i].code,
					top: odmik+"dp",        					
					width: Titanium.UI.FILL    					
				}
			);
			$.pogled.add(ime);
			ime.addEventListener('click', function(e){
				itemId = e.source.my_id;
		    	var next = Alloy.createController('izpis_predavanja',{"id_predavanja": itemId}).getView();
				next.open();
				
			});
			odmik = odmik + 75;					
   		}; 
	}
};
