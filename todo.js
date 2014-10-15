$(document).ready(function() {

	Storage.prototype.setArray = function(key, obj) {
	    return this.setItem(key, JSON.stringify(obj))
	}
	Storage.prototype.getArray = function(key) {
	    return JSON.parse(this.getItem(key))
	}

	var domBeforeTaskPrefix = '<li class="task';
	var domBeforeTaskSuffix = '">' +
									'<div class="check-button">√</div>' + ' ' +
										'<div class="description">';
	var status = "";									

	var domBeforeTask = domBeforeTaskPrefix + status + domBeforeTaskSuffix;

	var taskAfter = 					'</div>' + ' ' +
										'<div class="delete-button-button">×</div>' + 
									'</li>';


	var taskList = localStorage.getArray("tasks") || new Array() ;

	for (var i = 0; i < taskList.length; i++) {
		if (taskList[i].status === "new") {
			status=" ";
			domBeforeTask = domBeforeTaskPrefix + status + domBeforeTaskSuffix;
			var element = domBeforeTask +  taskList[i].description + taskAfter;
			$(".task-list").append(element);
		}
		else if(taskList[i].status === "checked") {
			status = " completed";
			domBeforeTask = domBeforeTaskPrefix + status + domBeforeTaskSuffix;
			var element = domBeforeTask +  taskList[i].description + taskAfter;
			$(".task-list").append(element);
		}
	}

	$('.task-input').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			if ($(this).val() === "") {
				return false;
			}
			var newTask = $(this).val();
			taskList.push({"description":newTask, "status": "new"});
			localStorage.setArray("tasks", taskList);
			var element = domBeforeTask + newTask + taskAfter;
			$(".task-list").append(element);
			$(this).val('');
		}
	});  

	$(document).on('click', '.check-button', function() {
		$(this).parent().addClass("completed");
		var taskToComplete = $(this).parent().children(".description").text();
		for (var i = 0; i < taskList.length; i++) {
			if(taskList[i].description === taskToComplete) {
				taskList[i].status = "checked";
			}
		};
		localStorage.setArray("tasks", taskList);
	});

	$(document).on('click', '.delete-button-button', function() {
		$(this).parent().remove();
		var taskToDelete = $(this).parent().children(".description").text();
		for (var i = 0; i < taskList.length; i++) {
			if(taskList[i].description === taskToDelete) {
				taskList.splice(i,1);
			}
		};
		localStorage.setArray("tasks", taskList);
	});

	$(".task-list").sortable();
});