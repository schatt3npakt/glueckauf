<template>
  <div aria-live="polite" class="scene-wrapper" :class="{transition: showTransition}">
    <HeadlineLevel1 v-if="sceneData[storyStore.scenes.current].headline">
      {{ sceneData[storyStore.scenes.current].headline[storyStore.language] }}
    </HeadlineLevel1>

    <p
      v-if="sceneData[storyStore.scenes.current].text"
      v-html="parsedGameText"
    ></p>

    <p v-if="sceneData[storyStore.scenes.current].showPrompt">
      Was willst du tun?
    </p>

    <div class="decision-wrapper" v-if="sceneData[storyStore.scenes.current].choices">
      <button
        class="btn"
        type="button"
        v-for="choice in sceneData[storyStore.scenes.current]
          .choices"
        :key="choice.text"
        @click="buttonClickHandler(choice)"
      >
        {{ choice.text[storyStore.language] }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStoryStore } from "../store/index";
import StoryService from "../storyService";
import HeadlineLevel1 from '../components/HeadlineLevel1.vue'

const storyService = new StoryService()
const gameText = require("../lang/game.json")

const wikiLinkReplacer = (match) => {
  const storyStore = useStoryStore()
  const splitted = match.split("??")
  splitted[0] = "<a href='#' title='" + gameText.searchWiki[storyStore.language] + storyService.wikiData[splitted[1]].title[storyStore.language] + "' class='wikilink' data-target='" + splitted[1] +"'>"
  splitted[1] = storyService.wikiData[splitted[1]].title[storyStore.language]
  splitted[2] = "</a>"
  return splitted.join("")
}
const wikiRegex = /(\?\?)([^?#]*)(\?\?)/gi

const applyWikiEventListeners = () => {  
  const wikiLinks = document.getElementsByClassName('wikilink');
  for (const link of wikiLinks) {
    link.addEventListener("click", (evt) => {
      event.preventDefault()
      wikiLinkHandler(evt)
    })
  }
}

const wikiLinkHandler = (element) => {
  const storyStore = useStoryStore()
  storyStore.handleWikiChange(element.target.attributes['data-target'].value)
}

export default {
  name: "GameView",
  components: {
    HeadlineLevel1
  },
  data: () => {
    return {
      sceneData: storyService.sceneData,
      showTransition: false,
    }
  },
  computed: {
    parsedGameText () {
      return this.sceneData[this.storyStore.scenes.current].text[this.storyStore.language].replace(wikiRegex, wikiLinkReplacer)
    },
    ...mapStores(useStoryStore),
  },
  methods: {
    buttonClickHandler(target) {
      this.showTransition = true
      window.setTimeout(() => {
        this.showTransition = false
        this.storyStore.handleSceneChange(target)
      }, 500)
      window.setTimeout(applyWikiEventListeners, 100)
    },
  },
  mounted() {
    applyWikiEventListeners()
  }
};
</script>

<style scoped>
h1 {
  font-size: var(--scenetitle-font-size);
  margin-bottom: 16px;
}

.btn {
  display: block;
  margin: 16px auto 0 auto;
}

.decision-wrapper {
  margin-top: 32px;
}

.scene-wrapper {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .scene-wrapper {
    transition: opacity 0.5s ease;
  }
}

.transition {
  opacity: 0;
}
</style>