<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app fixed>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Monitoring dashboard</v-list-item-title>
          <v-list-item-subtitle>views & settings</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.name" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="blue darken-3" :clipped-left="$vuetify.breakpoint.lgAndUp" dark app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">ARGOS</v-toolbar-title>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data: () => ({
    drawer: null,
    items: [
      {
        name: "Single",
        icon: "mdi-chart-bell-curve-cumulative",
        link: "/single"
      },
      {
        name: "Multiple",
        icon: "mdi-chart-multiple",
        link: "/multiple"
      },
      {
        name: "All",
        icon: "mdi-chart-line-stacked",
        link: "/all"
      }
    ]
  })
};
</script>