<template>
  <div id="container">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
          </a>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab">
            <figure class="image is-16x16" style="margin-right: 8px;">
              <img src="http://bulma.io/images/jgthms.png">
            </figure>
            Profile
          </a>
          <a class="nav-item is-tab" @click="openModalAdd">Add Back Log</a>
          <a class="nav-item is-tab">Log out</a>
        </div>
      </div>
    </nav>
    <br>
    <div class="columns is-multiline is-mobile">

      <!-- BACKLOG -->
      <div class="column is-one-quarter">
        <code>Back Log</code>

        <div v-for="task in backlog">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{task.title}}
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <i class="fa fa-angle-down"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{task.desc}}
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="editTask(task)">Edit</a>
              <a class="card-footer-item" @click="removeTask(task)">Delete</a>
            </footer>
          </div>
          <br>
        </div>
      </div>
      <!-- AKHIR BACKLOG -->

      <!-- TODOS -->
      <div class="column is-one-quarter">
        <code>Todo</code>
        <div v-for="task in todo">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{task.title}}
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <i class="fa fa-angle-down"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{task.desc}}
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="editTask(task)">Edit</a>
              <a class="card-footer-item" @click="removeTask(task)">Delete</a>
            </footer>
          </div>
          <br>
        </div>
      </div>
      <!-- AKHIR TODOS -->

      <!-- DOING -->
      <div class="column is-one-quarter">
        <code>Doing</code>

        <div v-for="task in doing">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{task.title}}
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <i class="fa fa-angle-down"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{task.desc}}
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="editTask(task)">Edit</a>
              <a class="card-footer-item" @click="removeTask(task)">Delete</a>
            </footer>
          </div>
          <br>
        </div>
      </div>
      <!-- AKHIR DOING -->

      <!-- DONE -->
      <div class="column is-one-quarter">
        <code>Done</code>

        <div v-for="task in done">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{task.title}}
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <i class="fa fa-angle-down"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{task.desc}}
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="editTask(task)">Edit</a>
              <a class="card-footer-item" @click="removeTask(task)">Delete</a>
            </footer>
          </div>
          <br>
        </div>
      </div>
      <!-- AKHIR DONE -->
    </div>


    <!-- MODAL ADD -->
    <div :class="modalAddTask">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Masuk</p>
          <button class="delete"></button>
        </header>
        <section class="modal-card-body">
            <input class="input" type="text" v-model="newTask.title" placeholder="Add a Title">
            <input class="input" type="text" v-model="newTask.desc" placeholder="Add a Description">
            <input class="input" type="text" v-model="newTask.status" placeholder="Add a Status">
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" name="button" @click="addTask"> Add Task </button>
          <a class="button" @click="closeModal">Cancel</a>
        </footer>
      </div>
    </div>
    <!-- END MODAL ADD-->

    <!-- MODAL EDIT -->
    <div :class="modalEditTask">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{editTaskData.id}}</p>
          <button class="delete"></button>
        </header>
        <footer class="modal-card-foot">
          <div v-if="editTaskData.status == 'backlog'">
            <button class="button" name="button" @click="closeModal"> Cancel </button>
            <button class="button is-warning" name="button" @click="editTugas('todo', editTaskData)"> Todo </button>
          </div>
          <div v-else-if="editTaskData.status == 'todo'">
            <button class="button is-danger" name="button" @click="editTugas('backlog', editTaskData)"> Back Log </button>
            <button class="button" name="button" @click="closeModal"> Cancel </button>
            <button class="button is-info" name="button" @click="editTugas('doing', editTaskData)"> Doing </button>
          </div>
          <div v-else-if="editTaskData.status == 'doing'">
            <button class="button is-warning" name="button" @click="editTugas('todo', editTaskData)"> Todo </button>
            <button class="button" name="button" @click="closeModal"> Cancel </button>
            <button class="button is-success" name="button" @click="editTugas('done', editTaskData)"> Done </button>
          </div>
          <div v-else>
            <button class="button" name="button" @click="closeModal"> Cancel </button>
            <button class="button is-info" name="button" @click="editTugas('doing', editTaskData)"> Doing </button>
          </div>
        </footer>
      </div>
    </div>
    <!-- END MODAL EDIT -->


  </div>
</template>

<script>
import firebase from 'firebase'

// import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDz_rA8ket0C_TzOwYpvDUbZFu21S9Wsf4",
    authDomain: "kanban-b36a1.firebaseapp.com",
    databaseURL: "https://kanban-b36a1.firebaseio.com",
    projectId: "kanban-b36a1",
    storageBucket: "kanban-b36a1.appspot.com",
    messagingSenderId: "1038303599786"
  };

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()
let tasksRef = db.ref('tasks')

export default{
  data () {
    return {
      newTask:{
        title:'',
        desc:'',
        status:''
      },
      modalAddTask:'modal',
      modalEditTask:'modal',
      editTaskData:{
        id:'',
        title:'',
        desc:'',
        status:''
      }
    }
  },
  firebase:{
    tasks:tasksRef
  },
  methods:{
    addTask:function(){
      console.log('masuk add task', this.newTask);
      tasksRef.push(this.newTask)
      this.modalAddTask='modal'
      this.newTask.title = ''
      this.newTask.desc = ''
      this.newTask.status = ''
    },
    openModalAdd:function(){
      this.modalAddTask='modal is-active'
    },
    closeModal:function(){
      this.modalAddTask='modal'
      this.modalEditTask='modal'
    },
    removeTask:function(task){
      tasksRef.child(task['.key']).remove()
    },
    editTask:function(task){
      console.log('masuk fungsi');
      this.editTaskData.id = task['.key']
      this.editTaskData.title = task.title
      this.editTaskData.desc = task.desc
      this.editTaskData.status = task.status

      if(task.status == 'backlog'){
        this.modalEditTask = 'modal is-active'
      } else if(task.status == 'todo'){
        this.modalEditTask = 'modal is-active'
      } else if(task.status == 'doing'){
        this.modalEditTask = 'modal is-active'
      } else if(task.status == 'done'){
        this.modalEditTask = 'modal is-active'
      }
    },
    editTugas:function(tugas, tasknya){
      // console.log(tugas);
      // console.log(tasknya);
      let editTask = {
        title:tasknya.title,
        desc:tasknya.desc,
        status:tugas
      }
      tasksRef.child(tasknya.id).update(editTask)
      this.modalEditTask='modal'
    }
  },
  computed:{
    backlog () {
      return this.tasks.filter((task) => task.status == 'backlog')
    },
    todo () {
      return this.tasks.filter((task) => task.status == 'todo')
    },
    doing () {
      return this.tasks.filter((task) => task.status == 'doing')
    },
    done () {
      return this.tasks.filter((task) => task.status == 'done')
    }
  }
}
</script>

<style scoped>
  #container{
    width:80%;
    margin:0 auto;
  }
</style>
