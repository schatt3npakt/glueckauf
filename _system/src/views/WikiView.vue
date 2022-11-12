<template>
  <div>
    <HeadlineLevel1>Wiki</HeadlineLevel1>

    <h2 v-if="wikiData[storyStore.wiki.current].title">
      {{ wikiData[storyStore.wiki.current].title[storyStore.language] }}
    </h2>

    <p v-if="wikiData[storyStore.wiki.current].description">
      {{ wikiData[storyStore.wiki.current].description[storyStore.language] }}
    </p>

    <ul>
      <li v-for="wiki in wikiData" :key="wiki.title">
        <button type="button" @click="buttonClickHandler(wiki.id)">
          {{ wiki.title[storyStore.language] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStoryStore } from "../store";
import StoryService from "../storyService";
import HeadlineLevel1 from "../components/HeadlineLevel1.vue"

const storyService = new StoryService();

export default {
  name: "ChapterSelectionView",
  data: () => {
    return {
      wikiData: storyService.wikiData,
    }
  },
  components: {
    HeadlineLevel1
  },
  computed: {
    ...mapStores(useStoryStore),
  },
  methods: {
    buttonClickHandler(target) {
      this.storyStore.handleWikiChange(target);
    },
  },
};
</script>


<style scoped>
ul li {
  margin-bottom: 16px;
}

ul li button {
  position: relative;
  text-decoration: underline;
}

ul li button::after {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

ul li button::after {
  content: "<";
  right: -20px;
}

ul li button:focus::after {
  display: block;
}

button {
  background-color: transparent;
  border: none;
  font-size: var(--main-font-size);
  text-align: center;
}
</style>