// Get data via api
 function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}
var url = "https://api.usmart.io/org/ae1d5c14-c392-4c3f-9705-537427eeb413/4b75f14b-ce71-4121-b522-2b5327ef5ba9/1/urql";
var country_data = httpGet(url);

// Get fire types to create selection box to allow user to select fire type
var fire_types = Object.keys(country_data[0]).splice(1, 14);

createFireSelectionBox(fire_types);

// set the default selected fire type
var selected_fire_type = fire_types[0];
var selected_button = null;

function createFireSelectionBox(fire_types){

	fire_types.forEach( (fire_type) => {
		var b = document.createElement("button");
		var li = document.createElement("li");

		b.textContent = fire_type;
		b.onclick = () => { 
			if(selected_button != null){
				selected_button.classList.remove('selected_button');
			}
			selected_fire_type = fire_type; 
			b.classList.add('selected_button');
			selected_button = b;
		}
		li.appendChild(b);
		document.getElementById("fire_selector").appendChild(li);
});
}

	var counties =	{
		"IRL1444": "Waterford", 
		"IRL3412": "Monaghan", 
		"IRL5568": "Galway", 
		"IRL5569": "Cork", 
		"IRL5570": "Limerick", 
		"IRL5571": "Waterford", 
		"IRL5572": "Tipperary", 
		"IRL5573": "Dublin", 
		"IRL5574": "Fingal", 
		"IRL5575": "Dublin", 
		"IRL5576": "Dublin", 
		"IRL712": "Louth", 
		"IRL713": "Galway", 
		"IRL714": "Mayo", 
		"IRL715": "Meath", 
		"IRL716": "Offaly", 
		"IRL717": "Westmeath", 
		"IRL718": "Wexford", 
		"IRL719": "Wicklow", 
		"IRL721": "Kildare", 
		"IRL722": "Kilkenny", 
		"IRL723": "Laois", 
		"IRL724": "Tipperary", 
		"IRL725": "Kerry", 
		"IRL726": "Limerick", 
		"IRL727": "Roscommon", 
		"IRL728": "Sligo", 
		"IRL729": "Donegal", 
		"IRL730": "Leitrim", 
		"IRL731": "Longford", 
		"IRL76": "Clare", 
		"IRL77": "Carlow", 
		"IRL78": "Cork", 
		"IRL79": "Cavan"
	}
	
	var paths = document.querySelectorAll("path");
	for (var i = 0 ; i < paths.length; i++) {
		this.addEventListener('mousemove' , displayData);
}
	
function displayData(e){
    if(typeof counties[e.target.id] != "undefined"){
        //console.log(counties[e.target.id]);
        //console.log("X: %s Y: %s", e.x, e.y+1000);

        var d = document.getElementById('box');
        d.style.position = "absolute";
        d.style.left = e.clientX + 10 + "px";
		d.style.top = e.clientY + 20 + "px";
		console.log("X: %s Y: %s", e.clientX, e.clientY+100);
        d.classList.add("box-visible");
        
        var county = {};
        for (var i = 0; i < country_data.length; i++) {
            if(country_data[i].County.includes(counties[e.target.id])){
                county = country_data[i];
                break;
            }
        }
        document.querySelector('#county_name').innerHTML = county.County;

        var fire_amount = document.querySelector('#fire_amount');
        fire_amount.innerHTML = selected_fire_type + ": " + county[selected_fire_type];
    }
}
 