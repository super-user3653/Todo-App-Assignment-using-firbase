var list = document.getElementById("list");
getfire()

function addTodo(){
   var todo_item = document.getElementById("todo-item");
   var li = document.createElement('li');
   var litext = document.createTextNode(todo_item.value);
   var delBtn = document.createElement("button");
   var delText = document.createTextNode("DELETE");
   var editBtn = document.createElement("button");
   var aditText = document.createTextNode("EDIT");
   var litext2 = todo_item.value;
   li.appendChild(litext);
   delBtn.appendChild(delText);
   delBtn.setAttribute("class", "delbtn")
   delBtn.setAttribute("onclick", "deleteItem(this)")
   editBtn.appendChild(aditText);
   editBtn.setAttribute("class", "editbtn")
   editBtn.setAttribute("onclick", "editItem(this)")
   li.appendChild(delBtn);
   li.appendChild(editBtn);
   list.appendChild(li);
   todo_item.value = "";
   var key = firebase.database().ref("student").push().key
   var task = {
    name: litext2
   }
   delBtn.setAttribute("id", key)
   editBtn.setAttribute("id", key)
   firebase.database().ref('student/' + key).set(task)
}



function deleteItem(e) {
    e.parentNode.remove();
    var x = e.id;
    console.log(x)
    firebase.database().ref("student/" + x).remove()
}




function delall() {
    list.innerHTML = "";
    firebase.database().ref("student/").remove(null)
}



function editItem(e) {
    var val = e.parentNode.firstChild.nodeValue;
    var edittext = prompt("Enter value", val);
    e.parentNode.firstChild.nodeValue = edittext;
    var x = e.id
    firebase.database().ref("student/" + x).set({
        name: edittext
    })
}



function getfire(){
    firebase.database().ref("student").once("value",function(data){
        var datar = data.val()
        var keys = Object.keys(datar)
        for(var i = 0; i<keys.length; i++){
            var k = keys[i]

var todo_item = document.getElementById("todo-item");
var li = document.createElement('li');
var litext = document.createTextNode(datar[k].name);
var delBtn = document.createElement("button");
var delText = document.createTextNode("DELETE");
var editBtn = document.createElement("button");
var aditText = document.createTextNode("EDIT");
var litext2 = todo_item.value;
li.appendChild(litext);
delBtn.appendChild(delText);
delBtn.setAttribute("class", "delbtn")
delBtn.setAttribute("onclick", "deleteItem(this)")
editBtn.appendChild(aditText);
editBtn.setAttribute("class", "editbtn")
editBtn.setAttribute("onclick", "editItem(this)")
li.appendChild(delBtn);
li.appendChild(editBtn);
list.appendChild(li);

delBtn.setAttribute("id", k)
editBtn.setAttribute("id", k)

}
}
)

}