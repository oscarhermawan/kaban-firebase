import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Maincomponent from '@/components/Maincomponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Maincomponent
    }
  ]
})
