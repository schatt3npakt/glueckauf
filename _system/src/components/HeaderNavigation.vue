<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">
            <InlineSVG aria-hidden="true" :src="require('../assets/icons/menu.svg')" />
            <span class="sr-only">{{text.toMainMenu[language]}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="options">
            <InlineSVG aria-hidden="true" :src="require('../assets/icons/options.svg')" />
            <span class="sr-only">{{text.toOptions[language]}}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { loadStateFromStorage } from '../store/persistenceService';
import InlineSVG from 'vue-inline-svg'

export default {
  components: {
    InlineSVG
  },
  data() {
    return {
      text: require("../lang/header.json"),
      language: loadStateFromStorage().language
    }
  },
  name: "HeaderNavigation",
  mounted() {
    window.setInterval(() => {
      this.language = loadStateFromStorage().language
    }, 500)
  }
};
</script>

<style scoped>
header {
  background-color: var(--primary-color-light-50);
  position: sticky;
  top: 0;
  margin: auto;
  backdrop-filter: blur(4px);
  border: none;
}

@media (min-width: 720px) {
  header {
    margin: 0 20px;
  }
}

@media (prefers-color-scheme: dark) {
  header {
    background-color: var(--primary-color-dark-50);
  }
}

header ul {
  font-size: var(--main-font-size);
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

a:focus {
  text-decoration: none;
}

a:focus svg {
  border-bottom: 2px solid var(--primary-color-dark); 
}

a:hover svg {
  opacity: 0.5;
}

@media (prefers-reduced-motion: no-preference) {
  a:hover svg {
    transition: 0.25s opacity ease;
  }
}

@media (prefers-color-scheme: dark) {
  a:focus svg {
    border-bottom: 2px solid var(--primary-color-light);
  }
}
</style>