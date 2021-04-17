<template>
  <div id="home">
    <slide id="jumbotron">
      <Logo />
      <br>
      <br>
      <br>
      <div class="cli-command">
        <code>{{ yarn ? 'yarn add' : 'npm i' }} {{ showDevCommand ? (yarn ? `ssh://github.com/${repo}#main` : `${repo}#main`) : 'instatus.ts' }}</code>
        <em v-on:click="copy" class="fa fa-clipboard"></em>
      </div>
      <div class="below-command">
        <span v-on:click="toggleDev">{{ showDevCommand ? 'stable' : 'main' }}</span>
        <span v-on:click="toggleYarn">{{ yarn ? 'npm' : 'yarn' }}</span>
      </div>
      <br>
    </slide>

    <section id="info">
      <div class="info-item">
        <h2>About</h2>
        <p>Instatus.ts is a <a href="https://nodejs.org">Node.JS</a> library to interact with the <a href="https://instatus.com/help/api">Instatus API</a>.</p>
      </div>

      <div class="info-item">
        <h2>Example</h2>
        <pre><code class="javascript" v-hljs>const { InstatusClient } = require('instatus.ts')

  // Create a client to interact with the Instatus
  const Instatus = new InstatusClient({
    key: 'YOUR_API_KEY', // You can get it in https://instatus.com/app/developer
    pageID: 'PAGE_ID' // You can get it with client.pages.get(), default to the first page
  })

  // Instatus.pages Returns the information of the page that you have provided in the options or the first one you have, from here you can interact with your page

  // Gets the website component ID to interact with it
  let websiteComponent = Instatus.pages.components.getAll().then(components => {
    // Components returns an array, find the component on it
    let websiteComponent = components.find(c => c.name == 'Website')

    // Add an incident that affects that component
    Instatus.pages.incidents.add({
      name: 'Website down', // Incident title
      message: 'The website is down, we are investigating it', // Incident description
      components: [websiteComponent], // Affecting components
      started: Date.now(), // The current date
      status: 'INVESTIGATING', // The incident status
      notify: true, // Notify the users
      statuses: [ // Status of the affected components
        {
          id: websiteComponent,
          status: 'PARTIALOUTAGE' // Status of the component
        }
      ]
    })
  })</code></pre>
      </div>

      <div class="info-item">
        <h2>Features</h2>
        <p>
          <ul>
            <li>Written in TypeScript.</li>
            <li>Object-oriented.</li>
          </ul>
        </p>
      </div>

      <div class="info-item">
        <h2>Statistics</h2>
        <p>
          <stats show-as-cards="true"/>
        </p>
        <p class="center">...and growing!</p>
      </div>

      <div class="full-info-item">
        <router-link to="/docs" class="big-ass-btn">Get started</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Stats from '../Stats.vue';
import Logo from '../Logo.vue';
import MainSource from '../../data/MainSource';

export default {
  name: 'home',
  props: ['konami'],
  components: {
    Stats,
    Logo,
  },

  mounted() {
    this.$emit('setRepository', MainSource.repo);
  },

  data() {
    return {
      showDevCommand: false,
      yarn: false,
      repo: MainSource.repo,
    };
  },

  methods: {
    copy() {
      window.getSelection().removeAllRanges();
      let range = document.createRange();
      range.selectNode(this.$el.querySelector('.cli-command code'));
      window.getSelection().addRange(range);
      document.execCommand('copy');
    },

    toggleDev() {
      this.showDevCommand = !this.showDevCommand;
    },

    toggleYarn() {
      this.yarn = !this.yarn;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/animation";
@import "../../styles/theming";
@import "../../styles/mq";

#home {
  text-align: center;
  background: $color-content-bg;
  color: $color-content-text;

  #app.dark & {
    background: $color-content-bg-dark;
    color: $color-content-text-dark;

    pre {
      background: lighten($color-content-bg-dark, 4%);
      color: darken($color-content-text-dark, 20%);
    }
  }

  h2 {
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
    letter-spacing: -1px;
  }

  p {
    font-size: 1rem;
    line-height: 2rem;
    text-align: left;

    @include mq($until: tablet) {
      margin: 0 1rem;
    }

    & > a {
      font-weight: bold;
    }

    &.center {
      text-align: center;
    }
  }

  #jumbotron {
    flex: 0 0 100%;
    padding: 80px 16px;
    overflow: hidden;
    background-color: #ededed;

    #app.dark & {
      background: lighten($color-content-bg-dark, 20%);

      .below-command span {
        color: white;
      }

      .cli-command {
        code {
          background: $color-content-bg-dark;
          color: $color-content-text-dark;
        }

        em {
          background: lighten($color-content-bg-dark, 10%);
          color: $color-content-text-dark;

          &:hover {
            background: lighten($color-content-bg-dark, 15%);
          }
        }
      }
    }

    .cli-command {
      display: inline-block;
      border-radius: 5px;
      overflow: hidden;
      @include prefix(animation, cliFadeInUp ease 1s);

      code {
        padding: 16px;
        background: darken($color-content-bg, 15%);
        color: $color-content-text;
        font-family: $font-monospace;
      }

      em {
        padding: 16px;
        background: darken($color-content-bg, 20%);
        color: $color-content-text;
        @include prefix(transition, background 0.2s ease);
        cursor: pointer;

        &:hover {
          background: darken($color-content-bg, 25%);
          @include prefix(transition, background 0.2s ease);
        }
      }
    }

    .below-command {
      @include prefix(animation, cliFadeInUp ease 1s);

      span {
        font-family: monospace;
        color: black;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }

        & + span {
          margin-left: 15px;

          &:before {
            content: '/';
            display: inline-block;
            text-decoration: none;
            pointer-events: none;
            position: absolute;
            margin-left: -12px;
            margin-top: 3px;
          }
        }
      }
    }
  }

  #info {
    display: flex;
    flex-flow: row wrap;
    margin: 64px auto 0 auto;
    max-width: 1120px;

    @include mq($until: tablet) {
      margin: 32px auto 0 auto;
    }
  }

  .info-item {
    flex: 1 1 45%;
    padding: 24px;

    ul {
      display: inline-block;
      margin: 0 auto;
      text-align: left;
    }

    pre {
      padding: 8px;
      border-radius: 4px;
      text-align: left;
      font-size: 0.875rem;
      background: #f0f0f0;
    }
  }

  .full-info-item {
    flex: 1 0 100%;
    margin: 48px 0;
  }

  .big-ass-btn {
    display: inline-block;
    padding: 12px 10px;
    border-radius: 4px;
    background: $color-primary;
    color: white;
    font-size: 1.1rem;

    &:hover {
      background: lighten($color-primary, 10%);
    }

    &:not(:first-of-type) {
      margin-left: 8px;
    }

    &.discord {
      background-color: #7289da;

      &:hover {
        background: lighten(#7289da, 10%);
      }
    }
  }
}


@include keyframes(cliFadeInUp) {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0);
  }
}
</style>
