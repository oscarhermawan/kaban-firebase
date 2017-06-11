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
          <a class="nav-item is-tab">Add Back Log</a>
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
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
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
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
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
              {{task.desc}}
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
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
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
      <!-- AKHIR DONE -->
    </div>

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
let tasks = db.ref('tasks')

export default{
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  firebase:{
    tasks:tasks
  },
  methods:{

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
