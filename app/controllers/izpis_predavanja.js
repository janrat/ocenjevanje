$.izpis_predavanja.open();
var meni = Ti.UI.createButton(
        {
            title: "Nazaj",
            top: "20dp",
            backgroundColor: "#28383D"             
        });
meni.addEventListener('click', function(e)
        {            
           Alloy.createController('moja_predavanja').getView();
            
            $.izpis_predavanja.close();
        });
$.izpis_predavanja.addEventListener('android:back', function (e) {
   Alloy.createController('moja_predavanja').getView();    
    $.izpis_predavanja.close();
});
function close(e)
{
  $.izpis_predavanja.close();
}

var args = arguments[0] || {};
var predavanje = args.id_predavanja;
var uporabnik = "";
function nalozi(e) 
{
	$x=0;
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
       		uporabnik = response.user;
            $.name.value = response.ime;
            $.opis.value = response.opis;
            $.lokacija.value = response.lokacija;
            $.code.value = response.code;
            $.ura.value = response.ura;
            $.datum.value = response.datum;
                        
            if(Ti.App.Properties.getString('username')==uporabnik)
			{
				nalozi_vprasanja_lastnik();
			}
			else
			{
				nalozi_vprasanja();		
			}
		};				
}
function osvezi() {
	/*var next = Alloy.createController('moja_predavanja',{"id_predavanja": predavanje}).getView();
    	next.open();
    	$.izpis_predavanja.close();*/
	if(Ti.App.Properties.getString('username')==uporabnik)
	{
		nalozi_vprasanja_lastnik();
	}
	else
	{
	nalozi_vprasanja();		
	}
};
/*setInterval(function() {
	var next = Alloy.createController('moja_predavanja',{"id_predavanja": predavanje}).getView();
    	next.open();
    	$.izpis_predavanja.close();
    	/*if(Ti.App.Properties.getString('username')==uporabnik)
		{
			nalozi_vprasanja_lastnik();
		}
		else
		{
		nalozi_vprasanja();		
		}
},9500);*/
function graf(e,ex,dol) 
{
	//naredimo nov httpcli objekt
	var client = Titanium.Network.createHTTPClient();
  
    	client.open("POST","http://oceni.fulba.com/prenesi_odgovore.php");
        var params = 
        {
        	id: e
        };
         
        client.send(params);
        client.setTimeout( 9000 );
        client.onerror = function()
        {
        	alert("Problem z nalaganjem odgovorov. Poskusite kasneje");
        };
          
   		client.onload = function()
   		{   		
    		var response = JSON.parse(this.responseText);
       
       		if ( response.length == 0 || response.length == null)
       		{
        		//alert("Nimate odgovorov");
       		}
       		else
       		{
       			var st_odgovorov=response.length;
       			var da=0;
       			var ne=0;
       			var nevem=0;
		      	for (var i=0;i<response.length;i++)
		          {
			          for (var i=0;i<response.length;i++)
			          {
			          	if(response[i].odgovor == 1)
			          	{
			          		da=da+1;
			          	}
			          	if(response[i].odgovor == 2)
			          	{
			          		ne=ne+1;
			          	}
			          	if(response[i].odgovor == 0)
			          	{
			          		nevem=nevem+1;
			          	}
			           };
		          	da=parseInt((da/st_odgovorov)*100);
		          	ne=parseInt((ne/st_odgovorov)*100);
		          	nevem=parseInt((nevem/st_odgovorov)*100);
		          	var ime_vprasanja = Ti.UI.createLabel(
					    {
							id: e,
							text:"Vprašanje: "+ex,
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							top: "30dp"    					
						});
					$.pogled.add(ime_vprasanja);
					var stevilo_odg = Ti.UI.createLabel(
					    {
							id: e,
							text:"Število odgovorov: "+st_odgovorov,
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT							    					
						});
					$.pogled.add(stevilo_odg);
		          	if(da != 0)
		          	{
		          		var odgovor_da = Ti.UI.createButton(
           			    {
        					title: "Da: "+da+"%",        					        					
        					width: da+"%",
        					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        					left: 0   					
    					}
    				);
    				$.pogled.add(odgovor_da);
		          	}
    				if(ne != 0)
    				{	
	    				var odgovor_ne = Ti.UI.createButton(
	           			    {
	        					title: "Ne: "+ne+"%",        					
	        					width: ne+"%", 
	        					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	        					left: 0  					
							}
	    				);
	    				$.pogled.add(odgovor_ne);
    				}
    				if(nevem != 0)
    				{	
	    				var odgovor_nevem = Ti.UI.createButton(
	           			    {
	        					title: "Ne vem: "+nevem+"%",       					
	        					width: nevem+"%", 
	        					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	        					left: 0   					
	    					}
	    				);
	    				$.pogled.add(odgovor_nevem);
    				}					  	
    			};
    			$x=dol;
    		}			
		};
}
function nalozi_vprasanja_lastnik() 
{
	//naredimo nov httpcli objekt
	var client = Titanium.Network.createHTTPClient();
  
    	client.open("POST","http://oceni.fulba.com/prenesi_vprasanja_lastnik.php");
        var params = 
        {
        	id: predavanje
        };
         
        client.send(params);
        client.setTimeout( 9000 );
        client.onerror = function()
        {
        	alert("Problem z nalaganjem vprašanj. Poskusite kasneje");
        };
          
   		client.onload = function()
   		{   		
    		var response = JSON.parse(this.responseText);
       
       		if ( response.length == 0 || response.length == null)
       		{
        		//alert("Nimate vprašanj");
       		}
       		else
       		{
       			
		      	for (var i=$x;i<response.length;i++)
		          {
		          	$dolzina=response.length;
		          	$id_vprasanja=response[i].id;
		          	$vprasanje=response[i].vprasanje;
		          	
					graf($id_vprasanja,$vprasanje,$dolzina);												  	
				  };
				  						
			}			
		};
}
function nalozi_vprasanja(e) 
{
	//naredimo nov httpcli objekt
	var client = Titanium.Network.createHTTPClient();
  
    	client.open("POST","http://oceni.fulba.com/prenesi_vprasanja.php");
        var params = 
        {
        	id: predavanje
        };
         
        client.send(params);
        client.setTimeout( 9000 );
        client.onerror = function()
        {
        	alert("Problem z nalaganjem vprašanj. Poskusite kasneje");
        };
          
   		client.onload = function()
   		{   		
    		var response = JSON.parse(this.responseText);
       
       		if ( response.length == 0 || response.length == null)
       		{
        		//alert("Nimate vprašanj");
       		}
       		else
       		{
		      	for (var i=0;i<response.length;i++)
		          {
		          	$id_predavanja=response[i].id;
		          	var dialog = Ti.UI.createAlertDialog({
				    cancel: -1,
				    buttonNames: ['Ne vem', 'Da', 'Ne'],
				    message: response[i].vprasanje,
				    title: "Vprašanje:"
				  	});
				  	
				  	var ime = Ti.UI.createLabel(
					    {
							id: response[i].id,
							text: response[i].vprasanje,
							top: "30dp"    					
						});
					$.pogled.add(ime);
									  	
				  	dialog.addEventListener('click', function(e){
				    if (e.index == 0){				    	
				    	vnesi_odgovor(0);
						var odgovor = Ti.UI.createLabel(
					    {							
							text: 'Odgovor: Ne vem',
							top: "30dp"    					
						});
						$.pogled.add(odgovor);				      	
				    }
				    else if(e.index == 1){
				      	vnesi_odgovor(1);
  				      	var odgovor = Ti.UI.createLabel(
					    {							
							text: 'Odgovor: Da',
							top: "30dp"    					
						});
						$.pogled.add(odgovor);				      	
				    }
				    else if(e.index == 2){
				      	vnesi_odgovor(2);
  				      	var odgovor = Ti.UI.createLabel(
					    {
					    	text: 'Odgovor: Ne',
							top: "30dp"    					
						});
						$.pogled.add(odgovor);				      
				    }				    
				  	});  	
				   	dialog.show();
				};
				//$.pogled.add(meni);				
			}			
		};
}
function vnesi_odgovor(ex)
{
	//naredimo nov httpcli objekt
	var client = Titanium.Network.createHTTPClient();

    client.open("POST","http://oceni.fulba.com/dodaj_odgovor.php");
    var params = 
    {
        vprasanje_id : $id_predavanja, 
        username : Ti.App.Properties.getString('username'),
        odgovor : ex
    };    
    client.send(params);
     
    client.onerror = function()
    {
        alert("Napaka v omrežju. Prosimo poskusite kasneje.");
    };
    
	client.onload = function()
	{
		alert("Uspešno ste odgovorili na vprašanje.");
	};
}
