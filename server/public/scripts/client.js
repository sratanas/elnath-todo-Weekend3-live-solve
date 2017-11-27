console.log('client.js is loaded');

$(document).ready(function(){
    console.log('JQ');
    $('#newTaskButton').on('click', addNewTask);
    $('#taskList').on('click', '.completeButton', completeTask)
    getAllTasks();
    
})

function getAllTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response){ // for promises, we are replacing success with .then
        console.log('response', response);
        response.forEach(appendToDOM)
       
    })
    $('#taskList').empty();


}
function appendToDOM(taskObject){
    var $newListItem = $('<li></li>');
    $newListItem.append(taskObject.name)
    if (taskObject.is_complete){
        $newListItem.addClass('completed');
    } else{
        $newListItem.append('<button class = "completeButton">Complete</button>')     
    }
    $newListItem.data('id', taskObject.id) // added data to the list item,
    $('#taskList').append($newListItem);

}

function addNewTask(){
    var newTaskName = $("#newTaskName").val()
$.ajax ({
    method: 'POST',
    url: '/tasks',
    data:{
        name: newTaskName,
    }
}).then(function(response){
    console.log('response', response);
    $('#newTaskName').val('');
    getAllTasks();    
    
})
}

function completeTask(){
    var taskToComplete = $(this).parent().data().id;     //make sure to give it data, list item is the parent of this
    console.log('taskToComplete', taskToComplete);
    $.ajax({
        method: 'PUT',
        url: '/tasks/complete/' + taskToComplete,
    }).then(function(response){
        console.log('response', response);
        getAllTasks();   
    })
        
}

