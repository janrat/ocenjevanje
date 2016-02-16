var controls=require('controls');
// get main and menu view as objects
var menuView=controls.getMenuView();
//novo
// get config view as objects
var predavanjaView=controls.getPredavanjaView();

//add menu view to ConfigView exposed by widget
predavanjaView.menuButton.add(controls.getMenuButton({
                h: '60',
                w: '60'
            }));

//Minor changes to click event. Update the menuOpen status;
predavanjaView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget



// get config view as objects
var prijavaView=controls.getPrijavaView();

//add menu view to ConfigView exposed by widget
prijavaView.menuButton.add(controls.getMenuButton({
                h: '60',
                w: '60'
            }));

//Minor changes to click event. Update the menuOpen status;
prijavaView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

//novo
// get config view as objects
var dodajView=controls.getDodajView();

//add menu view to ConfigView exposed by widget
dodajView.menuButton.add(controls.getMenuButton({
                h: '60',
                w: '60'
            }));

//Minor changes to click event. Update the menuOpen status;
dodajView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

//novo
// get config view as objects
var urediView=controls.getUrediView();

//add menu view to ConfigView exposed by widget
urediView.menuButton.add(controls.getMenuButton({
                h: '60',
                w: '60'
            }));

//Minor changes to click event. Update the menuOpen status;
urediView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

$.drawermenu.init({
    menuview:menuView.getView(),
    mainview:predavanjaView.getView(),
    duration:200,
    parent: $.domov
});

//variable to controler de open/close slide
var activeView = 1;

// add event listener in this context
menuView.menuTable.addEventListener('click',function(e){
    $.drawermenu.showhidemenu();
    $.drawermenu.menuOpen = false; //update menuOpen status to prevent inconsistency.
    if(e.rowData.id==="row1"){
        if(activeView!=1){
        	var next = Alloy.createController('domov').getView();
			next.open();
			$.domov.close();
        	$.drawermenu.drawermainview.add(predavanjaView.getView());        	
            $.drawermenu.drawermainview.remove(prijavaView.getView());
             $.drawermenu.drawermainview.remove(dodajView.getView());
              $.drawermenu.drawermainview.remove(urediView.getView());               
            activeView = 1;
        } else {
            activeView = 1;
        }
    }
    if(e.rowData.id==="row2"){
        if(activeView!=2){        	
            $.drawermenu.drawermainview.add(prijavaView.getView());
            $.drawermenu.drawermainview.remove(predavanjaView.getView());
            $.drawermenu.drawermainview.remove(dodajView.getView());
            $.drawermenu.drawermainview.remove(urediView.getView()); 
            activeView = 2;
        } else{
            activeView = 2;
        }
    }
    if(e.rowData.id==="row3"){
        if(activeView!=3){
            $.drawermenu.drawermainview.add(dodajView.getView());
            $.drawermenu.drawermainview.remove(predavanjaView.getView());
            $.drawermenu.drawermainview.remove(prijavaView.getView());
            $.drawermenu.drawermainview.remove(urediView.getView()); 
            activeView = 3;
        } else{
            activeView = 3;
        }
    }
    if(e.rowData.id==="row4"){
        if(activeView!=4){
        	
            $.drawermenu.drawermainview.add(urediView.getView());
            $.drawermenu.drawermainview.remove(predavanjaView.getView());
            $.drawermenu.drawermainview.remove(prijavaView.getView());
            $.drawermenu.drawermainview.remove(dodajView.getView());
            activeView = 4;            
        } else{
            activeView = 4;
        }
    }
    if(e.rowData.id==="row5"){
       	Ti.App.Properties.removeProperty('username');
	
	var next = Alloy.createController('index').getView();
	next.open();
	$.domov.close();
    }
    
    // on Android the event is received by the label, so watch out!
    Ti.API.info(e.rowData.id); 
});

$.domov.open();
