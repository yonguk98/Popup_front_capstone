import { createRouter, createWebHistory } 
from "vue-router"; 
const router = createRouter(
    {  
        history: createWebHistory(""), 
        routes: [     
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
                path: "/",      
                name: "map",      
                component: () => import("../components/MapPage3.vue"),    
            },
            {      
                path: "/admin",      
                name: "admin",      
                component: () => import("../components/AdminPage.vue"),    
            }, 
        ],
    }
);
 
export default router;