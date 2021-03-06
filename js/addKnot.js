
$(document).ready(function() {

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('.modal-trigger').leanModal();
    //var seedData = '<article class="knotMember" data-knots="[13,20,6]" data-goal="15"><h3>Read for fun<br><small>with Mike</small></h3><span class="days">47 days left</span><section class="memberDetail" style="display: none;"><input type="range" class="logSlider" min="0/" max="9"><div class="rangeVal">1</div> <button class="logConfirm">ok</button></section><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:13%; left:0%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:20%; left:13%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:6%; left:33%"></div></article><article class="knotMember" data-knots="[20,40]" data-goal="5"><h3>Swim<br><small>with Wending</small></h3><span class="days">47 days left</span><section class="memberDetail" style="display: none;"><input type="range" class="logSlider" min="0/" max="2"><div class="rangeVal">2</div> <button class="logConfirm">ok</button></section><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:20%; left:0%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:40%; left:20%"></div></article><article class="knotMember" data-knots="[15,30,15,5,20]" data-goal="20"><h3>Morning Run<br><small>with John</small></h3><span class="days">33 days left</span><section class="memberDetail" style="display: block;"><input type="range" class="logSlider" min="0/" max="3"><div class="rangeVal">4</div> <button class="logConfirm">ok</button></section><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:15%; left:0%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:30%; left:15%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:15%; left:45%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:5%; left:60%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:20%; left:65%"></div></article>';
	var orig = localStorage.getItem("knots");
    //if(!orig) localStorage.setItem("knots", seedData);

 //    var seedData= '<article class="knotMember" data-knots="[13,20,6]" data-goal="15"><h3>Read for fun<br><small>with Mike</small></h3><span class="days">47 days left</span><section class="memberDetail" style="display: none;"><input type="range" class="logSlider" min="0/" max="9"><div class="rangeVal">1</div> <button class="logConfirm">ok</button></section><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:13%; left:0%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:20%; left:13%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:6%; left:33%"></div></article><article class="knotMember" data-knots="[20,40]" data-goal="5"><h3>Swim<br><small>with Wending</small></h3><span class="days">47 days left</span><section class="memberDetail" style="display: none;"><input type="range" class="logSlider" min="0/" max="2"><div class="rangeVal">2</div> <button class="logConfirm">ok</button></section><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:20%; left:0%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:40%; left:20%"></div></article><article class="knotMember" data-knots="[15,30,15,5,20]" data-goal="20"><h3>Morning Run<br><small>with John</small></h3><span class="days">33 days left</span><section class="memberDetail" style="display: block;"><input type="range" class="logSlider" min="0/" max="3"><div class="rangeVal">4</div> <button class="logConfirm">ok</button></section><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:15%; left:0%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:30%; left:15%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:15%; left:45%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#27ae60; width:5%; left:60%"></div><div class="colorBlocks" style="position:absolute; height:100%; top: 0; background:#2980b9; width:20%; left:65%"></div></article>';
	// var orig = sessionStorage.getItem("knots");
 //    if(!orig) sessionStorage.setItem("knots", seedData);

    initBoard();
    function generateOneBlock(width, offset, isGreen) {
        var color = "#27ae60";
        if(!isGreen) color = "#2980b9";
        var returnStr = "<div class='colorBlocks' ";
        returnStr += " style = 'position:absolute; height:100%; top: 0; background:" + color + "; width:" + width + "%; left:" + offset + "%'";
        returnStr += "></div>";
        return returnStr;
    }
    function backup() {
        var cur = $("#knots").html();
        localStorage.setItem("knots", cur);
    }
    function restore() {
        
        var knotHTML = localStorage.getItem("knots");
        if(knotHTML != "") $("#knots").html(knotHTML);
    }
    function generateGrayBlock(width, offset){
        var color = "#95a5a6"
        var ret = "<div class='grayBlock' ";
        ret += " style= 'position: absolute; height: 100%; top: 0; background: " + color + "; width:" + width + "%; left:" + offset + "%'";
        ret += "></div>";
        return{
            color: "#95a5a6",
            width: "" + width + "%",
            offset: "" + offset+"%",
            firstString: ret
        };
        // return ret;
    }

    function daysLeft(enddate) {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date();
        var secondDate = new Date(enddate);

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    }
    function addBarsToKnot(knot) {
        $(knot).find('.colorBlocks').remove();
        var percentages = $(knot).data("knots");
        var offset = 0;
        for(var i = 0; i < percentages.length; i++) {
            var curPercent = percentages[i];
            var blockToAdd = generateOneBlock(curPercent,offset,i%2==1);
            $(knot).append(blockToAdd);
            offset += curPercent;
        }
    }
	function constructKnotMember(partner, title, goal, enddate) {
		var returnStr = "<article class='knotMember' data-blue='0', data-green='0' data-goal='"+ goal +"'>";
		returnStr += "<h3>" + title + "<BR><small>with " + partner + "</small></h3>";
        //returnStr += "<span class='days'>" + daysLeft(enddate) + " days left</span>";
		//returnStr += "<div class='encourage'><span class='fa fa-child fa-3x encourageIcon'></span></div>"
        returnStr += "<section class='memberDetail'>";
        returnStr += "<p class='range-field'><input type='range' class='logSlider' min=0/><p>";
        returnStr += "<div class='rangeVal'>0</div>";
        returnStr += " <button class='logConfirm waves-effect waves-light btn'>ok</button>"
        returnStr += "</section>";
        // returnStr += "<div class='test'></div>";
        // returnStr += "<div class='test2'></div>";
        // returnStr += "<div class='test3'></div>";
        returnStr += "</article>";
		return returnStr;
	}

    function createMiddleBlock(knot){   
        var grayBlock = generateGrayBlock(100, 0);
        $(knot).append(grayBlock.firstString);
    }
    function adjustMiddleGrayBar(knot, width, offset, oldGreen) {
        var greyBar = $(knot).children(".grayBlock");
        //first illustrate user input
        $(knot).attr("data-blue", offset);
        $(greyBar).css({"width" : width + "%"});
        $(greyBar).animate({
            "left" : offset + "%"
            
        },1000);
        //then illustrate "faked" animation

        var newgreen = oldGreen + Math.floor(Math.random() * 30 + 2);

        $(knot).attr("data-green", newgreen);
        $(greyBar).stop(true,true).delay(4000).animate({
            "width" : 100 - newgreen - offset + "%"
        },1000, backup);
    }
    function updateSlider(knot) {
        var percentages = $(knot).data("blue") + $(knot).data("green");
        var sum = 0;
        var goal = $(knot).data("goal");
        var max = Math.floor(goal - (goal * (sum/100)));
        $(knot).find('.logSlider').attr('max', max);
    }
    $("#knots").on("change", ".logSlider", function() {
        var newVal = $(this).val();
        $(this).closest(".knotMember").find('.rangeVal').html(newVal);
        
    });
	function getKnotString() {
		var partner = $("#partnerIn").val();
		var title = $("#titleIn").val();
		var goal = $("#goalIn").val();
		var enddate = $("#enddateIn").val();
		return constructKnotMember(partner,title,goal,enddate);
	}
    function addPlaceHolders(numKnots) {
        $(".placeholder").remove();
        var numPlaceholders = 5 - numKnots - $('.placeholder').length;
        var placeholderString = "<div class='placeholder'><a href='#' class='addKnotText addKnot'>+ Add Knot</a></div>";
    
        for(var i = 1; i <= numPlaceholders; i++) {
            $("#knots").append(placeholderString);
        }
        
    }
    
    function initBoard() {
        var currentKnots = localStorage.getItem("knots");
        $("#knots").html(currentKnots);
        var numberOfKnots = $(".knotMember").length;
        addPlaceHolders(numberOfKnots);
        restore();
    }
	function updateContentPane(isNewLog) {
		var currentKnots = localStorage.getItem("knots");
		$("#knots").html(currentKnots);
	    $(".knotMember").each(function() {
            // addBarsToKnot(this);
            //createMiddleBlock(this, isNewLog);
            updateSlider(this);
            $(this).find(".memberDetail").slideUp();
        });
        var numberOfKnots = $(".knotMember").length;
        addPlaceHolders(numberOfKnots);

    }
    $("#knots").on("click", ".addKnot",function(e){
        $('#modal1').openModal();
    });
    $("#knots").on("click", ".addKnot",function(e){
    	//var formStr = "<section class='row' id='addForm'><h2>Add New Knot</h2><a id='hideAddPane' href='#'>hide</a><form class='col s12'><div class='row'> <div class='input-field col s6'> <input id='partnerIn' type='text'></input><label for='partnerIn'>Partner</label></div><div class='input-field col s6'> <input id='titleIn' type='text'></input><label for='titleIn'>Activity</label></div></div> <div class='input-field col s12'><input id='goalIn' type='text'></input><label for='goalIn'>Target Quantity</label> </div><div class='input-field col s12'><input id='enddateIn' type='date' class='datepicker'></input><label for='enddateIn'>End Date</label></div> <button id='addBtn'> add </button></form></section>";
        e.preventDefault();
        //$(this).closest("#addKnotPane").append(formStr);
        $("#addForm").slideDown();
        // $(this).remove();
    });
    $("#addKnotPane").on("click", "#hideAddPane", function(e) {
    	var buttonStr = "<a href=''><button class='addKnot'> <i class='fa fa-plus-circle'></i> Add Knot</button></a>";
    	e.preventDefault();
    	$(this).closest("#addKnotPane").append(buttonStr);
    	$("#addForm").slideUp();
    });
    function addNewKnot(knotStr) {
        var ap = $(knotStr);
        $("#knots").prepend(ap)
        return ap;
    }
    
    $("#contentPane").on("click", "#addBtn", function(e) {
    	e.preventDefault();
    	var newKnotString = getKnotString();
    	var allKnots = localStorage.getItem("knots");
    	localStorage.setItem("knots", newKnotString + allKnots);
    	//updateContentPane(false);
        var newKnot = addNewKnot(newKnotString);
        var numberOfKnots = $(".knotMember").length;
        addPlaceHolders(numberOfKnots);
        createMiddleBlock(newKnot);
        backup();
        //var buttonStr = "<a href=''><button class='addKnot'> <i class='fa fa-plus-circle'></i> Add Knot</button></a>";
        //e.preventDefault();
        //$(this).closest("#addKnotPane").append(buttonStr);
        $('#modal1').closeModal();
    });
    $("#knots").on("click", ".encourageIcon", function(e) {
        alert("Sent encouragement!");
    });
    $("#knots").on("click", ".logConfirm", function(e) {
        e.stopPropagation();
        var knot = $(this).closest(".knotMember");
        var goal = knot.data('goal');
        var newVal = knot.find(".rangeVal").html();
        var newAsPercent = Math.floor(newVal/goal * 100);

        var bluePercentage = parseFloat(knot.attr('data-blue'));
        var greenPercentage = parseFloat(knot.attr('data-green'));
        $(knot).attr("data-blue", ""+(bluePercentage+newAsPercent));
        bluePercentage = parseFloat(knot.attr('data-blue'));
        //$(knot).data("blue", (bluePercentage+newAsPercent));
        updateSlider(knot);
        // addBarsToKnot(knot);
        
        adjustMiddleGrayBar(knot, 100-bluePercentage-greenPercentage,bluePercentage, greenPercentage);
        backup();
        $(this).closest(".knotMember").find(".memberDetail").slideUp();
        //updateContentPane(false);
    });
    $("#knots").on("click", ".knotMember", function(e) {
        e.preventDefault();
            $(this).find(".memberDetail").slideDown();

    });
    $("#notifs").on("click", function(e) {
        $("#notifCenter").slideToggle();
    });
    
});