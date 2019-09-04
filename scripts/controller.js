$(document).ready(function () {
	$("button").attr("disabled", true)
	$("#btnConnect").attr("disabled", false)
	$("input").attr("disabled", true)
	$("#brokerAddress").attr("disabled", false)
	$("#btnConnect").click(function () {
		let address = $("#brokerAddress").val()
		client = mqtt.connect(address)
		$("#status").text("Connecting.....")
		$("#status").css("color", "rgb(230, 230, 0)")
		client.on("connect", function () {
			$("button").attr("disabled", false)
			$("input").attr("disabled", false)
			$("#status").css("color", "green")
			$("#status").text("Successfully connected!");
		});
		client.on("message", function (topic, payload) {
			let getTopic = topic.toString().slice(5);
			var stamp = new Date($.now());
			$("#tbodyContainer").append($("<tr><th>" + getTopic + "</th><td>" + payload + "</td><td>" + stamp.toString().slice(0, 24) + "</td></tr>"));
		});
	});
	$("#btnDisconnect").click(function () {
		client.end();
		$("#status").css("color", "red")
		$("#status").text("Disconnected!")
		$("button").attr("disabled", true)
		$("#btnConnect").attr("disabled", false)
		$("input").attr("disabled", true)
		$("#brokerAddress").attr("disabled", false)
	});
	$("#btnSubscribe").click(function () {
		let topicSubs = "mqtt/" + $("#topicToSubscribe").val();
		client.subscribe(topicSubs);
	});
	$("#btnPublish").click(function () {
		client.publish("mqtt/" + $("#topicToPublish").val(), $("#payloadToPublish").val());
	});
	$("#btnUnsubscribe").click(function () {
		client.unsubscribe("mqtt/" + $("#topicToSubscribe").val());
	});
});