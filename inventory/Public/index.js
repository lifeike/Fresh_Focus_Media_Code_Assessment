$(function(){
	var products = {};	//declare a global object,store product info everytime
	products.discount_before_total = 0;	//declare total price as 0 
	var i = 0;	//global variable i as id of every added product

	//get current date
	var date = new Date();
	//set purchase date as current date
	$("#subscription_date").val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
	//page load initializtion,product category,and render page
	$.ajax({
		 type: "GET",						//request type
          url: "./server/index.php",			//request url
          dataType: "json",					//return json
          success: function(data){			//when request successful
          	//identify product category in html charset
          	var category = "<option value='0'>Choose a Category...</option>";
          	//loop result data
          	$.each(data,function(key,val){
          		//concatenate product category in html charset
          		category += "<option value='"+ val["category"] +"'>"+ val["category"] +"</option>";
          	});
          	//add category html charset into select
          	$("#category").html(category);
          }
	});
	//triggered when category change
	$("#category").change(function(){
		var category = $(this).val();				//get value of category
		var customer = $("#customer").val();		//get value of customer name
		var please = $("#please").val();			//get value of price and type
		
		if(customer == 0 || please == 0){			//check customer name and product price and pricing type is selected
			alert("please select customer and pricing type first！");		//alert when not selected
			$("#category").val("0");				//initialize product category
			return false;
		}
		//check product type is new one "select a category...."
		if(category == 0){
			//initialize part 、 product 、 price
			$("#part").html("<option value='0'>Choose a Part#...</option>");
			$("#product").html("<option value='0'>Choose a Product...</option>");
			$("#price").val("0");
			return false;
		}
		//asynchronous request part# data
		$.ajax({
			 type: "GET",
             url: "./server/index.php",
             dataType: "json",
             data: {						//request data in js format
             	"category" : category
             },
             success: function(data){
             	var part = "<option value='0'>Choose a Part#...</option>";
             	$.each(data,function(key,val){
             		part += "<option value='"+ val["part"] +"'>"+ val["part"] +"</option>";
             	});
             	$("#part").html(part);
             }
		});
	});

	//triggered when part# changed
	$("#part").change(function(){
		var category = $("#category").val();	//get value of category
		var part = $(this).val();				//get value of part#
		if(part == 0){
			$("#product").html("<option value='0'>Choose a Product...</option>");
			$("#price").val("0");
			return false;
		}
		$.ajax({
			 type: "GET",
             url: "./server/index.php",
             dataType: "json",
             data: {
             	"category"	: category,
             	"part"		: part
             },
             success: function(data){
             	// console.log(data);
             	var product = "<option value='0'>Choose a Product...</option>";
             	$.each(data,function(key,val){
             		product += "<option value='"+ val["name"] +"'>"+ val["name"] +"</option>";
             	});
             	$("#product").html(product);
             }
		});
	});

	$("#product").change(function(){
		var category = $("#category").val();
		var part = $("#part").val();
		var product = $(this).val();
		var please = $("#please").val();
		if(product == 0){
			$("#price").val("0");
			return false;
		}
		$.ajax({
			 type: "GET",
             url: "./server/index.php",
             dataType: "json",
             data: {
             	"category"	: category,
             	"part"		: part,
             	"product"	: product,
             	"please"	: please
             },
             success: function(data){
             	$.each(data,function(key,val){
             		$("#price").val(val[please]);
             	});
             }
		});
	});

	//btn_add click event
	$("#btn_add").click(function(){
		i++;	// id++
		var subscription_date = $("#subscription_date").val();	//purchase date
		var customer = $("#customer").val();	//customer name
		var please = $("#please").val();		//product pricing type
		var category = $("#category").val();	//product category
		var part = $("#part").val();			//product part#
		var product = $("#product").val();		//product name
		var price = $("#price").val();			//product price
		var quantity = $("#quantity").val();	//purchase quantity

		products.customer = customer;
		products.subscription_date = subscription_date;
		products.please = please;
		products.customer = customer;
		products.customer = customer;


		$("#discount_val").val("");
		$("#discount_after_total").val("");
		$("#gst").val("");
		$("#tax_price").val("");
		$("#total_price").val("");

		$.ajax({
			 type: "GET",
             url: "./server/index.php",
             dataType: "json",
             data: {
             	"category"	: category,
             	"part"		: part,
             	"product"	: product,
             	"please"	: please,
             	"quantity"	: quantity
             },
             success: function(data){
             	//check if enough quantity stored
             	if(data.length == 0){
             		alert("not enough in the storage, please re-enter!!")
             		i--;	// id--
             		return false;
             	}

             	//initialize category、part 、 product 、 price
             	$("#category").val("0");
				$("#part").html("<option value='0'>Choose a Part#...</option>");
				$("#product").html("<option value='0'>Choose a Product...</option>");
				$("#price").val("0");


             	products["product-" + i] = {};
             	//declare and concatenate location variable 
             	var location = "";
             	$.each(data,function(key,val){
             		location +=  "<option value='"+ val["location"] +"'>"+ val["location"] +"</option>";
             	});
             	$("#list").removeClass("hide");
             	//add new product to the current page
             	$("#list").append("<tr><td><input type='text' value='"+ product +"' disabled='disabled'></td><td><input type='text' value='"+ quantity +"' disabled='disabled'></td><td><input type='text' value='"+ price +"' disabled='disabled'></td><td><select style='width: 100%;' name='location' id='location-"+ i +"'>"+ location +"</select></td></tr>");
             	
             	//add new product to the "products" object 
             	products["product-" + i].product = product;		//product name
             	products["product-" + i].quantity = quantity;	//product quantity
             	products["product-" + i].price = price;			//product price

             	//sub-total before tax
				var sub_total = products["product-" + i].quantity * products["product-" + i].price;

				
				$("#sub_total").val(sub_total);
				//store sub-total into object
				products["product-" + i].sub_total = sub_total;
				console.log(products);


				// total before tax 
				var total_before_tax = products.discount_before_total + products["product-" + i].sub_total;
				$("#discount_before_total").val(total_before_tax);
				products.discount_before_total = total_before_tax;
             }
		});
		
		//discount price and total before tax
		$("#discount_val").keyup(function(){
			var discount_after_total = 0;	//single product price after discount
			var discount_before_total = 0;	//all products price anfter discount
			var discount_val = 0; //discount value 
			discount_val = $(this).val();	//discount value
			var discount_type = $("input[type='radio']:checked").val();
			if(discount_type == "%"){
				discount_after_total = products["product-" + i].sub_total - (products["product-" + i].sub_total * (discount_val/100));
			}
			if(discount_type == "$"){
				discount_after_total = products["product-" + i].sub_total - discount_val;
			}
			products["product-" + i].discount_after_total = discount_after_total;	//product price after discount 
			$("#discount_after_total").val(discount_after_total);

			//all products after discount
			for (var j = 1; j <= i; j++) {
				//check if discounted
				if(products["product-"+j].discount_after_total){
					discount_before_total += products["product-"+j].discount_after_total;
				}else{
					discount_before_total += products["product-"+j].sub_total;
				}
			}
			$("#discount_before_total").val(discount_before_total);
			products.discount_before_total = discount_before_total;
		});


		var tax_price = 0;	//declare tax value
		var total_price = 0; //total price
		$("#gst").keyup(function(){
			var gst = $(this).val();
			tax_price = products.discount_before_total * (gst/100);	//calcute tax
			$("#tax_price").val(tax_price);	//tax price
			products.tax_price = tax_price;

			total_price = products.discount_before_total + products.tax_price;	//calculat total
			$("#total_price").val(total_price); //calculate total
			products.total_price = total_price;
			console.log(products);
		});

		//ship date is not the day purchased usually
		var date = new Date();
		date.setDate(date.getDate() + 5);
		var ship_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		$("#ship_date").val(ship_date);

		return false;
	});
	$("#form").submit(function(){
		if($("#payment_type").val() == "0"){
			alert("payment method not selected yet !!");
			return false;
		}

		//calculate total discount 
		var sum_price = 0;
		var s = "";	// concatenate product information
		for (var j = 1; j <= i; j++) {
			//check if discounted
			if(products["product-"+j].discount_after_total){
				//accumulated discount in total
				sum_price += products["product-"+j].sub_total - products["product-"+j].discount_after_total;
				//concatenate all discounted product information
				s += " prodcut: " + products["product-"+j].product + " quantity: " + products["product-"+j].quantity + " price: " + products["product-"+j].discount_after_total + " discount: " + (products["product-"+j].sub_total - products["product-"+j].discount_after_total) + " location: " + $("#location-" + j).val() + "\n";
			}else{
				//concatenate all regular product information
				s += "product:" + products["product-"+j].product + " quantity:" + products["product-"+j].quantity + " price:" + products["product-"+j].sub_total + " discount:0" + " location:" + $("#location-" + j).val() + "\n";
			}
		}
		alert(
			"customer name:" + products.customer + " purchase date:" + products.subscription_date + " price type:" + products.please + "\n" + 
			s +
			"total before tax:" + products.discount_before_total + "\n" +
			"total tax:" + products.tax_price + "\n" +
			"payment method:" + $("#payment_type").val() + "\n" +
			"total price:" + products.total_price + "\n" +
			"ship date:" +  $('#ship_date').val() + "\n" +
			"created by:"+ $("#payment").val() + "\n" + 
			"comment:" + CKEDITOR.instances.textarea.document.$.body.innerText
			);
		//no refresh needed after submite return false
		// return false;
	});
	
});
