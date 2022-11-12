<template>
  <div>
    <HeadlineLevel1>{{text.options[storyStore.language]}}</HeadlineLevel1>

    <form>
      <!-- <label for="Textvergrößerung">Textvergrößerung</label>
      <input
        @input="handleInput($event.target)"
        type="range"
        min="0"
        :value="storyStore.options.textZoom"
        step="0.1"
        max="2.5"
        name="Textvergrößerung"
        id="textZoom"
      /> -->

      <div class="options-category">
        <HeadlineLevel2>{{text.displayOptions[storyStore.language]}}</HeadlineLevel2>

        <button class="btn" type="button" @click="handleFullscreenToggle()">{{fullScreenText}}</button>
      </div>

      <div class="options-category">
        <HeadlineLevel2>{{text.languageOptions[storyStore.language]}}</HeadlineLevel2>

        <ul>
          <li v-for="lang in storyData.languages" :key="lang">
            <button class="btn" @click="handleLangButton(lang)">
              {{ languages[lang][storyStore.language] }}
            </button>
          </li>
        </ul>
      </div>

      <!--
      <label for="checkbox1">Test</label>
      <input type="checkbox" name="checkbox1" id="checkbox1" />

      <label for="checkbox2">Test</label>
      <input type="checkbox" name="checkbox2" id="checkbox2" />

      <label for="option1">Option 1</label>
      <input type="radio" id="option1" name="radio" value="Option 1" />
      <label for="option2">Option 2</label>
      <input type="radio" id="option2" name="radio" value="Option 2" />
      -->
    </form>
  </div>
</template>

<script>
import { useStoryStore } from "../store";
import {mapStores} from "pinia";
import screenfull from "screenfull";
import HeadlineLevel1 from "../components/HeadlineLevel1.vue";
import HeadlineLevel2 from "../components/HeadlineLevel2.vue";
import StoryService from '../storyService';

const optionsText = require("../lang/options.json")
const storyService = new StoryService()

export default {
  name: "OptionsView",
  components: {
    HeadlineLevel1,
    HeadlineLevel2
  },
  computed: {
    ...mapStores(useStoryStore)
  },
  data: function () {
    return {
      storyData: storyService.storyData,
      text: optionsText,
      fullScreenText: "",
      languages: require("../lang/languages.json")
    }
  },
  methods: {
    handleInput (target) {
      this.storyStore.handleOptionsChange(target.id, target.value);
    },
    handleFullscreenToggle () {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }

      this.fullScreenText = screenfull.isFullscreen ? this.text.fullScreenOff[this.storyStore.language]:this.text.fullScreenOn[this.storyStore.language]
    },
    handleLangButton (lang) {
      this.storyStore.handleLangChange(lang)
    }
  },
  mounted () {
      this.fullScreenText = screenfull.isFullscreen ? this.text.fullScreenOff[this.storyStore.language]:this.text.fullScreenOn[this.storyStore.language]
  }
};
</script>

<style scoped>
.options-category {
  margin-bottom: 32px;
}

.btn {
  display: block;
  margin: auto;
}

li + li {
  margin-top: 20px;
}
</style>