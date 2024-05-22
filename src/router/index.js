import { createRouter, createWebHistory } 
from "vue-router"; 
const router = createRouter(
    {  
        history: createWebHistory(""), 
        routes: [    
            {      
                path: "/",      
                name: "main",      
                component: () => import("../components/MainPage.vue"),    
            },   
            {      
                path: "/login",      
                name: "login",      
                component: () => import("../components/LoginPage.vue"),    
            }, 
            {      
                path: "/signup",      
                name: "signup",      
                component: () => import("../components/SignupPage.vue"),    
            }, 
            {      
                path: "/map",      
                name: "map",      
                component: () => import("../components/MapPage.vue"),    
            }, 
        ],
    }
);
 
export default router;