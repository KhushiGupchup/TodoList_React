# TodoList_React

https://todolist-with-mernstack.netlify.app/


Here I created a todo list using MERN stack.
for backend i used NodeJs,Express.
for database i used mongodb atlas
for frontend i used React.

so first backend:
Here I created 4 routes .
  1.to get the task:GET API is used
  2.to add the task:POST API is used
  3.to update the task:PUT API is used
  4.to delete the task:DELETE API is used.
In this controller has all the logic of how the api is working.
In this models the schema of task is used taskname,status,startdate,enddate with timestamps is also included.

Frontend:
1.here the form is design to take the taskname,startname,enddate,status and then add api is called using axios.
2.the todolist is shown on the left with GET api is called and show all tasks which is already present as well the new added one.
3.edit icon will open the editmodal where taskname and the status can be updated and then it reflects in the list as well.
4.delete icon will open the delete modal where it will first ask to confirm whether are you sure if delete then it deleted from list as well the database.
5.info icon where if too big taskname is their then here the full task which was truncate in the list will be shown .



