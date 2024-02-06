import { createRouter, createWebHistory } from "vue-router"
import { useAdminStore } from "../store/admin"

export const noAuthRoutes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Home",
      iconName: "home",
    },
  },
  {
    path: '/home/myservers',
    name: 'myservers',
    component: () => import('../views/MyServers.vue'),
    meta: {
      title: 'My Servers',
      iconName: 'server'
    }
  }
]

export const routes = [
  {
    path: "/home/maps",
    name: "maps",
    component: () => import("../views/Maps.vue"),
    meta: {
      menuItem: true,
      title: "Maps",
      iconName: "map",
      requiresRole: "maps",
    },
  },
  {
    path: "/home/maps/:id",
    name: "map",
    component: () => import("../views/MapEditor.vue"),
    meta: {
      requiresRole: "maps",
    },
  },
  {
    path: "/home/maps/create",
    name: "createmap",
    component: () => import("../views/MapEditor.vue"),
    meta: {
      requiresRole: "maps",
    },
  },
  {
    path: "/home/servers",
    name: "servers",
    component: () => import("../views/Servers.vue"),
    meta: {
      menuItem: true,
      title: "Servers",
      iconName: "server",
      requiresRole: "servers",
    },
  },
  {
    path: "/home/servers/create",
    name: "createserver",
    component: () => import("../views/ServerEditor.vue"),
    meta: {
      requiresRole: "servers",
    },
  },
  {
    path: "/home/servers/:id",
    name: "server",
    component: () => import("../views/ServerEditor.vue"),
    meta: {
      requiresRole: "servers",
    },
  },
  {
    path: "/home/bans",
    name: "bans",
    component: () => import("../views/Bans.vue"),
    meta: {
      menuItem: true,
      title: "Bans",
      iconName: "ban",
      requiresRole: "bans",
    },
  },
  {
    path: "/home/bans/create",
    name: "createban",
    component: () => import("../views/BanEditor.vue"),
    meta: {
      requiresRole: "bans",
    },
  },
  {
    path: "/home/bans/:id",
    name: "ban",
    component: () => import("../views/BanEditor.vue"),
    meta: {
      requiresRole: "bans",
    },
  },
  {
    path: "/home/bans/:id/details",
    name: "bandetails",
    component: () => import("../views/BanDetails.vue"),
    meta: {
      requiresRole: "bans",
    },
  },
  {
    path: "/home/admins",
    name: "admins",
    component: () => import("../views/Admins.vue"),
    meta: {
      menuItem: true,
      title: "Admins",
      iconName: "person",
      requiresRole: "admin",
    },
  },
  {
    path: "/home/admins/create",
    name: "createadmin",
    component: () => import("../views/AdminEditor.vue"),
    meta: {
      requiresRole: "admin",
    },
  },
  {
    path: "/home/admins/:steam_id",
    name: "admin",
    component: () => import("../views/AdminEditor.vue"),
    meta: {
      requiresRole: "admin",
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    ...noAuthRoutes,
    ...routes,
    {
      path: "/:catchAll(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
})

router.beforeEach(async (to) => {
  const adminStore = useAdminStore()
  try {
    // await adminStore.fetchRoles()
    if (to.meta.requiresRole && to.name !== "home") {
      const requiredRole = to.meta.requiresRole as string
      if (!adminStore.roles?.includes(requiredRole)) return { name: "home" }
    }
  } catch (error) {
    console.log(error)
  }
})

export default router
