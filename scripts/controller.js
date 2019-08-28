$(document).ready(function () {
	var rownum = 0;
	$("#btnConnect").click(function(){
		let address = $("#brokerAddress").val()
		client = mqtt.connect(address)
		
		$("#status").val("Connecting.....")

		client.on("connect", function(){
			$("#status").val("Successfully connected!");
		    console.log("Successfully connected");
		})

		client.on("message", function (topic, payload) {
		  	console.log([topic, payload].join(": "));
		  	let getTopic = topic.toString().slice(7);
		  	//console.log("lalal :" + getTopic.slice(7));
		  	var stamp = new Date($.now());
		  	let parent = $("#tbodyContainer");
			let row = $("<tr></tr>");
			let top = $("<th></th>").text(getTopic);
			let payld = $("<td></td>").text(payload);
			let time = $("<td></td>").text(stamp.toString().slice(0,24));

			top.attr("scope", "row");
			row.attr("id", rownum);

			parent.append(row);
			$("#" + rownum).append(top, payld, time);
			rownum += 1;
		})

		
	});

	$("#btnSubscribe").click(function(){
		let topicSubs = "redgie/" + $("#topicToSubscribe").val();
		client.subscribe(topicSubs);
		console.log("btnSubscribe is click " + topicSubs);
	});

	$("#btnPublish").click(function(){
		let top = "redgie/" + $("#topicToPublish").val();
		let payld = $("#payloadToPublish").val();
		client.publish(top, payld);
		console.log("btnPublish is click " + top);
	});
});



