import MainLayout from './main';
const place_title = require('../../../utils/place-title.js');

const tpl = '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>';

export default {
  name: 'AppLayout',
  props: [ 'title', 'description', 'keywords' ],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || place_title;
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || place_title;
    },
    vDescription() {
      return this.$root.description || this.description || place_title;
    },
    baseClass() {
      return this.$root.baseClass;
    }
  },
  template: typeof window === 'object' ? tpl : `<!DOCTYPE html>
                <html lang="zh-CN">
                  <head>
                    <title>{{vTitle}}</title>
                    <meta name="keywords" :content="vKeywords">
                    <meta name="description" :content="vDescription">
                    <meta http-equiv="content-type" content="text/html;charset=utf-8">
                    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
                    <style>
                      @media screen and (min-width: 320px) {html{font-size:50px;}}
                      @media screen and (min-width: 360px) {html{font-size:56.25px;}}
                      @media screen and (min-width: 375px) {html{font-size:58.59375px;}}
                      @media screen and (min-width: 400px) {html{font-size:62.5px;}}
                      @media screen and (min-width: 414px) {html{font-size:64.6875px;}}
                      @media screen and (min-width: 440px) {html{font-size:68.75px;}}
                      @media screen and (min-width: 480px) {html{font-size:75px;}}
                      @media screen and (min-width: 520px) {html{font-size:81.25px;}}
                      @media screen and (min-width: 560px) {html{font-size:87.5px;}}
                      @media screen and (min-width: 600px) {html{font-size:93.75px;}}
                      @media screen and (min-width: 640px) {html{font-size:100px;}}
                      @media screen and (min-width: 680px) {html{font-size:106.25px;}}
                      @media screen and (min-width: 720px) {html{font-size:112.5px;}}
                      @media screen and (min-width: 760px) {html{font-size:118.75px;}}
                      @media screen and (min-width: 800px) {html{font-size:125px;}}
                      @media screen and (min-width: 960px) {html{font-size:150px;}}
                    </style>
                  </head>
                  <body :class="baseClass">
                    ${tpl}
                  </body>
                </html>`

};
