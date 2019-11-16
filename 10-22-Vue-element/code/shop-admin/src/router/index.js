import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'
import Powerlist from '@/components/power/Powerlist'
import Roles from '@/components/roles/Roles'
Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


let router= new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        { path: 'users', component: Users},
        { path: 'power', component: Powerlist},
        { path: 'roles', component: Roles}
      ]
    },
   
  ]
})
export default router
//导航卫士
router.beforeEach((to,from,next)=>{
  if(to.path=="/login"){
    next()
  }else{
    let token=localStorage.getItem("token");
    if(token){
      next()
    }else{
      next("/login")
    }
  }
})

