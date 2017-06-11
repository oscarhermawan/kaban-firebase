<template>
  <div id="container">
    {{tasks.length}}
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

        <div class="card" v-for="task in backlog">
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
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item" @click="removeTask(task)">Delete</a>
          </footer>
        </div>
        <br>
      </div>
      <!-- AKHIR BACKLOG -->

      <!-- TODOS -->
      <div class="column is-one-quarter">
        <code>Todo</code>

        <div class="card" v-for="task in todo">
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
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item" @click="removeTask(task)">Delete</a>
          </footer>
        </div>
      </div>
      <!-- AKHIR TODOS -->

      <!-- DOING -->
      <div class="column is-one-quarter">
        <code>Doing</code>

        <div class="card" v-for="task in doing">
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
              {{ task.desc }}
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item" @click="removeTask(task)">Delete</a>
          </footer>
        </div>
      </div>
      <!-- AKHIR DOING -->

      <!-- DONE -->
      <div class="column is-one-quarter">
        <code>Done</code>

        <div class="card" v-for="task in done">
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
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item" @click="removeTask(task)">Delete</a>
          </footer>
        </div>
      </div>
      <!-- AKHIR DONE -->
    </div>


    <!-- LOGIN -->
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
    <!-- END LOGIN -->



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
      modalAddTask:'modal'
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
    },
    removeTask:function(task){
      tasksRef.child(task['.key']).remove()
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
