<template>
  <div>
    <h1>{{ storyData.title[storyStore.language] }}</h1>

    <h2 class="sr-only">{{ text.mainMenu[storyStore.language] }}</h2>
    <ul>
      <li>
        <router-link to="game">
          <span v-if="storyStore.storyWasStarted === false">{{ text.beginStory[storyStore.language] }}</span>
          <span v-else>
            {{ text.continueFrom[storyStore.language] }} 
            <span class="progress-hint">{{ chapterData[storyStore.chapters.current].title[storyStore.language] }}</span>
          </span>
        </router-link>
      </li>
      <hr />
      <li><router-link to="chapters">{{ text.chapterSelection[storyStore.language] }}</router-link></li>
      <li><router-link to="achievements">{{ text.achievements[storyStore.language] }}</router-link></li>
      <li><router-link to="about">{{ text.aboutThisProject[storyStore.language] }}</router-link></li>
      <li><router-link to="wiki">{{ text.wiki[storyStore.language] }}</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStoryStore } from "../store";
import StoryService from "../storyService";
import router from '../router';

const storyService = new StoryService();

export default {
  name: "MainView",
  computed: {
    ...mapStores(useStoryStore),
  },
  data: () => {
    return {
      storyData: storyService.storyData,
      chapterData: storyService.chapterData,
      text: require("../lang/main.json")
    }
  },
  mounted() {
    if (this.storyStore.languageChanged === false) {
      router.push("/languages")
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: var(--storytitle-font-size);
  margin: 32px 0 64px 0;
}

* {
  text-align: center;
}

ul li a {
  font-size: var(--main-font-size);
}

ul li:not(:last-child) {
  margin-bottom: 16px;
}

ul li a {
  position: relative;
  text-decoration: none;
}

ul li a::before,
ul li a::after {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
}

ul li a::after {
  content: "<";
  right: -20px;
}

ul li a::before {
  content: ">";
  left: -20px;
}

ul li a:hover::before,
ul li a:hover::after,
ul li a:focus::before,
ul li a:focus::after {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  ul li a::before,
  ul li a::after {
    transition: opacity 0.25s ease;
  }
}

hr {
  border-color: var(--primary-color-dark);
  max-width: 200px;
  margin: 24px auto 24px auto;
}

@media (prefers-color-scheme: dark) {
  hr {
    border-color: var(--primary-color-light);
  }
}

.progress-hint {
  font-weight: bold;
}
</style>