function clear()
{
  $.name.value = "";
  $.opis.value = "";
  $.lokacija.value = "";
  $.ura.value = "";
  $.name.value = ""; 
  $.code.value = "";
  $.datum.value = "";
}

function dodaj(e) 
{
//naredimo nov httpcli objekt
var client = Titanium.Network.createHTTPClient();
  
   //če so textboxi prazni ne naredimo ničesar
    if ($.name.value != '' || $.opis.value != '' || $.lokacija.value != '' || $.ura.value != '' || $.datum.value != '')
    {
        client.open("POST","http://oceni.fulba.com/dodaj_predavanje.php");
        var params = 
        {
            ime : $.name.value,
            opis : $.opis.value,
            lokacija : $.lokacija.value,
            ura : $.ura.value,
            datum : $.name.value, 
            username : Ti.App.Properties.getString('username'),
            code : $.code.value
        };
        
        client.send(params);
         
        client.onerror = function()
        {
            alert("Napaka v omrežju. Prosimo poskusite kasneje.");
        };
        
     client.onload = function()
     {
      alert("Uspešno ste dodali predavanje.");
      clear();
     };
    }
    else
    {
        alert("Vpisati morate vse elemente");
        clear();
    }
}
