function clear()
{
 	$.code.value = "";
}

function prijavi()
{
//naredimo nov httpcli objekt
var client = Titanium.Network.createHTTPClient();
  
  	//če so textboxi prazni ne naredimo ničesar
    if ($.code.value != '')
    {
        client.open("POST","http://oceni.fulba.com/prijavi_predavanje.php");
        var params = 
        {
            code : $.code.value,
            username : Ti.App.Properties.getString('username')
        };
         
        client.send(params);
         
        client.onerror = function()
        {
           	alert("Napaka v povezovanju. Prosimo poskusite kasneje.");
        };
        
   		client.onload = function()
   		{
   			var response = JSON.parse(this.responseText);
   			
   			if(response.vredu = "1")
   			{
   				alert("Uspešno ste se prijavili na dogodek.");    			
   			}
    		else
    		{
    			alert("Predavanje s to kodo ne obstaja. Poskusite ponovno.");
    		}
   		};
    }
    else
    {
        alert("Niste vpisali kode.");
        clear();
    }
}
