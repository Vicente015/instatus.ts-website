<template>
  <footer>
    <container>
      <strong>
        <router-link to="/">instatus.ts</router-link>
      </strong>
      <p>Library to interact with the Instatus API</p>
      <a class="icon-link" href="https://github.com/Vicente015/instatus.ts">
        <i class="fab fa-github"></i>
      </a>
      <a class="icon-link" href="https://npmjs.org/package/instatus.ts">
        <i class="fab fa-npm"></i>
      </a>
      <a class="icon-link" href="https://yarn.pm/instatus.ts">
        <i class="fab fa-yarn"></i>
      </a>
      <stats/>
      <a href id="dark-mode-link" @click="toggleDarkMode">
        <em class="fa" :class="darkMode ? 'fa-sun' : 'fa-moon'"></em>
        Turn {{ darkMode ? 'on' : 'off' }} the lights
      </a>
    </container>
  </footer>
</template>

<script>
import Stats from './Stats.vue';

export default {
  name: 'AppFooter',
  props: ['darkMode'],
  components: {
    Stats,
  },

  methods: {
    toggleDarkMode(event) {
      this.$emit('toggleDarkMode');
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theming";

footer {
  padding: 3rem;
  background: $color-navbar-bg;
  color: $color-footer-text;

  a {
    text-decoration: none;
    color: $color-footer-text;
  }

  a:hover {
    color: lighten($color-footer-text, 10%);
  }

  .container {
    text-align: center;
  }

  .icon-link {
    margin: 5px;
  }

  .stats {
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
      padding-left: 0.3em;

      &:not(:last-child):after {
        content: ",";
      }
    }
  }
}

#dark-mode-link {
  display: inline-block;
  padding: 8px 6px;
  border-radius: 4px;
  background: $color-primary;
  color: white;
  font-size: 0.9rem;

  &:hover {
    background: lighten($color-primary, 10%);
  }
}
</style>
