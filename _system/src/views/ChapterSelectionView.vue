<template>
  <div>
    <HeadlineLevel1>{{text.chapterSelection[storyStore.language]}}</HeadlineLevel1>

    <ul>
      <li v-for="chapter in chapterData" :key="chapter.title">
        <button v-if="storyStore.chapters.revealed.includes(chapter.id)" type="button" @click="buttonClickHandler(chapter)">
          {{ chapter.title[storyStore.language] }}
        </button>

        <span v-else>{{text.thisChapterHasNotBeenUnlocked[storyStore.language]}}</span>
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
  components: {
    HeadlineLevel1
  },
  data: () => {
    return {
      chapterData: storyService.chapterData,
      text: require("../lang/chapter.json")
    }
  },
  computed: {
    ...mapStores(useStoryStore),
  },
  methods: {
    buttonClickHandler(target) {
      this.storyStore.handleChapterChange(target);
    },
  },
};
</script>

<style scoped>
ul li {
  list-style-type: none;
  margin-bottom: 16px;
}

ul li button {
  position: relative;
  text-decoration: underline;
}

ul li button:focus {
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

p,
span,
div {
  font-size: var(--main-font-size);
}

button {
  background-color: transparent;
  border: none;
  font-size: var(--main-font-size);
  text-align: center;
}
</style>