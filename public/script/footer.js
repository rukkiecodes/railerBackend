// @ts-nocheck
const routes = [
  {
    title: "Template",
    icon: "mdi-view-dashboard-outline",
    to: "/",
    location: window.location.pathname,
  },
  {
    title: "Copy",
    icon: "mdi-content-copy",
    to: "/copy",
    location: window.location.pathname,
  },
  {
    title: "Email editor",
    icon: "mdi-view-dashboard-variant-outline",
    to: "/emailEditor",
    location: window.location.pathname,
  },
  {
    title: "Compose template",
    icon: "mdi-code-json",
    to: "/codeEditor",
    location: window.location.pathname,
  },
]

// template component
new Vue({
  el: "#template",
  data: {
    drawer: true,
    routes,
    menu: false,
    search: "",
  },
  mounted() {
    const drawerBorder = document.querySelector(".v-navigation-drawer__border")
    if (drawerBorder) {
      drawerBorder.style.display = "none"
    }
    const vsSwitch = document.querySelector(".vs-switch")
    if (vsSwitch) {
      vsSwitch.style.background = "#121212"
    }
  },
  computed: {
    drawerMiniVariant() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false
        case "sm":
          return false
        case "md":
          return false
        case "lg":
          return true
        case "xl":
          return true
      }
    },

    designGrid() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "cardsMobile"
        case "sm":
          return "cardsTab"
        case "md":
          return "cardsIpadPro"
        case "lg":
          return "cardsLargeScreens"
        case "xl":
          return "cardsExtraLargeScreens"
      }
    },
  },
  vuetify: new Vuetify({
    theme: {
      dark: true,
    },
  }),
})

// copy component
new Vue({
  el: "#copy",
  data: {
    drawer: true,
    routes,
    menu: false,
    search: "",
  },
  mounted() {
    const drawerBorder = document.querySelector(".v-navigation-drawer__border")
    if (drawerBorder) {
      drawerBorder.style.display = "none"
    }
    const vsSwitch = document.querySelector(".vs-switch")
    if (vsSwitch) {
      vsSwitch.style.background = "#121212"
    }
  },
  computed: {
    drawerMiniVariant() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false
        case "sm":
          return false
        case "md":
          return false
        case "lg":
          return true
        case "xl":
          return true
      }
    },
  },
  vuetify: new Vuetify({
    theme: {
      dark: true,
    },
  }),
})

// emailEditor component
new Vue({
  el: "#emailEditor",
  data: {
    drawer: true,
    routes,
    menu: false,
    search: "",
    emailEditorWidth: null,
    emailEditorHeight: null,
  },
  mounted() {
    const drawerBorder = document.querySelector(".v-navigation-drawer__border")
    if (drawerBorder) {
      drawerBorder.style.display = "none"
    }
    const vsSwitch = document.querySelector(".vs-switch")
    if (vsSwitch) {
      vsSwitch.style.background = "#121212"
    }

    const emailEditorContainer = document.querySelector("#gjs")
    if (emailEditorContainer) {
      const emailEditorContainerSheet = document.querySelector(
        ".emailEditorContainerSheet"
      )
      this.emailEditorWidth = emailEditorContainerSheet.offsetWidth
      this.emailEditorHeight = emailEditorContainerSheet.offsetHeight

      const editor = grapesjs.init({
        container: "#gjs",

        width: this.emailEditorWidth,
        height: this.emailEditorHeight,
      })
    }
  },

  computed: {
    drawerMiniVariant() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false
        case "sm":
          return false
        case "md":
          return false
        case "lg":
          return true
        case "xl":
          return true
      }
    },
  },
  vuetify: new Vuetify({
    theme: {
      dark: true,
    },
  }),
})

// codeEditor component
new Vue({
  el: "#railerCodeEditor",
  data: {
    drawer: true,
    routes,
    menu: false,
    search: "",
    html: ``,
  },
  mounted() {
    const drawerBorder = document.querySelector(".v-navigation-drawer__border")
    if (drawerBorder) {
      drawerBorder.style.display = "none"
    }
    const vsSwitch = document.querySelector(".vs-switch")
    if (vsSwitch) {
      vsSwitch.style.background = "#121212"
    }

    const editorContainer = document.querySelector("#codeEditor")

    if (editorContainer) {
      // Setup ace
      let codeEditor = ace.edit("codeEditor")

      // Configure ace
      let editorLib = {
        init() {
          // set theme
          codeEditor.setTheme("ace/theme/dracula")

          // set language mode
          codeEditor.session.setMode("ace/mode/html")

          // set options
          codeEditor.setOptions({
            fontFamily: "Victor mono",
            fontSize: "10pt",
            highlightActiveLine: true,
            highlightSelectedWord: true,
            cursorStyle: "smooth",
            behavioursEnabled: true,
            wrapBehavioursEnabled: true,
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            useSoftTabs: true,
            navigateWithinSoftTabs: true,
            enableMultiselect: true,
            enableEmmet: true,
            wrap: true,
            showPrintMargin: false,
            showFoldWidgets: true,
            fadeFoldWidgets: true,
            showGutter: true,
            scrollPastEnd: true,
            newLineMode: "auto",
            useWorker: true,
            tabSize: 3,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            useElasticTabstops: true,
            highlightGutterLine: true,
          })
        },
      }

      // Get value of code editor
      setInterval(() => {
        this.html = codeEditor.getValue()

        // try {
        //   new Function(this.html)()
        // } catch (error) {
        //   console.log(error)
        // }
      }, 3000)
      editorLib.init()
    }
  },
  computed: {
    drawerMiniVariant() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false
        case "sm":
          return false
        case "md":
          return false
        case "lg":
          return true
        case "xl":
          return true
      }
    },
  },
  vuetify: new Vuetify({
    theme: {
      dark: true,
    },
  }),
})

// previewDesign component
new Vue({
  el: "#previewDesign",
  data: {
    drawer: true,
    routes,
    menu: false,
    search: "",
  },
  mounted() {
    const drawerBorder = document.querySelector(".v-navigation-drawer__border")
    if (drawerBorder) {
      drawerBorder.style.display = "none"
    }
    const vsSwitch = document.querySelector(".vs-switch")
    if (vsSwitch) {
      vsSwitch.style.background = "#121212"
    }
  },
  computed: {
    drawerMiniVariant() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false
        case "sm":
          return false
        case "md":
          return false
        case "lg":
          return true
        case "xl":
          return true
      }
    },
  },
  vuetify: new Vuetify({
    theme: {
      dark: true,
    },
  }),
})